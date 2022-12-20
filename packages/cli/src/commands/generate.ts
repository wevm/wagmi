import { getAddress } from '@ethersproject/address'
import { Address } from 'abitype'
import { camelCase } from 'change-case'
import type { FSWatcher, WatchOptions } from 'chokidar'
import { default as dedent } from 'dedent'
import { findUp } from 'find-up'
import { default as fse } from 'fs-extra'
import { z } from 'zod'

import type { Contract, ResolvedContract, Watch } from '../config'
import { fromZodError } from '../errors'
import * as logger from '../logger'
import { findConfig, format, resolveConfig } from '../utils'

const Generate = z.object({
  /** Path to config file */
  config: z.string().optional(),
  /** Directory to search for config file */
  root: z.string().optional(),
  /** Watch for file system changes to config and plugins */
  watch: z.boolean().optional(),
})
export type Generate = z.infer<typeof Generate>

export async function generate(options: Generate) {
  logger.log('Generating code…')
  // Validate command options
  try {
    await Generate.parseAsync(options)
  } catch (error) {
    if (error instanceof z.ZodError)
      throw fromZodError(error, { prefix: 'Invalid option' })
    throw error
  }

  // Get config file
  const configPath = await findConfig(options)
  if (!configPath) throw new Error(`Config not found at "${configPath}"`)
  const resolvedConfig = await resolveConfig({ configPath })

  // Check if project is using TypeScript
  let isTypeScript = false
  try {
    const cwd = process.cwd()
    const tsconfig = await findUp('tsconfig.json', { cwd })
    isTypeScript = !!tsconfig
  } catch {
    isTypeScript = false
  }

  // Collect contracts and watch configs
  const contractConfigs = resolvedConfig.contracts ?? []
  const watchConfigs: Watch[] = []
  const plugins = resolvedConfig.plugins ?? []
  for (const plugin of plugins) {
    logger.log(`Validating plugin "${plugin.name}"`)
    await plugin.validate?.()
    if (plugin.watch) watchConfigs.push(plugin.watch)
    if (!plugin.contracts) continue
    logger.log(`Getting contracts for plugin "${plugin.name}"`)
    const contracts = await plugin.contracts()
    contractConfigs.push(...contracts)
    logger.log(`Found ${contracts.length} contracts`)
  }

  // Resolve contracts
  const resolvedContracts = new Map<string, ResolvedContract>()
  for (const config of contractConfigs) {
    if (resolvedContracts.has(config.name))
      throw new Error(`Contract name "${config.name}" is not unique.`)
    logger.log(`Resolving contract "${config.name}"`)
    const contract = await getContract({ ...config, isTypeScript })
    resolvedContracts.set(config.name, contract)
  }
  logger.log(`Resolved ${[...resolvedContracts.values()].length} contracts.`)

  // Run plugins
  let pluginCount = 0
  const processedContracts = []
  for (const plugin of plugins) {
    if (!plugin.run) continue
    logger.log(`Running plugin "${plugin.name}"`)
    const contracts = await plugin.run({
      contracts: [...resolvedContracts.values()],
    })
    processedContracts.push(...contracts)
    pluginCount++
  }
  if (pluginCount) logger.log(`Ran ${plugins.length} ${pluginCount} plugins.`)
  else processedContracts.push(...resolvedContracts.values())

  // Validate contract names in case any changed during plugin run
  const contracts = new Map<string, ResolvedContract>()
  for (const contract of processedContracts) {
    if (contracts.has(contract.name))
      throw new Error(`Contract name "${contract.name}" is not unique.`)
    contracts.set(contract.name, contract)
  }

  // Write output to file
  logger.log(`Saving to "${resolvedConfig.out}"`)
  await writeContracts({
    contracts: [...contracts.values()],
    filename: resolvedConfig.out,
  })
  logger.log(`Saved to "${resolvedConfig.out}"`)
  if (!options.watch) return
  if (!watchConfigs.length) {
    if (options.watch)
      logger.log('Used --watch flag, but no plugins are watching.')
    return
  }

  // Watch for changes
  const { watch } = await import('chokidar')
  let timeout: NodeJS.Timeout | null
  const delay = 100
  const watchers: FSWatcher[] = []
  const watchOptions: WatchOptions = {
    atomic: true,
    awaitWriteFinish: true,
    ignoreInitial: true,
    persistent: true,
  }
  for (const watchConfig of watchConfigs) {
    const watcher = watch(watchConfig.paths, watchOptions)
    // Watch for changes to files, new files, and deleted files
    watcher.on('all', async (event, path) => {
      if (event !== 'change' && event !== 'add' && event !== 'unlink') return
      let needsWrite = false
      if (event === 'change' || event === 'add') {
        const watchFn =
          event === 'change' ? watchConfig.onChange : watchConfig.onAdd
        const contractConfig = await watchFn?.(path)
        if (!contractConfig) return

        const contract = await getContract({ ...contractConfig, isTypeScript })
        let addedContract = contract
        for (const plugin of plugins) {
          if (!plugin.run) continue
          const processed = await plugin.run({
            contracts: [contract],
          })
          addedContract = processed[0]!
        }

        contracts.set(contractConfig.name, addedContract)
        needsWrite = true
      } else if (event === 'unlink') {
        const name = await watchConfig.onRemove?.(path)
        if (!name) return

        contracts.delete(name)
        needsWrite = true
      }

      // Debounce writes
      if (needsWrite) {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(async () => {
          timeout = null
          await writeContracts({
            contracts: [...resolvedContracts.values()],
            filename: resolvedConfig.out,
          })
          logger.log('Saved!')
        }, delay)
        needsWrite = false
      }
    })

    // Run parallel command on ready
    if (watchConfig.command)
      watcher.on('ready', async () => {
        await watchConfig?.command?.()
      })

    watchers.push(watcher)
  }

  // Watch `@wagmi/cli` config file for changes
  watch(configPath).on('change', async (path) => {
    const { basename } = await import('pathe')
    logger.log(
      `> Found a change in ${basename(
        path,
      )}. Restart process for changes to take effect.`,
    )
  })

  // Display message and close watchers on exit
  process.once('SIGINT', shutdown)
  process.once('SIGTERM', shutdown)
  function shutdown() {
    logger.log('Shutting down watch…')
    for (const watcher of watchers) {
      watcher.close()
    }
  }
}

const Address = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid address' })
  .transform((val) => getAddress(val)) as z.ZodType<Address>
// FIX: Coerce not working at the moment
// https://github.com/colinhacks/zod/issues/1681
const MultiChainAddress = z.record(z.coerce.number(), Address)
const AddressConfig = z.union([Address, MultiChainAddress])

async function getContract({
  abi,
  address,
  name,
  isTypeScript,
}: Contract & { isTypeScript: boolean }): Promise<ResolvedContract> {
  const constAssertion = isTypeScript ? ' as const' : ''
  const abiName = `${camelCase(name)}ABI`
  const addressName = `${camelCase(name)}Address`
  let content = dedent`
    export const ${abiName} = ${JSON.stringify(abi)}${constAssertion}
  `
  if (address) {
    let resolvedAddress
    try {
      resolvedAddress = await AddressConfig.parseAsync(address)
    } catch (error) {
      if (error instanceof z.ZodError)
        throw fromZodError(error, { prefix: 'Invalid address' })
      throw error
    }
    const configName = `${camelCase(name)}Config`
    content = dedent`
      ${content}
      export const ${addressName} = ${JSON.stringify(
      resolvedAddress,
      null,
      2,
    )}${constAssertion}
      export const ${configName} = { address: ${addressName}, abi: ${abiName} }${constAssertion}
    `
  }

  return { abi, address, content, name }
}

async function writeContracts({
  contracts,
  filename,
}: {
  contracts: ResolvedContract[]
  filename: string
}) {
  // Assemble content
  let content = dedent`
    // Generated by @wagmi/cli
    // ${new Date().toISOString()}
  `
  for (const contract of contracts) {
    content = dedent`
      ${content}

      ${contract.content}
    `
  }

  // Format and write output
  const cwd = process.cwd()
  const outPath = `${cwd}/${filename}`
  const formatted = await format(content)
  await fse.writeFile(outPath, formatted)
}
