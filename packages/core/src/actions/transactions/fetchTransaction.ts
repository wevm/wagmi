import type { GetTransactionReturnType, Hex } from 'viem'

import { getPublicClient } from '../viem'

export type FetchTransactionArgs = {
  /** Chain ID used to validate if the Wallet Client is connected to the target chain */
  chainId?: number
  hash: Hex
}

export type FetchTransactionResult = GetTransactionReturnType

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
  const publicClient = getPublicClient({ chainId })
  return publicClient.getTransaction({ hash })
}
