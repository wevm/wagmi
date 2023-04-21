import { getClient } from '../../client'
import type { WalletClient } from '../../types'

export type GetWalletClientArgs = {
  /** Chain ID to use for Wallet Client. */
  chainId?: number
}

export type GetWalletClientResult = WalletClient | null

export async function getWalletClient({
  chainId,
}: GetWalletClientArgs = {}): Promise<GetWalletClientResult> {
  const client = getClient()
  const walletClient =
    (await client.connector?.getWalletClient?.({ chainId })) || null
  return walletClient
}
