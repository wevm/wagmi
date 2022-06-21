import { CallOverrides, Contract as EthersContract } from 'ethers/lib/ethers'
import { Result } from 'ethers/lib/utils'

import { getProvider } from '../providers'
import { GetContractArgs, getContract } from './getContract'

export type ReadContractConfig = {
  addressOrName: GetContractArgs['addressOrName']
  /** Arguments to pass contract method */
  args?: any | any[]
  /** Chain id to use for provider */
  chainId?: number
  contractInterface: GetContractArgs['contractInterface']
  /** Function to invoke on the contract */
  functionName: string
  /** Call overrides */
  overrides?: CallOverrides
}
export type ReadContractResult<Data = Result> = Data

export async function readContract<
  Contract extends EthersContract = EthersContract,
  Data = Result,
>({
  addressOrName,
  args,
  chainId,
  contractInterface,
  functionName,
  overrides,
}: ReadContractConfig): Promise<ReadContractResult<Data>> {
  const provider = getProvider({ chainId })
  const contract = getContract<Contract>({
    addressOrName,
    contractInterface,
    signerOrProvider: provider,
  })

  const params = [
    ...(Array.isArray(args) ? args : args ? [args] : []),
    ...(overrides ? [overrides] : []),
  ]

  const contractFunction = contract[functionName]
  if (!contractFunction)
    console.warn(
      `"${functionName}" is not in the interface for contract "${addressOrName}"`,
    )
  const response = (await contractFunction?.(...params)) as Data
  return response
}
