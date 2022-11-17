import type { providers } from 'ethers'

import type { Hash } from '../../types'
import { getProvider } from '../providers'

export type FetchTransactionArgs = {
  /** Chain ID used to validate if the signer is connected to the target chain */
  chainId?: number
  /** Transaction hash */
  hash: Hash
}

export type FetchTransactionResult = providers.TransactionResponse

/**
 * @description Fetches transaction for hash
 *
 * @example
 * import { fetchTransaction } from '@wagmi/core'
 *
 * const transaction = await fetchTransaction({
 *  chainId: 1,
 *  hash: '0x...',
 * })
 */
export async function fetchTransaction({
  chainId,
  hash,
}: FetchTransactionArgs): Promise<FetchTransactionResult> {
  const provider = getProvider({ chainId })
  return provider.getTransaction(hash)
}
