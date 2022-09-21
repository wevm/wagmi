import { Abi } from 'abitype'
import { CallOverrides } from 'ethers/lib/ethers'

import { GetReadParameters, GetReturnType } from '../../types/contracts'
import { logWarn } from '../../utils'
import { getProvider } from '../providers'
import { getContract } from './getContract'

declare module '../../types/contracts' {
  export interface ContractConfigExtended {
    /** Chain id to use for provider */
    chainId?: number
    /** Call overrides */
    overrides?: CallOverrides
  }
}

export type ReadContractConfig<
  TAbi = Abi,
  TFunctionName = string,
> = GetReadParameters<{
  contractInterface: TAbi
  functionName: TFunctionName
}>

export type ReadContractResult<
  TAbi = Abi,
  TFunctionName = string,
> = GetReturnType<{ contractInterface: TAbi; functionName: TFunctionName }>

export async function readContract<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>({
  addressOrName,
  args,
  chainId,
  contractInterface,
  functionName,
  overrides,
}: ReadContractConfig<TAbi, TFunctionName>): Promise<
  ReadContractResult<TAbi, TFunctionName>
> {
  const provider = getProvider({ chainId })
  const contract = getContract({
    addressOrName,
    contractInterface,
    signerOrProvider: provider,
  })

  const contractFunction = contract[<string>functionName]
  if (!contractFunction)
    logWarn(
      `"${functionName}" is not in the interface for contract "${addressOrName}"`,
    )

  const params = [...(args ?? []), ...(overrides ? [overrides] : [])]
  return await contractFunction?.(...params)
}
