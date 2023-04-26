import type {
  Account,
  Chain,
  SendTransactionParameters,
  SendTransactionReturnType,
} from 'viem'

import { ConnectorNotFoundError } from '../../errors'
import { assertActiveChain } from '../../utils'
import { getWalletClient } from '../viem'

export type SendTransactionPreparedRequest = {
  mode: 'prepared'
  /** The prepared request for sending a transaction. */
  request: SendTransactionParameters<Chain, Account>
}
export type SendTransactionUnpreparedRequest = {
  mode?: never
  /** The unprepared request for sending a transaction. */
  request: Omit<SendTransactionParameters<Chain, Account>, 'to'> & {
    to?: string
  }
}

export type SendTransactionArgs = {
  /** Chain ID used to validate if the walletClient is connected to the target chain */
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
  request,
}: SendTransactionArgs): Promise<SendTransactionResult> {
  /********************************************************************/
  /** START: iOS App Link cautious code.                              */
  /** Do not perform any async operations in this block.              */
  /** Ref: wagmi.sh/react/prepare-hooks#ios-app-link-constraints */
  /********************************************************************/

  // `getWalletClient` isn't really "asynchronous" as we have already
  // initialized the Wallet Client upon user connection, so it will return
  // immediately.
  const walletClient = await getWalletClient()
  if (!walletClient) throw new ConnectorNotFoundError()

  if (chainId) assertActiveChain({ chainId, walletClient })

  const hash = await walletClient.sendTransaction({
    ...request,
    chain: null,
  } as SendTransactionParameters)

  /********************************************************************/
  /** END: iOS App Link cautious code.                                */
  /** Go nuts!                                                        */
  /********************************************************************/

  return { hash }
}
