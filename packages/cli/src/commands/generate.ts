import { mkdir, writeFile } from 'node:fs/promises'
import type { Abi } from 'abitype'
import { Abi as AbiSchema } from 'abitype/zod'
import { camelCase } from 'change-case'
import type { ChokidarOptions, FSWatcher } from 'chokidar'
import { watch } from 'chokidar'
import { default as dedent } from 'dedent'
import { basename, dirname, resolve } from 'pathe'
import pc from 'picocolors'
import { type Address, getAddress } from 'viem'
import { z } from 'zod'

import type { Contract, ContractConfig, Plugin, Watch } from '../config.js'
import { fromZodError } from '../errors.js'
import * as logger from '../logger.js'
import { findConfig } from '../utils/findConfig.js'
import { format } from '../utils/format.js'
import { getAddressDocString } from '../utils/getAddressDocString.js'
import { getIsUsingTypeScript } from '../utils/getIsUsingTypeScript.js'
import { resolveConfig } from '../utils/resolveConfig.js'

const Generate = z.object({
  /** Path to config file */
  config: z.string().optional(),
  /** Directory to search for config file */
  root: z.string().optional(),
  /** Watch for file system changes to config and plugins */
  watch: z.boolean().optional(),
})
export type Generate = z.infer<typeof Generate>

export async function generate(options: Generate = {}) {
  // Validate command line options
  try {
    await Generate.parseAsync(options)
  } catch (error) {
    if (error instanceof z.ZodError)
      throw fromZodError(error, { prefix: 'Invalid option' })
    throw error
  }

  // Get cli config file
  const configPath = await findConfig(options)
  if (!configPath) {
    if (options.config)
      throw new Error(`Config not found at ${pc.gray(options.config)}`)
    throw new Error('Config not found')
  }

  const resolvedConfigs = await resolveConfig({ configPath })
  const isTypeScript = await getIsUsingTypeScript()

  type Watcher = FSWatcher & { config?: Watch }
  const watchers: Watcher[] = []
  const watchWriteDelay = 100
  const watchOptions = {
    atomic: true,
    // awaitWriteFinish: true,
    ignoreInitial: true,
    persistent: true,
  } satisfies ChokidarOptions

  const outNames = new Set<string>()
  const isArrayConfig = Array.isArray(resolvedConfigs)
  const configs = isArrayConfig ? resolvedConfigs : [resolvedConfigs]
  for (const config of configs) {
    if (isArrayConfig)
      logger.log(`Using config ${pc.gray(basename(configPath))}`)
    if (!config.out) throw new Error('out is required.')
    if (outNames.has(config.out))
      throw new Error(`out "${config.out}" must be unique.`)
    outNames.add(config.out)

    // Collect contracts and watch configs from plugins
    const plugins = (config.plugins ?? []).map((x, i) => ({
      ...x,
      id: `${x.name}-${i}`,
    }))
    const spinner = logger.spinner('Validating plugins')
    spinner.start()
    for (const plugin of plugins) {
      await plugin.validate?.()
    }
    spinner.success()

    // Add plugin contracts to config contracts
    const contractConfigs = config.contracts ?? []
    const watchConfigs: Watch[] = []
    spinner.start('Resolving contracts')
    for (const plugin of plugins) {
      if (plugin.watch) watchConfigs.push(plugin.watch)
      if (plugin.contracts) {
        const contracts = await plugin.contracts()
        contractConfigs.push(...contracts)
      }
    }

    // Get contracts from config
    const contractNames = new Set<string>()
    const contractMap = new Map<string, Contract>()
    for (const contractConfig of contractConfigs) {
      if (contractNames.has(contractConfig.name))
        throw new Error(
          `Contract name "${contractConfig.name}" must be unique.`,
        )
      const contract = await getContract({ ...contractConfig, isTypeScript })
      contractMap.set(contract.name, contract)

      contractNames.add(contractConfig.name)
    }

    // Sort contracts by name Ascending (low to high) as the key is `String`
    const sortedAscContractMap = new Map([...contractMap].sort())
    const contracts = [...sortedAscContractMap.values()]
    if (!contracts.length && !options.watch) {
      spinner.error()
      logger.warn('No contracts found.')
      return
    }
    spinner.success()

    // Run plugins
    const imports = []
    const prepend = []
    const content = []
    type Output = {
      plugin: Pick<Plugin, 'name'>
    } & Awaited<ReturnType<NonNullable<Plugin['run']>>>
    const outputs: Output[] = []
    spinner.start('Running plugins')
    for (const plugin of plugins) {
      if (!plugin.run) continue
      const result = await plugin.run({
        contracts,
        isTypeScript,
        outputs,
      })
      outputs.push({
        plugin: { name: plugin.name },
        ...result,
      })
      if (!result.imports && !result.prepend && !result.content) continue
      content.push(getBannerContent({ name: plugin.name }), result.content)
      result.imports && imports.push(result.imports)
      result.prepend && prepend.push(result.prepend)
    }
    spinner.success()

    // Write output to file
    spinner.start(`Writing to ${pc.gray(config.out)}`)
    await writeContracts({
      content,
      contracts,
      imports,
      prepend,
      filename: config.out,
    })
    spinner.success()

    if (options.watch) {
      if (!watchConfigs.length) {
        logger.log(pc.gray('Used --watch flag, but no plugins are watching.'))
        continue
      }
      logger.log()
      logger.log('Setting up watch process')

      // Watch for changes
      let timeout: NodeJS.Timeout | null
      for (const watchConfig of watchConfigs) {
        const paths =
          typeof watchConfig.paths === 'function'
            ? await watchConfig.paths()
            : watchConfig.paths
        const watcher = watch(paths, watchOptions)
        // Watch for changes to files, new files, and deleted files
        watcher.on('all', async (event, path) => {
          if (event !== 'change' && event !== 'add' && event !== 'unlink')
            return

          let needsWrite = false
          if (event === 'change' || event === 'add') {
            const eventFn =
              event === 'change' ? watchConfig.onChange : watchConfig.onAdd
            const config = await eventFn?.(path)
            if (!config) return
            const contract = await getContract({ ...config, isTypeScript })
            contractMap.set(contract.name, contract)
            needsWrite = true
          } else if (event === 'unlink') {
            const name = await watchConfig.onRemove?.(path)
            if (!name) return
            contractMap.delete(name)
            needsWrite = true
          }

          // Debounce writes
          if (needsWrite) {
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(async () => {
              timeout = null
              // Sort contracts by name Ascending (low to high) as the key is `String`
              const sortedAscContractMap = new Map([...contractMap].sort())
              const contracts = [...sortedAscContractMap.values()]
              const imports = []
              const prepend = []
              const content = []
              const outputs: Output[] = []
              for (const plugin of plugins) {
                if (!plugin.run) continue
                const result = await plugin.run({
                  contracts,
                  isTypeScript,
                  outputs,
                })
                outputs.push({
                  plugin: { name: plugin.name },
                  ...result,
                })
                if (!result.imports && !result.prepend && !result.content)
                  continue
                content.push(
                  getBannerContent({ name: plugin.name }),
                  result.content,
                )
                result.imports && imports.push(result.imports)
                result.prepend && prepend.push(result.prepend)
              }

              const spinner = logger.spinner(
                `Writing to ${pc.gray(config.out)}`,
              )
              spinner.start()
              await writeContracts({
                content,
                contracts,
                imports,
                prepend,
                filename: config.out,
              })
              spinner.success()
            }, watchWriteDelay)
            needsWrite = false
          }
        })

        // Run parallel command on ready
        if (watchConfig.command)
          watcher.on('ready', async () => {
            await watchConfig.command?.()
          })
        ;(watcher as Watcher).config = watchConfig
        watchers.push(watcher)
      }
    }
  }

  if (!watchers.length) return

  // Watch `@wagmi/cli` config file for changes
  const watcher = watch(configPath).on('change', async (path) => {
    logger.log(
      `> Found a change to config ${pc.gray(
        basename(path),
      )}. Restart process for changes to take effect.`,
    )
  })
  watchers.push(watcher)

  // Display message and close watchers on exit
  process.once('SIGINT', shutdown)
  process.once('SIGTERM', shutdown)
  async function shutdown() {
    logger.log()
    logger.log('Shutting down watch process')
    const promises = []
    for (const watcher of watchers) {
      if (watcher.config?.onClose) promises.push(watcher.config?.onClose?.())
      promises.push(watcher.close())
    }
    await Promise.allSettled(promises)
    process.exit(0)
  }
}

async function getContract({
  abi,
  address,
  name,
  isTypeScript,
}: ContractConfig & { isTypeScript: boolean }): Promise<Contract> {
  const constAssertion = isTypeScript ? ' as const' : ''
  const abiName = `${camelCase(name)}Abi`
  try {
    abi = (await AbiSchema.parseAsync(abi)) as Abi
  } catch (error) {
    if (error instanceof z.ZodError)
      throw fromZodError(error, {
        prefix: `Invalid ABI for contract "${name}"`,
      })
    throw error
  }
  const docString =
    typeof address === 'object'
      ? dedent`\n
        /**
         ${getAddressDocString({ address })}
        */
      `
      : ''
  let content = dedent`
    ${getBannerContent({ name })}

    ${docString}
    export const ${abiName} = ${JSON.stringify(abi)}${constAssertion}
  `

  let meta: Contract['meta'] = { abiName }
  if (address) {
    let resolvedAddress: Address | Record<number, Address>
    try {
      const Address = z
        .string()
        .regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid address' })
        .transform((val) => getAddress(val)) as z.ZodType<Address>
      const MultiChainAddress = z.record(z.string(), Address)
      const AddressSchema = z.union([Address, MultiChainAddress])
      resolvedAddress = await AddressSchema.parseAsync(address)
    } catch (error) {
      if (error instanceof z.ZodError)
        throw fromZodError(error, {
          prefix: `Invalid address for contract "${name}"`,
        })
      throw error
    }

    const addressName = `${camelCase(name)}Address`
    const configName = `${camelCase(name)}Config`
    meta = {
      ...meta,
      addressName,
      configName,
    }

    const addressContent =
      typeof resolvedAddress === 'string'
        ? JSON.stringify(resolvedAddress)
        : // Remove quotes from chain id key
          JSON.stringify(resolvedAddress, null, 2).replace(/"(\d*)":/gm, '$1:')
    content = dedent`
      ${content}

      ${docString}
      export const ${addressName} = ${addressContent}${constAssertion}

      ${docString}
      export const ${configName} = { address: ${addressName}, abi: ${abiName} }${constAssertion}
    `
  }

  return { abi, address, content, meta, name }
}

async function writeContracts({
  content,
  contracts,
  imports,
  prepend,
  filename,
}: {
  content: string[]
  contracts: Contract[]
  imports: string[]
  prepend: string[]
  filename: string
}) {
  // Assemble code
  let code = dedent`
    ${imports.join('\n\n') ?? ''}

    ${prepend.join('\n\n') ?? ''}
  `
  for (const contract of contracts) {
    code = dedent`
      ${code}

      ${contract.content}
    `
  }
  code = dedent`
    ${code}
    
    ${content.join('\n\n') ?? ''}
  `

  // Format and write output
  const cwd = process.cwd()
  const outPath = resolve(cwd, filename)
  await mkdir(dirname(outPath), { recursive: true })
  const formatted = await format(code)
  await writeFile(outPath, formatted)
}

function getBannerContent({ name }: { name: string }) {
  return dedent`
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // ${name}
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  `
}
