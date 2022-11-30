import type { Abi, Address, ExtractAbiFunction } from 'abitype'
import type { PopulatedTransaction } from 'ethers'

import { ConnectorNotFoundError } from '../../errors'
import type { Signer } from '../../types'
import type {
  DefaultOptions,
  GetConfig,
  GetOverridesForAbiStateMutability,
  Options as Options_,
} from '../../types/contracts'
import { assertActiveChain } from '../../utils'
import { fetchSigner } from '../accounts'
import type { SendTransactionResult } from '../transactions'
import { sendTransaction } from '../transactions'
import { prepareWriteContract } from './prepareWriteContract'

type Options = Options_ & { isRequestOptional?: boolean }
type Request = PopulatedTransaction & {
  to: Address
  gasLimit: NonNullable<PopulatedTransaction['gasLimit']>
}

export type WriteContractPreparedArgs<
  TOptions extends Options = DefaultOptions,
> = {
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
  args?: never
  overrides?: never
} & (TOptions['isRequestOptional'] extends true
  ? {
      /** The prepared request. */
      request?: Request
    }
  : {
      /** The prepared request. */
      request: Request
    })

export type WriteContractUnpreparedArgs<
  TAbi = Abi,
  TFunctionName = string,
  TOptions extends Options = DefaultOptions,
> = {
  mode: 'recklesslyUnprepared'
  request?: never
} & GetConfig<
  {
    abi: TAbi
    functionName: TFunctionName
    /** Call overrides */
    overrides?: GetOverridesForAbiStateMutability<
      [TAbi, TFunctionName] extends [
        infer TAbi_ extends Abi,
        infer TFunctionName_ extends string,
      ]
        ? ExtractAbiFunction<TAbi_, TFunctionName_>['stateMutability']
        : 'nonpayable' | 'payable'
    >
  },
  'nonpayable' | 'payable',
  TOptions
>

export type WriteContractArgs<
  TAbi = Abi,
  TFunctionName = string,
  TOptions extends Options = DefaultOptions,
> = Omit<
  GetConfig<
    {
      abi: TAbi
      functionName: TFunctionName
      /** Chain id to use for provider */
      chainId?: number
    },
    'nonpayable' | 'payable',
    TOptions
  >,
  'args'
> &
  (
    | WriteContractUnpreparedArgs<TAbi, TFunctionName, TOptions>
    | WriteContractPreparedArgs<TOptions>
  )
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
  args,
  chainId,
  abi,
  functionName,
  mode,
  overrides,
  request: request_,
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

  const request =
    mode === 'recklesslyUnprepared'
      ? (
          await prepareWriteContract<Abi | readonly unknown[], string>({
            address,
            args,
            chainId,
            abi: abi as Abi, // TODO: Remove cast and still support `Narrow<TAbi>`
            functionName,
            overrides,
          })
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
