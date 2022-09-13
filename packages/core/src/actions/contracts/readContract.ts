import {
  Abi,
  AbiFunction,
  AbiParametersToPrimitiveTypes,
  Address,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from 'abitype'
import { CallOverrides } from 'ethers/lib/ethers'

import { IsNever, NotEqual, Or, UnwrapArray } from '../../types/utils'
import { logWarn } from '../../utils'
import { getProvider } from '../providers'
import { getContract } from './getContract'

export type ReadContractConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TFunction extends AbiFunction & { type: 'function' } = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : never,
  TArgs = AbiParametersToPrimitiveTypes<TFunction['inputs']>,
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
} & (TArgs extends readonly any[]
  ? Or<IsNever<TArgs>, NotEqual<TAbi, Abi>> extends true
    ? {
        /**
         * Arguments to pass contract method
         *
         * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link abi} for better type inference.
         */
        args?: any[]
      }
    : TArgs['length'] extends 0
    ? { args?: never }
    : {
        /** Arguments to pass contract method */
        args: TArgs
      }
  : never)

export type ReadContractResult<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
> = TAbi extends Abi
  ? UnwrapArray<
      AbiParametersToPrimitiveTypes<
        ExtractAbiFunction<TAbi, TFunctionName>['outputs']
      >
    >
  : any

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

  const params = [
    ...(Array.isArray(args) ? args : args ? [args] : []),
    ...(overrides ? [overrides] : []),
  ]
  return await contractFunction?.(...params)
}
