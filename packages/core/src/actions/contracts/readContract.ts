import {
  Abi,
  AbiFunction,
  Address,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from 'abitype'
import { CallOverrides } from 'ethers/lib/ethers'

import { GetArgs, GetResult } from '../../types/utils'
import { logWarn } from '../../utils'
import { getProvider } from '../providers'
import { getContract } from './getContract'

export type ReadContractConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TFunction extends AbiFunction & { type: 'function' } = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : never,
> = {
  /** Contract address */
  addressOrName: Address
  /** Chain id to use for provider */
  chainId?: number
  /** Contract ABI */
  contractInterface: TAbi
  /** Function to invoke on the contract */
  functionName: [TFunctionName] extends [never] ? string : TFunctionName
  /** Call overrides */
  overrides?: CallOverrides
} & GetArgs<TAbi, TFunction>

export type ReadContractResult<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
> = GetResult<TAbi, TFunctionName>

export async function readContract<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends TAbi extends Abi
    ? ExtractAbiFunctionNames<TAbi, 'view' | 'pure'>
    : string,
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
