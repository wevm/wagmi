import { Signer } from 'ethers/lib/ethers'

import { client } from '../../client'

export type FetchSignerResult = Signer | null

export async function fetchSigner(): Promise<FetchSignerResult> {
  const signer = (await client.connector?.getSigner?.()) || null
  return signer
}
