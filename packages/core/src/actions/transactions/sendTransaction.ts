import { providers } from 'ethers'
import { isAddress } from 'ethers/lib/utils'

import {
  ChainMismatchError,
  ConnectorNotFoundError,
  ProviderRpcError,
  UserRejectedRequestError,
} from '../../errors'
import { fetchSigner, getNetwork } from '../accounts'
import { getProvider } from '../providers'
import { PrepareSendTransactionResult } from './prepareSendTransaction'

export type SendTransactionPreparedRequest = {
  type: 'prepared'
  /** A prepared request. */
  payload: PrepareSendTransactionResult['payload']
}
export type SendTransactionUnpreparedRequest = {
  type: 'dangerouslyUnprepared'
  /** A request that has not been "prepared" via `prepareSendTransaction`.
   * Providing this may cause UX issues (iOS deep linking issues, delay to
   * open wallet, etc).
   */
  payload: providers.TransactionRequest
}

export type SendTransactionArgs = {
  /** Chain ID used to validate if the signer is connected to the target chain */
  chainId?: number
  request: SendTransactionPreparedRequest | SendTransactionUnpreparedRequest
}

export type SendTransactionResult = providers.TransactionResponse

export async function sendTransaction({
  chainId,
  request,
}: SendTransactionArgs): Promise<SendTransactionResult> {
  if (request.type === 'prepared') {
    if (!request.payload.gasLimit) throw new Error('`gasLimit` is required')
    if (!request.payload.to) throw new Error('`to` is required')
    if (!isAddress(request.payload.to))
      throw new Error('`to` must be an address')
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
    const { hash } = await uncheckedSigner.sendTransaction(request.payload)

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
