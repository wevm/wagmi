import type { Abi } from 'abitype'
import { getAddress, isAddress } from 'ethers/lib/utils.js'

import * as logger from '../logger'
import type { Contract } from '../types'
import { AbiSchema, findConfig, resolveConfig } from '../utils'

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
    let abi: Abi
    if (typeof contract.source === 'function')
      abi = await contract.source({ address })
    else abi = contract.source

    // Parse contract interface into types
    const parsed = AbiSchema.parse(abi)
    console.log({
      abi,
      parsed,
    })

    contracts.push({
      abi: parsed,
      address: address,
      name: contract.name,
    })
    contractNames.add(contract.name)
  }
}
