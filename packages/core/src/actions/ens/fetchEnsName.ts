import { client } from '../../client'

export type FetchEnsNameArgs = {
  /** Address to lookup */
  address: string
}

export type FetchEnsNameResult = string | null

export async function fetchEnsName({
  address,
}: FetchEnsNameArgs): Promise<FetchEnsNameResult> {
  const ensName = await client.provider.lookupAddress(address)
  return ensName
}
