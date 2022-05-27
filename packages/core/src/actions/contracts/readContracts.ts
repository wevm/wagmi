import { CallOverrides } from 'ethers/lib/ethers'
import { Result } from 'ethers/lib/utils'

import { multicall } from './multicall'
import { ReadContractConfig, readContract } from './readContract'

export type ReadContractsArgs = {
  addressOrName: ReadContractConfig['addressOrName']
  args?: ReadContractConfig['args']
  contractInterface: ReadContractConfig['contractInterface']
  functionName: ReadContractConfig['functionName']
}[]
export type ReadContractsConfig = {
  /** Chain id to use for provider */
  chainId?: number
  /** Call overrides */
  overrides?: CallOverrides
}
export type ReadContractsResult = Result[]

export async function readContracts(
  readContractsConfig: ReadContractsArgs,
  { chainId, overrides }: ReadContractsConfig = {},
): Promise<ReadContractsResult> {
  try {
    return await multicall(readContractsConfig, { chainId })
  } catch {
    return Promise.all(
      readContractsConfig.map((config) =>
        readContract({ ...config, chainId, overrides }),
      ),
    )
  }
}
