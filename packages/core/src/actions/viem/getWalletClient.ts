import { getConfig } from '../../config'
import type { WalletClient } from '../../types'

export type GetWalletClientArgs = {
  /** Chain ID to use for Wallet Client. */
  chainId?: number
}

export type GetWalletClientResult = WalletClient | null

export async function getWalletClient({
  chainId,
}: GetWalletClientArgs = {}): Promise<GetWalletClientResult> {
  const config = getConfig()
  const walletClient =
    (await config.connector?.getWalletClient?.({ chainId })) || null
  return walletClient
}
