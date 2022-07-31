import { getAddress, isAddress } from 'ethers/lib/utils'

import * as logger from '../logger'
import { Contract } from '../types'
import { findConfig, resolveConfig } from '../utils'

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

    const address = getAddress(contract.address)
    const contractInterface =
      typeof contract.source === 'function'
        ? await contract.source({ address, chainId: contract.chainId })
        : contract.source

    contracts.push({
      addressOrName: address,
      name: contract.name,
      chainId: contract.chainId,
      contractInterface,
    })
    contractNames.add(contract.name)
  }
}
