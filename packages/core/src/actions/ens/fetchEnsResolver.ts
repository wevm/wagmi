import type { GetEnsResolverReturnType } from 'viem'

import { getPublicClient } from '../viem'

export type FetchEnsResolverArgs = {
  /** Chain id to use for Public Client */
  chainId?: number
  /** ENS name to resolve */
  name: string
}

export type FetchEnsResolverResult = GetEnsResolverReturnType

export async function fetchEnsResolver({
  chainId,
  name,
}: FetchEnsResolverArgs): Promise<FetchEnsResolverResult> {
  const { normalize } = await import('viem/ens')
  const publicClient = getPublicClient({ chainId })
  const resolver = await publicClient.getEnsResolver({ name: normalize(name) })
  return resolver
}
