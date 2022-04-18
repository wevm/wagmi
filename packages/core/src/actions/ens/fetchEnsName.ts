import { getProvider } from '../providers'

export type FetchEnsNameArgs = {
  /** Address to lookup */
  address: string
  /** Chain id to use for provider */
  chainId?: number
}

export type FetchEnsNameResult = string | null

export async function fetchEnsName({
  address,
  chainId,
}: FetchEnsNameArgs): Promise<FetchEnsNameResult> {
  const provider = getProvider({ chainId })
  return await provider.lookupAddress(address)
}
