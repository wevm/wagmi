import { CallOverrides, Contract as EthersContract } from 'ethers/lib/ethers'
import { Result } from 'ethers/lib/utils'

import { wagmiClient } from '../../client'
import { GetContractArgs, getContract } from './getContract'

export type ReadContractArgs = GetContractArgs
export type ReadContractConfig = {
  /** Arguments to pass contract method */
  args?: any | any[]
  overrides?: CallOverrides
}
export type ReadContractResult = Result

export async function readContract<
  Contract extends EthersContract = EthersContract,
>(
  contractConfig: ReadContractArgs,
  functionName: string,
  { args, overrides }: ReadContractConfig = {},
): Promise<Result> {
  const { provider } = wagmiClient
  const contract = getContract<Contract>({
    signerOrProvider: provider,
    ...contractConfig,
  })

  const params = [
    ...(Array.isArray(args) ? args : args ? [args] : []),
    ...(overrides ? [overrides] : []),
  ]

  const response = (await contract[functionName](...params)) as Result
  return response
}
