import type { Abi, Address, ExtractAbiFunction, Narrow } from 'abitype'
import type { PopulatedTransaction } from 'ethers'

import { ConnectorNotFoundError } from '../../errors'
import type { Signer } from '../../types'
import type {
  GetArgs,
  GetFunctionName,
  GetOverridesForAbiStateMutability,
} from '../../types/contracts'
import { assertActiveChain } from '../../utils'
import { fetchSigner } from '../accounts'
import type { SendTransactionResult } from '../transactions'
import { sendTransaction } from '../transactions'
import { prepareWriteContract } from './prepareWriteContract'

export type WriteContractMode = 'prepared' | 'recklesslyUnprepared'

type Request = PopulatedTransaction & {
  to: Address
  gasLimit: NonNullable<PopulatedTransaction['gasLimit']>
}

export type WriteContractPreparedArgs<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
> = {
  /**
   * `recklesslyUnprepared`: Allow to pass through unprepared config. Note: This has
   * [UX pitfalls](https://wagmi.sh/react/prepare-hooks#ux-pitfalls-without-prepare-hooks),
   * it is highly recommended to not use this and instead prepare the request upfront
   * using the {@link prepareWriteContract} function.
   *
   * `prepared`: The request has been prepared with parameters required for sending a transaction
   * via the {@link prepareWriteContract} function
   * */
  mode: 'prepared'
  /** Chain id to use for provider */
  chainId?: number
  /** Request to submit transaction for */
  request: Request

  /** Contract ABI */
  abi: Narrow<TAbi> // infer `TAbi` type for inline usage
  /** Contract address */
  address: Address
  /** Function to invoke on the contract */
  functionName: GetFunctionName<TAbi, TFunctionName, 'nonpayable' | 'payable'>
}

export type WriteContractUnpreparedArgs<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
> = {
  /**
   * `recklesslyUnprepared`: Allow to pass through unprepared config. Note: This has
   * [UX pitfalls](https://wagmi.sh/react/prepare-hooks#ux-pitfalls-without-prepare-hooks),
   * it is highly recommended to not use this and instead prepare the request upfront
   * using the {@link prepareWriteContract} function.
   *
   * `prepared`: The request has been prepared with parameters required for sending a transaction
   * via the {@link prepareWriteContract} function
   * */
  mode: 'recklesslyUnprepared'
  /** Chain id to use for provider */
  chainId?: number
  /** Call overrides */
  overrides?: GetOverridesForAbiStateMutability<
    [TAbi, TFunctionName] extends [
      infer TAbi_ extends Abi,
      infer TFunctionName_ extends string,
    ]
      ? ExtractAbiFunction<TAbi_, TFunctionName_>['stateMutability']
      : 'nonpayable' | 'payable'
  >

  /** Contract ABI */
  abi: Narrow<TAbi> // infer `TAbi` type for inline usage
  /** Contract address */
  address: Address
  /** Function to invoke on the contract */
  functionName: GetFunctionName<TAbi, TFunctionName, 'nonpayable' | 'payable'>
} & GetArgs<TAbi, TFunctionName>

export type WriteContractArgs<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
> =
  | WriteContractPreparedArgs<TAbi, TFunctionName>
  | WriteContractUnpreparedArgs<TAbi, TFunctionName>

export type WriteContractResult = SendTransactionResult

/**
 * @description Function to call a contract write method.
 *
 * It is recommended to pair this with the {@link prepareWriteContract} function
 * to avoid [UX pitfalls](https://wagmi.sh/react/prepare-hooks#ux-pitfalls-without-prepare-hooks).
 *
 * @example
 * import { prepareWriteContract, writeContract } from '@wagmi/core'
 *
 * const config = await prepareWriteContract({
 *   address: '0x...',
 *   abi: wagmiAbi,
 *   functionName: 'mint',
 * })
 * const result = await writeContract(config)
 */
export async function writeContract<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TSigner extends Signer = Signer,
>(
  config:
    | WriteContractUnpreparedArgs<TAbi, TFunctionName>
    | WriteContractPreparedArgs<TAbi, TFunctionName>,
): Promise<WriteContractResult> {
  /****************************************************************************/
  /** START: iOS App Link cautious code.                                      */
  /** Do not perform any async operations in this block.                      */
  /** Ref: https://wagmi.sh/react/prepare-hooks#ios-app-link-constraints */
  /****************************************************************************/

  const signer = await fetchSigner<TSigner>()
  if (!signer) throw new ConnectorNotFoundError()
  if (config.chainId) assertActiveChain({ chainId: config.chainId, signer })

  let request: Request
  if (config.mode === 'prepared') {
    request = config.request
  } else {
    request = (
      await prepareWriteContract<Abi | readonly unknown[], string, number>({
        address: config.address,
        args: config.args as unknown[],
        chainId: config.chainId,
        abi: config.abi as Abi, // TODO: Remove cast and still support `Narrow<TAbi>`
        functionName: config.functionName,
        overrides: config.overrides,
      })
    ).request
  }

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
