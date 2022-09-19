import {
  Abi,
  AbiFunction,
  Address,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from 'abitype'
import { CallOverrides, PopulatedTransaction } from 'ethers'

import { ConnectorNotFoundError } from '../../errors'
import { Signer } from '../../types'
import { GetArgs } from '../../types/utils'
import { assertActiveChain } from '../../utils'
import { fetchSigner } from '../accounts'
import { SendTransactionResult, sendTransaction } from '../transactions'
import {
  PrepareWriteContractConfig,
  prepareWriteContract,
} from './prepareWriteContract'

export type WriteContractPreparedArgs = {
  /**
   * `recklesslyUnprepared`: Allow to pass through unprepared config. Note: This has
   * [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks),
   * it is highly recommended to not use this and instead prepare the request upfront
   * using the {@link prepareWriteContract} function.
   *
   * `prepared`: The request has been prepared with parameters required for sending a transaction
   * via the {@link prepareWriteContract} function
   * */
  mode: 'prepared'
  /** The prepared request. */
  request: PopulatedTransaction & {
    to: Address
    gasLimit: NonNullable<PopulatedTransaction['gasLimit']>
  }
  args?: never
}

export type WriteContractUnpreparedArgs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TFunction extends AbiFunction & { type: 'function' } = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : never,
> = {
  mode: 'recklesslyUnprepared'
  request?: never
} & GetArgs<TAbi, TFunction>

export type WriteContractArgs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = {
  /** Contract address */
  addressOrName: Address
  /** Chain ID used to validate if the signer is connected to the target chain */
  chainId?: number
  /** Contract ABI */
  contractInterface: TAbi
  /** Method to call on contract */
  functionName: [TFunctionName] extends [never] ? string : TFunctionName
  overrides?: CallOverrides
} & (
  | WriteContractUnpreparedArgs<TAbi, TFunctionName>
  | WriteContractPreparedArgs
)
export type WriteContractResult = SendTransactionResult

/**
 * @description Function to call a contract write method.
 *
 * It is recommended to pair this with the {@link prepareWriteContract} function
 * to avoid [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks).
 *
 * @example
 * import { prepareWriteContract, writeContract } from '@wagmi/core'
 *
 * const config = await prepareWriteContract({
 *   addressOrName: '0x...',
 *   contractInterface: wagmiAbi,
 *   functionName: 'mint',
 * })
 * const result = await writeContract(config)
 */
export async function writeContract<
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
  mode,
  overrides,
  request: request_,
}: WriteContractArgs<TAbi, TFunctionName>): Promise<WriteContractResult> {
  /********************************************************************/
  /** START: iOS App Link cautious code.                              */
  /** Do not perform any async operations in this block.              */
  /** Ref: wagmi.sh/docs/prepare-hooks/intro#ios-app-link-constraints */
  /********************************************************************/

  const signer = await fetchSigner<TSigner>()
  if (!signer) throw new ConnectorNotFoundError()

  if (chainId) assertActiveChain({ chainId })

  if (mode === 'prepared') {
    if (!request_) throw new Error('`request` is required')
  }

  const request =
    mode === 'recklesslyUnprepared'
      ? (
          await prepareWriteContract(<
            PrepareWriteContractConfig<TAbi, TFunctionName, TSigner>
          >(<unknown>{
            addressOrName,
            args,
            contractInterface,
            functionName,
            overrides,
          }))
        ).request
      : request_

  const transaction = await sendTransaction({
    request,
    mode: 'prepared',
  })

  /********************************************************************/
  /** END: iOS App Link cautious code.                                */
  /** Go nuts!                                                        */
  /********************************************************************/

  return transaction
}
