import { Signer } from 'ethers/lib/ethers'

import { client } from '../../client'

export type FetchSignerResult = Signer | undefined

export async function fetchSigner(): Promise<FetchSignerResult> {
  const signer = await client.connector?.getSigner?.()
  return signer
}
