import { CallOverrides } from 'ethers/lib/ethers'
import { Result } from 'ethers/lib/utils'

import { multicall } from './multicall'
import { ReadContractConfig, readContract } from './readContract'

export type ReadContractsConfig = {
  /** Failures will fail silently */
  allowFailure?: boolean
  /** Chain id to use for provider */
  chainId?: number
  contracts: {
    addressOrName: ReadContractConfig['addressOrName']
    args?: ReadContractConfig['args']
    contractInterface: ReadContractConfig['contractInterface']
    functionName: ReadContractConfig['functionName']
  }[]
  /** Call overrides */
  overrides?: CallOverrides
}
export type ReadContractsResult<Data extends any[] = Result[]> = Data

export async function readContracts<Data extends any[] = Result[]>({
  allowFailure = true,
  chainId,
  contracts,
  overrides,
}: ReadContractsConfig): Promise<ReadContractsResult<Data>> {
  try {
    return await multicall<Data>({
      allowFailure,
      chainId,
      contracts,
      overrides,
    })
  } catch (err) {
    const promises = contracts.map((contract) =>
      readContract({ ...contract, chainId, overrides }),
    )
    if (allowFailure) {
      return (await Promise.allSettled(promises)).map((result) =>
        result.status === 'fulfilled' ? result.value : null,
      ) as Data
    }
    return Promise.all(promises) as Promise<Data>
  }
}
