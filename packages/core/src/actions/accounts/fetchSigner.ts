import { getClient } from '../../client'
import { Signer } from '../../types'

export type FetchSignerResult<TSigner extends Signer = Signer> = TSigner | null

export async function fetchSigner<TSigner extends Signer = Signer>(): Promise<
  FetchSignerResult<TSigner>
> {
  const client = getClient()
  const account = client.data?.account
  const signer = (await client.connector?.getSigner?.({ account })) || null
  return signer
}
