import { providers } from 'ethers'

import {
  ChainMismatchError,
  ConnectorNotFoundError,
  ProviderRpcError,
  UserRejectedRequestError,
} from '../../errors'
import { fetchSigner, getNetwork } from '../accounts'
import { getProvider } from '../providers'

export type SendTransactionPreparedRequest = {
  /**
   * `dangerouslyUnprepared`: Allow to pass through an unprepared `request`. Note: This has harmful
   * UX side-effects, it is highly recommended to not use this and instead prepare the request upfront
   * using the `prepareSendTransaction` function.
   *
   * `prepared`: The request has been prepared with parameters required for sending a transaction
   * via the `prepareSendTransaction` function
   * */
  mode: 'prepared'
  /** The prepared request for sending a transaction. */
  request: providers.TransactionRequest & {
    to: NonNullable<providers.TransactionRequest['to']>
    gasLimit: NonNullable<providers.TransactionRequest['gasLimit']>
  }
}
export type SendTransactionUnpreparedRequest = {
  mode: 'dangerouslyUnprepared'
  /** The unprepared request for sending a transaction. */
  request: providers.TransactionRequest
}

export type SendTransactionArgs = {
  /** Chain ID used to validate if the signer is connected to the target chain */
  chainId?: number
} & (SendTransactionPreparedRequest | SendTransactionUnpreparedRequest)

export type SendTransactionResult = providers.TransactionResponse

/**
 * @description Function to send a transaction.
 *
 * It is recommended to pair this with the {@link prepareSendTransaction} function to avoid harmful UX side-effects.
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
  if (mode === 'prepared') {
    if (!request.gasLimit) throw new Error('`gasLimit` is required')
    if (!request.to) throw new Error('`to` is required')
  }

  const { chain: activeChain, chains } = getNetwork()
  const activeChainId = activeChain?.id
  if (chainId && chainId !== activeChain?.id) {
    throw new ChainMismatchError({
      activeChain:
        chains.find((x) => x.id === activeChainId)?.name ??
        `Chain ${activeChainId}`,
      targetChain:
        chains.find((x) => x.id === chainId)?.name ?? `Chain ${chainId}`,
    })
  }

  try {
    /*********************************************************/
    /** START: WalletConnect mobile deep link cautious code. */
    /** Do not perform any async operations in this block.   */
    /*********************************************************/

    const provider = getProvider()

    // `fetchSigner` isn't really "asynchronous" as we have already
    // initialized the provider upon user connection, so it will return
    // immediately.
    const signer = await fetchSigner()
    if (!signer) throw new ConnectorNotFoundError()

    // Why don't we just use `signer.sendTransaction`?
    // The `signer.sendTransaction` method performs async
    // heavy operations (such as fetching block number)
    // which is not really needed for our case.
    // Having async heavy operations has side effects
    // when using it in a click handler (iOS deep linking issues,
    // delay to open wallet, etc).

    const uncheckedSigner = signer.connectUnchecked()
    const { hash } = await uncheckedSigner.sendTransaction(request)

    /********************************************************/
    /** END: WalletConnect mobile deep link cautious code.  */
    /** Go nuts!                                            */
    /********************************************************/

    // The unchecked `sendTransaction` only returns a hash, so we want to use
    // it to retrieve the full transaction once it has been mined.
    const transaction = await provider.getTransaction(hash)
    return transaction
  } catch (error) {
    if ((<ProviderRpcError>error).code === 4001)
      throw new UserRejectedRequestError(error)
    throw error
  }
}
