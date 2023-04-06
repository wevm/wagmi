import { getClient } from '../../client'
import type { Signer } from '../../types'

export type FetchSignerArgs = {
  /** Chain ID to use for signer */
  chainId?: number
}

export type FetchSignerResult = Signer | null

export async function fetchSigner({
  chainId,
}: FetchSignerArgs = {}): Promise<FetchSignerResult> {
  const client = getClient()
  const signer = (await client.connector?.getSigner?.({ chainId })) || null
  return signer
}
