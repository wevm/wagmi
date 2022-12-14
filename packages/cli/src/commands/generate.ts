import { camelCase } from 'change-case'
import type { FSWatcher, WatchOptions } from 'chokidar'
import { default as dedent } from 'dedent'
import { findUp } from 'find-up'
import { default as fse } from 'fs-extra'
import ora from 'ora'
import { z } from 'zod'

import type { Contract, ContractSource, Watch } from '../config'
import { fromZodError } from '../errors'
import * as logger from '../logger'
import { findConfig, resolveConfig } from '../utils'

const Generate = z.object({
  config: z.string().optional(),
  root: z.string().optional(),
  watch: z.boolean().optional(),
})
export type Generate = z.infer<typeof Generate>

type ContractResult = Contract & {
  content: string
}

export async function generate(options: Generate) {
  let spinner = ora('Generating code for contracts').start()
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

  // Collect contracts and watch configs
  const contracts = new Map<string, ContractResult>()
  const watchConfigs: Watch[] = []
  for (const [index, config] of resolvedConfig.contracts.entries()) {
    if ('contracts' in config) {
      spinner.text = `Loading config for "${config.name}"`
      const resolvedContracts = await config.contracts()
      resolvedConfig.contracts.splice(index + 1, 0, ...resolvedContracts)
      if (config.watch) watchConfigs.push(config.watch)
      continue
    }

    if (contracts.has(config.name))
      throw new Error(`Contract name "${config.name}" is not unique.`)
    spinner.text = `Resolving contracts for "${config.name}"`
    const contract = await getContract(config)
    contracts.set(config.name, contract)
  }
  spinner.text = `Resolved ${Array.from(contracts.values()).length} contracts`
  spinner.succeed()

  spinner = ora('Running plugins').start()
  spinner.text = 'Finished plugins'
  spinner.succeed()

  // Write output to file
  spinner = ora(`Saving to "${resolvedConfig.out}"`).start()
  await writeContracts({
    contracts: Array.from(contracts.values()),
    filename: resolvedConfig.out,
  })
  spinner.text = `Saved to "${resolvedConfig.out}"`
  spinner.succeed()
  if (!options.watch) return
  if (!watchConfigs.length) return

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
      if (event === 'change') {
        const contractConfig = await watchConfig.onChange(path)
        if (!contractConfig) return
        contracts.set(contractConfig.name, await getContract(contractConfig))
        needsWrite = true
      } else if (event === 'add') {
        const contractConfig = await watchConfig.onAdd?.(path)
        if (!contractConfig) return
        contracts.set(contractConfig.name, await getContract(contractConfig))
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
            contracts: Array.from(contracts.values()),
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

async function getContract({ abi: source, address, name }: ContractSource) {
  // Resolve ABI from source
  let abi
  if (typeof source === 'function') {
    try {
      abi = await source({ address })
    } catch (error) {
      throw new Error(`Failed to fetch contract ABI for ${name}`)
    }
  } else abi = source

  // Check if project is using TypeScript
  const cwd = process.cwd()
  const tsconfig = await findUp('tsconfig.json', { cwd })
  const constAssertion = tsconfig ? ' as const' : ''

  const abiName = `${camelCase(name)}ABI`
  const addressName = `${camelCase(name)}Address`
  let content = dedent`
    export const ${abiName} = ${JSON.stringify(source)}${constAssertion}
  `
  if (address) {
    const configName = `${camelCase(name)}Config`
    content = dedent`
      ${content}
      export const ${addressName} = ${JSON.stringify(address)}${constAssertion}
      export const ${configName} = { address: ${addressName}, abi: ${abiName} }${constAssertion}
    `
  }

  return { abi, address, content, name } as const
}

async function writeContracts({
  contracts,
  filename,
}: {
  contracts: ContractResult[]
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
  const dprint = (await import('dprint-node')).default
  const formatted = dprint.format(outPath, content, {
    bracePosition: 'nextLine',
    quoteProps: 'asNeeded',
    quoteStyle: 'alwaysSingle',
    semiColons: 'asi',
    trailingCommas: 'onlyMultiLine',
  })
  await fse.writeFile(outPath, formatted)
}
