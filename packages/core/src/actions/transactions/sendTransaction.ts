import type { Address } from 'abitype'
import type { providers } from 'ethers'

import type { EthersError, ProviderRpcError } from '../../errors'
import { ConnectorNotFoundError, UserRejectedRequestError } from '../../errors'
import type { Hash, Signer } from '../../types'
import { assertActiveChain } from '../../utils'
import { fetchSigner } from '../accounts'

export type SendTransactionPreparedRequest = {
  /**
   * `recklesslyUnprepared`: Allow to pass through an unprepared `request`. Note: This has
   * [UX pitfalls](/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks), it is highly recommended
   * to not use this and instead prepare the request upfront using the `prepareSendTransaction` function.
   *
   * `prepared`: The request has been prepared with parameters required for sending a transaction
   * via the `prepareSendTransaction` function
   * */
  mode: 'prepared'
  /** The prepared request for sending a transaction. */
  request: providers.TransactionRequest & {
    to: Address
    gasLimit: NonNullable<providers.TransactionRequest['gasLimit']>
  }
}
export type SendTransactionUnpreparedRequest = {
  mode: 'recklesslyUnprepared'
  /** The unprepared request for sending a transaction. */
  request: providers.TransactionRequest
}

export type SendTransactionArgs = {
  /** Chain ID used to validate if the signer is connected to the target chain */
  chainId?: number
} & (SendTransactionPreparedRequest | SendTransactionUnpreparedRequest)

export type SendTransactionResult = {
  hash: Hash
  wait: providers.TransactionResponse['wait']
}

/**
 * @description Function to send a transaction.
 *
 * It is recommended to pair this with the `prepareSendTransaction` function to avoid
 * [UX pitfalls](https://wagmi.sh/react/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks).
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
  /** Ref: wagmi.sh/react/prepare-hooks/intro#ios-app-link-constraints */
  /********************************************************************/

  // `fetchSigner` isn't really "asynchronous" as we have already
  // initialized the provider upon user connection, so it will return
  // immediately.
  const signer = await fetchSigner<Signer>()
  if (!signer) throw new ConnectorNotFoundError()

  if (mode === 'prepared') {
    if (!request.gasLimit) throw new Error('`gasLimit` is required')
    if (!request.to) throw new Error('`to` is required')
  }

  if (chainId) assertActiveChain({ chainId, signer })

  try {
    // Why don't we just use `signer.sendTransaction`?
    // The `signer.sendTransaction` method performs async
    // heavy operations (such as fetching block number)
    // which is not really needed for our case.
    // Having async heavy operations has side effects
    // when using it in a click handler (iOS deep linking issues,
    // delay to open wallet, etc).

    const uncheckedSigner = (
      signer as providers.JsonRpcSigner
    ).connectUnchecked?.()
    const { hash, wait } = await (uncheckedSigner ?? signer).sendTransaction(
      request,
    )

    /********************************************************************/
    /** END: iOS App Link cautious code.                                */
    /** Go nuts!                                                        */
    /********************************************************************/

    return { hash: hash as Hash, wait }
  } catch (error) {
    if (
      (error as ProviderRpcError).code === 4001 ||
      (error as EthersError).code === 'ACTION_REJECTED'
    )
      throw new UserRejectedRequestError(error)
    throw error
  }
}
