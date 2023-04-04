import { GetEnsResolverReturnType } from 'viem'
import { normalize } from 'viem/ens'
import { getProvider } from '../providers'

export type FetchEnsResolverArgs = {
  /** Chain id to use for provider */
  chainId?: number
  /** ENS name to resolve */
  name: string
}

export type FetchEnsResolverResult = GetEnsResolverReturnType

export async function fetchEnsResolver({
  chainId,
  name,
}: FetchEnsResolverArgs): Promise<FetchEnsResolverResult> {
  const provider = getProvider({ chainId })
  const resolver = await provider.getEnsResolver({ name: normalize(name) })
  return resolver
}
