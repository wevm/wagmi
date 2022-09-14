import {
  Abi,
  AbiFunction,
  AbiParametersToPrimitiveTypes,
  Address,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from 'abitype'
import { CallOverrides, PopulatedTransaction } from 'ethers/lib/ethers'

import {
  ConnectorNotFoundError,
  ContractMethodDoesNotExistError,
} from '../../errors'
import { Signer } from '../../types'
import { IsNever, NotEqual, Or } from '../../types/utils'
import { minimizeContractInterface } from '../../utils'
import { fetchSigner } from '../accounts'
import { getContract } from './getContract'

export type PrepareWriteContractConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TSigner extends Signer = Signer,
  TFunction extends AbiFunction & { type: 'function' } = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : never,
> = {
  /** Contract address */
  addressOrName: Address
  /** Chain ID used to validate if the signer is connected to the target chain */
  chainId?: number
  /** Contract ABI */
  contractInterface: TAbi
  /** Method to call on contract */
  functionName: [TFunctionName] extends [never] ? string : TFunctionName
  /** Call overrides */
  overrides?: CallOverrides
  signer?: TSigner | null
} & (AbiParametersToPrimitiveTypes<
  TFunction['inputs']
> extends infer TArgs extends readonly any[]
  ? Or<IsNever<TArgs>, NotEqual<TAbi, Abi>> extends true
    ? {
        /**
         * Arguments to pass contract method
         *
         * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link abi} for better type inference.
         */
        args?: readonly any[]
      }
    : TArgs['length'] extends 0
    ? { args?: never }
    : {
        /** Arguments to pass contract method */
        args: TArgs
      }
  : never)

export type PrepareWriteContractResult = {
  contractInterface: Abi | readonly unknown[]
  addressOrName: Address
  chainId?: number
  functionName: string
  mode: 'prepared'
  overrides?: CallOverrides
  request: PopulatedTransaction & {
    to: Address
    gasLimit: NonNullable<PopulatedTransaction['gasLimit']>
  }
}

/**
 * @description Prepares the parameters required for a contract write transaction.
 *
 * Returns config to be passed through to `writeContract`.
 *
 * @example
 * import { prepareWriteContract, writeContract } from '@wagmi/core'
 *
 * const config = await prepareWriteContract({
 *  addressOrName: '0x...',
 *  contractInterface: wagmiAbi,
 *  functionName: 'mint',
 * })
 * const result = await writeContract(config)
 */
export async function prepareWriteContract<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends TAbi extends Abi
    ? ExtractAbiFunctionNames<TAbi, 'payable' | 'nonpayable'>
    : string,
  TSigner extends Signer = Signer,
>({
  addressOrName,
  args,
  chainId,
  contractInterface,
  functionName,
  overrides,
  signer: signer_,
}: PrepareWriteContractConfig<
  TAbi,
  TFunctionName,
  TSigner
>): Promise<PrepareWriteContractResult> {
  const signer = signer_ ?? (await fetchSigner())
  if (!signer) throw new ConnectorNotFoundError()

  const contract = getContract({
    addressOrName,
    contractInterface,
    signerOrProvider: signer,
  })

  const populateTransactionFn = contract.populateTransaction[functionName]
  if (!populateTransactionFn) {
    throw new ContractMethodDoesNotExistError({
      addressOrName: addressOrName,
      functionName,
    })
  }

  const params = [
    ...(Array.isArray(args) ? args : args ? [args] : []),
    ...(overrides ? [overrides] : []),
  ]
  const unsignedTransaction = (await populateTransactionFn(
    ...params,
  )) as PopulatedTransaction & {
    to: Address
  }
  const gasLimit =
    unsignedTransaction.gasLimit ||
    (await signer.estimateGas(unsignedTransaction))

  const minimizedAbi = minimizeContractInterface({
    contractInterface,
    functionName,
  })

  return {
    contractInterface: minimizedAbi,
    addressOrName,
    chainId,
    functionName,
    mode: 'prepared',
    overrides,
    request: {
      ...unsignedTransaction,
      gasLimit,
    },
  }
}
