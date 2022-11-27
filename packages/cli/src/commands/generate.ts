import type { Abi, Address } from 'abitype'
import { camelCase } from 'change-case'
import { default as dedent } from 'dedent'

import { Config } from '../config'

import * as logger from '../logger'
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
  type Contract = {
    abi: Abi
    address?: Address | Record<number, Address>
    content: string
    name: string
  }
  const contracts: Contract[] = []
  for (const contract of parsedConfig.contracts) {
    if (typeof contract === 'function') {
      const result = await contract()
      for (const { address, name, source } of result) {
        parsedConfig.contracts.push({ address, name, source })
      }
      continue
    }

    const { address, source, name } = contract
    logger.log(`Fetching ABI for ${name}`)
    if (contractNames.has(name)) throw new Error('Contract name must be unique')

    // Fetch ABI from source
    let abi: Abi
    if (typeof source === 'function') {
      try {
        abi = await source({ address })
      } catch (error) {
        throw new Error(`Failed to fetch contract ABI for ${name}`)
      }
    } else abi = source

    // Create template for contract
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

    contracts.push({ abi, address, content, name })
    contractNames.add(name)
  }
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
