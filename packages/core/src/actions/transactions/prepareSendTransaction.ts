import type { Account, Address, Chain, SendTransactionParameters } from 'viem'
import { isAddress } from 'viem'

import { ConnectorNotFoundError } from '../../errors'
import type { Signer } from '../../types'
import { assertActiveChain } from '../../utils'
import { fetchSigner } from '../accounts'
import { fetchEnsAddress } from '../ens'
import { getProvider } from '../providers'

export type PrepareSendTransactionArgs<TSigner extends Signer = Signer> = {
  /** Chain ID used to validate if the signer is connected to the target chain */
  chainId?: number
  /** Request data to prepare the transaction */
  request: Omit<SendTransactionParameters<Chain, Account>, 'to'> & {
    to?: string
  }
  signer?: TSigner | null
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
  signer: signer_,
}: PrepareSendTransactionArgs): Promise<PrepareSendTransactionResult> {
  const provider = getProvider({ chainId })
  const signer = signer_ ?? (await fetchSigner({ chainId }))
  if (!signer) throw new ConnectorNotFoundError()
  if (chainId) assertActiveChain({ chainId, signer })

  const to =
    (request.to && !isAddress(request.to)
      ? await fetchEnsAddress({ name: request.to })
      : (request.to as Address)) || undefined
  if (to && !isAddress(to)) throw new Error('Invalid address')

  const gas =
    request.gas ??
    (await provider.estimateGas({ ...request, account: signer.account, to }))

  return {
    ...(chainId ? { chainId } : {}),
    request: { ...request, gas, to },
    mode: 'prepared',
  }
}
