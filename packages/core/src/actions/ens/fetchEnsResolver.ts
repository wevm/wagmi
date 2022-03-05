import { Resolver } from '@ethersproject/providers'

import { wagmiClient } from '../../client'

export type FetchEnsResolverArgs = {
  /** ENS name to resolve */
  name: string
}

export type FetchEnsResolverResult = Resolver | null

export async function fetchEnsResolver({
  name,
}: FetchEnsResolverArgs): Promise<FetchEnsResolverResult> {
  const resolver = await wagmiClient.provider.getResolver(name)
  return resolver
}
