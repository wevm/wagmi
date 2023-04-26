import type { Account, Address, Chain, SendTransactionParameters } from 'viem'
import { isAddress } from 'viem'

import { ConnectorNotFoundError } from '../../errors'
import type { WalletClient } from '../../types'
import { assertActiveChain } from '../../utils'
import { fetchEnsAddress } from '../ens'
import { getWalletClient } from '../viem'

export type PrepareSendTransactionArgs<
  TWalletClient extends WalletClient = WalletClient,
> = {
  /** Chain ID used to validate if the walletClient is connected to the target chain */
  chainId?: number
  /** Request data to prepare the transaction */
  request: Omit<SendTransactionParameters<Chain, Account>, 'to'> & {
    to?: string
  }
  walletClient?: TWalletClient | null
}

export type PrepareSendTransactionResult = {
  chainId?: number
  request: SendTransactionParameters<Chain, Account>
  mode: 'prepared'
}

/**
 * @description Prepares the parameters required for sending a transaction.
 *
 * Returns config to be passed through to `sendTransaction`.
 *
 * @example
 * import { prepareSendTransaction, sendTransaction } from '@wagmi/core'
 *
 * const config = await prepareSendTransaction({
 *  request: {
 *    to: 'moxey.eth',
 *    value: parseEther('1'),
 *  }
 * })
 * const result = await sendTransaction(config)
 */
export async function prepareSendTransaction({
  chainId,
  request,
  walletClient: walletClient_,
}: PrepareSendTransactionArgs): Promise<PrepareSendTransactionResult> {
  const walletClient = walletClient_ ?? (await getWalletClient({ chainId }))
  if (!walletClient) throw new ConnectorNotFoundError()
  if (chainId) assertActiveChain({ chainId, walletClient })

  const to =
    (request.to && !isAddress(request.to)
      ? await fetchEnsAddress({ name: request.to })
      : (request.to as Address)) || undefined
  if (to && !isAddress(to)) throw new Error('Invalid address')

  return {
    ...(chainId ? { chainId } : {}),
    request: { ...request, to },
    mode: 'prepared',
  }
}
