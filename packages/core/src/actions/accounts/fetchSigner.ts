import { getClient } from '../../client'
import type { Signer } from '../../types'

export type FetchSignerArgs = {
  /** Chain ID to use for signer */
  chainId?: number
}

export type FetchSignerResult<TSigner extends Signer = Signer> = TSigner | null

export async function fetchSigner<TSigner extends Signer = Signer>({
  chainId,
}: FetchSignerArgs = {}): Promise<FetchSignerResult<TSigner>> {
  const client = getClient()
  const signer = (await client.connector?.getSigner?.({ chainId })) || null
  return signer
}
