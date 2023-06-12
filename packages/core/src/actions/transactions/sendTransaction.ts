import type {
  Account,
  Address,
  Chain,
  SendTransactionParameters,
  SendTransactionReturnType,
} from 'viem'

import { ConnectorNotFoundError } from '../../errors'
import { assertActiveChain } from '../../utils'
import { getWalletClient } from '../viem'
import { prepareSendTransaction } from './prepareSendTransaction'

export type SendTransactionArgs = {
  /** Chain ID used to validate if the walletClient is connected to the target chain */
  chainId?: number
  mode?: 'prepared'
  to: string
} & Omit<SendTransactionParameters<Chain, Account>, 'chain' | 'to'>

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
  accessList,
  account,
  chainId,
  data,
  gas,
  gasPrice,
  maxFeePerGas,
  maxPriorityFeePerGas,
  mode,
  nonce,
  to,
  value,
}: SendTransactionArgs): Promise<SendTransactionResult> {
  /********************************************************************/
  /** START: iOS App Link cautious code.                              */
  /** Do not perform any async operations in this block.              */
  /** Ref: wagmi.sh/react/prepare-hooks#ios-app-link-constraints */
  /********************************************************************/

  // `getWalletClient` isn't really "asynchronous" as we have already
  // initialized the Wallet Client upon user connection, so it will return
  // immediately.
  const walletClient = await getWalletClient({ chainId })
  if (!walletClient) throw new ConnectorNotFoundError()

  if (chainId) assertActiveChain({ chainId })

  let args: SendTransactionParameters<Chain, Account>
  if (mode === 'prepared') {
    args = {
      account,
      accessList,
      chain: null,
      data,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to: to as Address,
      value,
    }
  } else {
    args = await prepareSendTransaction({
      accessList,
      account,
      chainId,
      data,
      gas: gas || null,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to,
      value,
    })
  }

  const hash = await walletClient.sendTransaction({ ...args, chain: null })

  /********************************************************************/
  /** END: iOS App Link cautious code.                                */
  /** Go nuts!                                                        */
  /********************************************************************/

  return { hash }
}
