import { providers } from 'ethers/lib/ethers'

import { getClient } from '../../client'

export type FetchSignerResult = providers.JsonRpcSigner | null

export async function fetchSigner(): Promise<FetchSignerResult> {
  const client = getClient()
  const signer = (await client.connector?.getSigner?.()) || null
  return signer
}
