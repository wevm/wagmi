import type { GetTransactionReturnType, Hex } from 'viem'

import { getProvider } from '../providers'

export type FetchTransactionArgs = {
  /** Chain ID used to validate if the signer is connected to the target chain */
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
  const provider = getProvider({ chainId })
  return provider.getTransaction({ hash })
}
