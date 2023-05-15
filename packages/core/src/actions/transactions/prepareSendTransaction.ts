import type { Account, Address, Chain, SendTransactionParameters } from 'viem'
import { isAddress } from 'viem'

import { ConnectorNotFoundError } from '../../errors'
import type { WalletClient } from '../../types'
import { assertActiveChain } from '../../utils'
import { fetchEnsAddress } from '../ens'
import { getPublicClient, getWalletClient } from '../viem'
import type { SendTransactionArgs } from './sendTransaction'

export type PrepareSendTransactionArgs<
  TWalletClient extends WalletClient = WalletClient,
> = Omit<SendTransactionParameters<Chain, Account>, 'chain' | 'gas' | 'to'> & {
  /** Chain ID used to validate if the walletClient is connected to the target chain */
  chainId?: number
  gas?: bigint | null
  to?: string
  walletClient?: TWalletClient | null
}

export type PrepareSendTransactionResult = Omit<
  SendTransactionArgs,
  'mode' | 'to'
> & {
  mode: 'prepared'
  to: Address
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
  accessList,
  account,
  chainId,
  data,
  gas: gas_,
  gasPrice,
  maxFeePerGas,
  maxPriorityFeePerGas,
  nonce,
  to: to_,
  value,
  walletClient: walletClient_,
}: PrepareSendTransactionArgs): Promise<PrepareSendTransactionResult> {
  const publicClient = getPublicClient({ chainId })
  const walletClient = walletClient_ ?? (await getWalletClient({ chainId }))
  if (!walletClient) throw new ConnectorNotFoundError()
  if (chainId) assertActiveChain({ chainId })

  const to =
    (to_ && !isAddress(to_)
      ? await fetchEnsAddress({ name: to_ })
      : (to_ as Address)) || undefined
  if (to && !isAddress(to)) throw new Error('Invalid address')

  const gas =
    typeof gas_ === 'undefined'
      ? await publicClient.estimateGas({
          accessList,
          account: walletClient.account,
          data,
          gas: gas_ ?? undefined,
          gasPrice,
          maxFeePerGas,
          maxPriorityFeePerGas,
          nonce,
          to,
          value,
        })
      : gas_ || undefined

  return {
    accessList,
    account,
    data,
    gas,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    mode: 'prepared',
    nonce,
    to: to!,
    value,
    ...(chainId ? { chainId } : {}),
  }
}
