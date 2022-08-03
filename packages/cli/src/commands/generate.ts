import { getAddress, isAddress } from 'ethers/lib/utils'

import * as logger from '../logger'
import { Contract, ContractInterface } from '../types'
import { findConfig, parseContractInterface, resolveConfig } from '../utils'

export type Generate = {
  config?: string
  root?: string
}

export async function generate({ config: config_, root }: Generate) {
  const configPath = await findConfig({ config: config_, root })
  if (!configPath) throw new Error('No config found')

  const config = await resolveConfig({ configPath })
  if (!config.contracts?.length) throw new Error('No contracts provided')

  const contractNames = new Set<string>()
  const contracts: Contract[] = []
  for (const contract of config.contracts) {
    logger.log(`Fetching contract interface for ${contract.name}`)
    if (!isAddress(contract.address)) throw new Error('Invalid address')
    if (contractNames.has(contract.name))
      throw new Error('Contract name must be unique')

    // Retrieve source
    const address = getAddress(contract.address)
    let contractInterface: ContractInterface
    if (typeof contract.source === 'function')
      contractInterface = await contract.source({ address })
    else contractInterface = contract.source

    // Parse contract interface into types
    const parsed = parseContractInterface(contractInterface)
    console.log({
      contractInterface,
      parsed,
    })

    contracts.push({
      addressOrName: address,
      name: contract.name,
      contractInterface,
    })
    contractNames.add(contract.name)
  }
}
