import { Signer } from 'ethers/lib/ethers'

import { getClient } from '../../client'

export type FetchSignerResult = Signer | undefined

export async function fetchSigner(): Promise<FetchSignerResult> {
  const client = getClient()
  const signer = await client.connector?.getSigner?.()
  return signer
}
