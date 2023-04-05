import type { Abi } from 'abitype'
import type {
  Account,
  Chain,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem'

import { ConnectorNotFoundError } from '../../errors'
import type { Signer } from '../../types'
import { assertActiveChain } from '../../utils'
import { fetchSigner } from '../accounts'
import type { PrepareWriteContractConfig } from './prepareWriteContract'
import { prepareWriteContract } from './prepareWriteContract'

export type WriteContractMode = 'prepared' | 'recklesslyUnprepared'

export type WriteContractPreparedArgs<
  TAbi extends Abi | readonly unknown[] = readonly unknown[],
  TFunctionName extends string = string,
> = Omit<
  WriteContractParameters<TAbi, TFunctionName, Chain, Account>,
  'abi' | 'account' | 'address' | 'chain' | 'functionName' | 'args'
> & {
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
  /** Chain id to use for provider. */
  chainId?: number
  /** Write contract request. */
  request: WriteContractParameters<TAbi, TFunctionName, Chain, Account>

  abi?: never
  address?: never
  functionName?: never
  args?: never
}

export type WriteContractUnpreparedArgs<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
> = Omit<
  WriteContractParameters<TAbi, TFunctionName, Chain, Account>,
  'account' | 'chain'
> & {
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
  request?: never
}

export type WriteContractArgs<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
> =
  | WriteContractPreparedArgs<TAbi, TFunctionName>
  | WriteContractUnpreparedArgs<TAbi, TFunctionName>

export type WriteContractResult = { hash: WriteContractReturnType }

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

  let request: WriteContractParameters<TAbi, TFunctionName, Chain, Account>
  if (config.mode === 'prepared') {
    request = config.request
  } else {
    const { chainId, mode, ...args } = config
    const res = await prepareWriteContract(args as PrepareWriteContractConfig)
    request = res.request as unknown as WriteContractParameters<
      TAbi,
      TFunctionName,
      Chain,
      Account
    >
  }

  const hash = await signer.writeContract(request)

  /********************************************************************/
  /** END: iOS App Link cautious code.                                */
  /** Go nuts!                                                        */
  /********************************************************************/

  return { hash }
}
