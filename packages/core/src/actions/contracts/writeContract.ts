import type { Abi, ExtractAbiFunction } from 'abitype'

import { ConnectorNotFoundError } from '../../errors'
import type { Signer } from '../../types'
import type {
  GetConfig,
  GetOverridesForAbiStateMutability,
} from '../../types/contracts'
import { assertActiveChain } from '../../utils'
import { fetchSigner } from '../accounts'
import type { SendTransactionResult } from '../transactions'
import { sendTransaction } from '../transactions'
import type { Request } from './prepareWriteContract'
import { prepareWriteContract } from './prepareWriteContract'

export type WriteContractMode = 'prepared' | 'recklesslyUnprepared'
type StateMutability = 'nonpayable' | 'payable'

export type WriteContractPreparedArgs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = {
  args?: never
  /** Chain id to use for provider */
  chainId?: number
  /**
   * `recklesslyUnprepared`: Allow to pass through unprepared config. Note: This has
   * [UX pitfalls](https://wagmi.sh/react/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks),
   * it is highly recommended to not use this and instead prepare the request upfront
   * using the {@link prepareWriteContract} function.
   *
   * `prepared`: The request has been prepared with parameters required for sending a transaction
   * via the {@link prepareWriteContract} function
   * */
  mode: 'prepared'
  overrides?: never
  /** The prepared request. */
  request: Request
} & Omit<GetConfig<TAbi, TFunctionName, StateMutability>, 'args'>

export type WriteContractUnpreparedArgs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = {
  /** Chain id to use for provider */
  chainId?: number
  mode: 'recklesslyUnprepared'
  /** Overrides */
  overrides?: GetOverridesForAbiStateMutability<
    [TAbi, TFunctionName] extends [
      infer TAbi_ extends Abi,
      infer TFunctionName_ extends string,
    ]
      ? ExtractAbiFunction<TAbi_, TFunctionName_>['stateMutability']
      : StateMutability
  >
  request?: never
} & GetConfig<TAbi, TFunctionName, StateMutability>

export type WriteContractArgs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> =
  | WriteContractUnpreparedArgs<TAbi, TFunctionName>
  | WriteContractPreparedArgs<TAbi, TFunctionName>

export type WriteContractResult = SendTransactionResult

/**
 * @description Function to call a contract write method.
 *
 * It is recommended to pair this with the {@link prepareWriteContract} function
 * to avoid [UX pitfalls](https://wagmi.sh/react/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks).
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
>({
  address,
  chainId,
  abi,
  functionName,
  mode,
  overrides,
  request: request_,
  ...config
}: WriteContractArgs<TAbi, TFunctionName>): Promise<WriteContractResult> {
  /****************************************************************************/
  /** START: iOS App Link cautious code.                                      */
  /** Do not perform any async operations in this block.                      */
  /** Ref: https://wagmi.sh/react/prepare-hooks/intro#ios-app-link-constraints */
  /****************************************************************************/

  const signer = await fetchSigner<TSigner>()
  if (!signer) throw new ConnectorNotFoundError()
  if (chainId) assertActiveChain({ chainId, signer })
  if (mode === 'prepared')
    if (!request_) throw new Error('`request` is required')

  let request: Request
  if (mode === 'recklesslyUnprepared')
    request = (
      await prepareWriteContract<Abi | readonly unknown[], string>({
        address,
        args: config.args as unknown[],
        chainId,
        abi: abi as Abi, // TODO: Remove cast and still support `Narrow<TAbi>`
        functionName,
        overrides,
      })
    ).request
  else request = request_

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
