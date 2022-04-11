import { Signer } from 'ethers/lib/ethers'

import { getClient } from '../../client'

export type FetchSignerResult = Signer | null

export async function fetchSigner(): Promise<FetchSignerResult> {
  const client = getClient()
  const signer = (await client.connector?.getSigner?.()) || null
  return signer
}
