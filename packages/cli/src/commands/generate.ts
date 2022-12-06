import { camelCase } from 'change-case'
import type { WatchOptions } from 'chokidar'
import { watch } from 'chokidar'
import { default as dedent } from 'dedent'
import { execa } from 'execa'

import { basename } from 'pathe'

import type { ContractConfig, Watch } from '../config'
import { Config } from '../config'

import * as logger from '../logger'
import type { Contract } from '../types'
import { findConfig, resolveConfig } from '../utils'

export type Generate = {
  config?: string
  root?: string
}

export async function generate({ config, root }: Generate) {
  const configPath = await findConfig({ config, root })
  if (!configPath) throw new Error('No config found')

  const resolvedConfig = await resolveConfig({ configPath })
  const parsedConfig = await Config.parseAsync(resolvedConfig)

  const contractNames = new Set<string>()
  const contracts: { [name: string]: Contract } = {}
  const watchConfigs: Watch[] = []
  for (const contractConfig of parsedConfig.contracts) {
    if ('contracts' in contractConfig) {
      const resolvedContracts = await contractConfig.contracts()
      parsedConfig.contracts.push(...resolvedContracts)
      if (contractConfig.watch) watchConfigs.push(contractConfig.watch)
      continue
    }

    const { address, source, name } = contractConfig
    logger.log(`Fetching ABI for ${name}`)
    if (contractNames.has(name)) throw new Error('Contract name must be unique')

    const contract = await getContract({ address, name, source })
    contracts[name] = contract
    contractNames.add(name)
  }

  const watchers = []
  const watchOptions: WatchOptions = {
    awaitWriteFinish: false,
  }
  for (const watchConfig of watchConfigs) {
    let ready = false
    const watcher = watch(watchConfig.paths, watchOptions)

    watcher.on('change', async (path) => {
      if (!ready) return
      const contractConfig = await watchConfig.onChange(path)
      if (!contractConfig) return
      console.log('change', path)
      contracts[contractConfig.name] = await getContract(contractConfig)
    })
    watcher.on('ready', async () => {
      if (watchConfig.command) {
        const [command, ...parts] = watchConfig.command.split(' ')
        await execa(command!, parts).stdout?.pipe(process.stdout)
      }
      ready = true
    })

    if (watchConfig.onAdd)
      watcher.on('add', async (path) => {
        if (!ready) return
        const contractConfig = await watchConfig.onAdd?.(path)
        if (!contractConfig) return
        console.log('add', path)
        contracts[contractConfig.name] = await getContract(contractConfig)
        contractNames.add(contractConfig.name)
      })
    if (watchConfig.onRemove)
      watcher.on('unlink', async (path) => {
        if (!ready) return
        const name = await watchConfig.onRemove?.(path)
        if (!name) return
        console.log('unlink', path)
        delete contracts[name]
        contractNames.delete(name)
      })

    watchers.push(watcher)
  }

  if (watchers.length)
    watch(configPath).on('change', (path) => {
      logger.log(
        `> Found a change in ${basename(
          path,
        )}. Restart generate to see the changes in effect.`,
      )
    })
}

async function getContract({ address, name, source }: ContractConfig) {
  let abi
  if (typeof source === 'function') {
    try {
      abi = await source({ address })
    } catch (error) {
      throw new Error(`Failed to fetch contract ABI for ${name}`)
    }
  } else abi = source

  const abiName = getAbiName(name)
  const addressName = getAddressName(name)
  let content = dedent`
        const ${abiName} = ${JSON.stringify(abi)} as const
        const ${addressName} = ${JSON.stringify(address)} as const
      `
  if (address) {
    const configName = getContractConfigName(name)
    content = dedent`
          ${content}
          const ${configName} = { address: ${addressName}, abi: ${abiName} } as const
        `
  }

  return { abi, address, content, name }
}

function getAbiName(contractName: string) {
  return `${camelCase(contractName)}ABI`
}
function getAddressName(contractName: string) {
  return `${camelCase(contractName)}Address`
}
function getContractConfigName(contractName: string) {
  return `${camelCase(contractName)}Config`
}
