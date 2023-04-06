import type {
  Account,
  Chain,
  SendTransactionParameters,
  SendTransactionReturnType,
} from 'viem'

import { ConnectorNotFoundError } from '../../errors'
import { assertActiveChain } from '../../utils'
import { fetchSigner } from '../accounts'
import { prepareSendTransaction } from './prepareSendTransaction'

export type SendTransactionPreparedRequest = {
  /**
   * `recklesslyUnprepared`: Allow to pass through an unprepared `request`. Note: This has
   * [UX pitfalls](/docs/prepare-hooks#ux-pitfalls-without-prepare-hooks), it is highly recommended
   * to not use this and instead prepare the request upfront using the `prepareSendTransaction` function.
   *
   * `prepared`: The request has been prepared with parameters required for sending a transaction
   * via the `prepareSendTransaction` function
   * */
  mode: 'prepared'
  /** The prepared request for sending a transaction. */
  request: SendTransactionParameters<Chain, Account>
}
export type SendTransactionUnpreparedRequest = {
  mode: 'recklesslyUnprepared'
  /** The unprepared request for sending a transaction. */
  request: Omit<SendTransactionParameters<Chain, Account>, 'to'> & {
    to?: string
  }
}

export type SendTransactionArgs = {
  /** Chain ID used to validate if the signer is connected to the target chain */
  chainId?: number
} & (SendTransactionPreparedRequest | SendTransactionUnpreparedRequest)

export type SendTransactionResult = {
  hash: SendTransactionReturnType
}

/**
 * @description Function to send a transaction.
 *
 * It is recommended to pair this with the `prepareSendTransaction` function to avoid
 * [UX pitfalls](https://wagmi.sh/react/prepare-hooks#ux-pitfalls-without-prepare-hooks).
 *
 * @example
 * import { prepareSendTransaction, sendTransaction } from '@wagmi/core'
 *
 * const config = await prepareSendTransaction({
 *  to: 'moxey.eth',
 *  value: parseEther('1'),
 * })
 * const result = await sendTransaction(config)
 */
export async function sendTransaction({
  chainId,
  mode,
  request,
}: SendTransactionArgs): Promise<SendTransactionResult> {
  /********************************************************************/
  /** START: iOS App Link cautious code.                              */
  /** Do not perform any async operations in this block.              */
  /** Ref: wagmi.sh/react/prepare-hooks#ios-app-link-constraints */
  /********************************************************************/

  // `fetchSigner` isn't really "asynchronous" as we have already
  // initialized the provider upon user connection, so it will return
  // immediately.
  const signer = await fetchSigner()
  if (!signer) throw new ConnectorNotFoundError()

  if (chainId) assertActiveChain({ chainId, signer })

  if (mode === 'recklesslyUnprepared') {
    const res = await prepareSendTransaction({ chainId, request })
    request = res.request
  }

  const hash = await signer.sendTransaction(
    request as SendTransactionParameters,
  )

  /********************************************************************/
  /** END: iOS App Link cautious code.                                */
  /** Go nuts!                                                        */
  /********************************************************************/

  return { hash }
}
