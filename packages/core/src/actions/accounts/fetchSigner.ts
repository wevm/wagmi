import { Signer } from 'ethers/lib/ethers'

import { wagmiClient } from '../../client'

export type FetchSignerResult = Signer | undefined

export async function fetchSigner(): Promise<FetchSignerResult> {
  const signer = await wagmiClient.connector?.getSigner()
  return signer
}
