import type { Abi, Address } from 'abitype'
import { Abi as AbiSchema } from 'abitype/zod'
import type { ZodError } from 'zod'

import type { SourceFn } from '../config'
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
    abi: Abi | Record<number, Abi>
    address: Address | Record<number, Address>
    name: string
  }
  const contracts: Record<string, Contract> = {}
  for (const contract of parsedConfig.contracts) {
    const contractName = contract.name
    logger.log(`Fetching contract interface for ${contractName}`)
    if (contractNames.has(contractName))
      throw new Error('Contract name must be unique')

    // Retrieve source
    if ('deployments' in contract) {
      for (const deployment of contract.deployments) {
        const abi = await retrieveSourceAbi({
          name: contract.name,
          ...deployment,
        })
        if (contract.name in contracts)
          contracts[contractName] = {
            ...contracts[contractName]!,
            abi: {
              ...(contracts[contractName]!.abi as Record<number, Abi>),
              [deployment.chainId]: abi,
            },
            address: {
              ...(contracts[contractName]!.address as Record<number, Address>),
              [deployment.chainId]: deployment.address,
            },
          }
        else
          contracts[contractName] = {
            abi: {
              [deployment.chainId]: abi,
            },
            address: {
              [deployment.chainId]: deployment.address,
            },
            name: contractName,
          }
      }
    } else {
      const abi = await retrieveSourceAbi(contract)
      contracts[contract.name] = {
        abi,
        ...contract,
      }
    }

    contractNames.add(contract.name)
  }

  console.log(contracts)
}

async function retrieveSourceAbi(contract: {
  address: Address
  chainId?: number
  name: string
  source: Abi | SourceFn
}) {
  let abi: Abi
  if (typeof contract.source === 'function') {
    try {
      abi = await contract.source({
        address: contract.address,
        chainId: contract.chainId,
      })
      console.log('foo')
    } catch (error) {
      console.log('bar')
      throw new Error(`Failed to fetch contract ABI for ${contract.name}`)
    }
  } else abi = contract.source

  console.log('baz')
  try {
    return await AbiSchema.parseAsync(abi)
  } catch (error) {
    logger.warn(abi)
    const zodError = error as ZodError<typeof AbiSchema>
    throw new Error(`Invalid format for ${contract.name} ABI`)
  }
}
