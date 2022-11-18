import type { Address } from 'abitype'
import type { providers } from 'ethers'
import { isAddress } from 'ethers/lib/utils.js'

import { ConnectorNotFoundError } from '../../errors'
import type { Signer } from '../../types'
import { assertActiveChain } from '../../utils'
import { fetchSigner } from '../accounts'
import { fetchEnsAddress } from '../ens'

export type PrepareSendTransactionArgs<TSigner extends Signer = Signer> = {
  /** Chain ID used to validate if the signer is connected to the target chain */
  chainId?: number
  /** Request data to prepare the transaction */
  request: providers.TransactionRequest & {
    to: NonNullable<providers.TransactionRequest['to']>
  }
  signer?: TSigner | null
}

export type PrepareSendTransactionResult = {
  chainId?: number
  request: providers.TransactionRequest & {
    to: Address
    gasLimit: NonNullable<providers.TransactionRequest['gasLimit']>
  }
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
  const signer = signer_ ?? (await fetchSigner({ chainId }))
  if (!signer) throw new ConnectorNotFoundError()
  if (chainId) assertActiveChain({ chainId, signer })

  const [to, gasLimit] = await Promise.all([
    isAddress(request.to)
      ? Promise.resolve(request.to)
      : fetchEnsAddress({ name: request.to }),
    request.gasLimit
      ? Promise.resolve(request.gasLimit)
      : signer.estimateGas(request),
  ])

  if (!to) throw new Error('Could not resolve ENS name')

  return {
    ...(chainId ? { chainId } : {}),
    request: { ...request, gasLimit, to },
    mode: 'prepared',
  }
}
