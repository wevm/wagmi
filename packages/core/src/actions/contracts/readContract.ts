import { CallOverrides, Contract as EthersContract } from 'ethers/lib/ethers'
import { Result } from 'ethers/lib/utils'

import { getProvider } from '../providers'
import { GetContractArgs, getContract } from './getContract'

export type ReadContractArgs = Pick<
  GetContractArgs,
  'addressOrName' | 'contractInterface'
>
export type ReadContractConfig = {
  /** Arguments to pass contract method */
  args?: any | any[]
  /** Chain id to use for provider */
  chainId?: number
  /** Call overrides */
  overrides?: CallOverrides
}
export type ReadContractResult = Result

export async function readContract<
  Contract extends EthersContract = EthersContract,
>(
  contractConfig: ReadContractArgs,
  functionName: string,
  { args, chainId, overrides }: ReadContractConfig = {},
): Promise<Result> {
  const provider = getProvider({ chainId })
  const contract = getContract<Contract>({
    signerOrProvider: provider,
    ...contractConfig,
  })

  const params = [
    ...(Array.isArray(args) ? args : args ? [args] : []),
    ...(overrides ? [overrides] : []),
  ]

  const contractFunction = contract[functionName]
  if (!contractFunction)
    console.warn(
      `"${functionName}" does not in interface for contract "${contractConfig.addressOrName}"`,
    )
  const response = (await contractFunction?.(...params)) as Result
  return response
}
