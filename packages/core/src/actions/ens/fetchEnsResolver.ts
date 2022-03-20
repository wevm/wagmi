import type { Resolver } from '@ethersproject/providers'

import { client } from '../../client'

export type FetchEnsResolverArgs = {
  /** ENS name to resolve */
  name: string
}

export type FetchEnsResolverResult = Resolver | null

export async function fetchEnsResolver({
  name,
}: FetchEnsResolverArgs): Promise<FetchEnsResolverResult> {
  const resolver = await client.provider.getResolver(name)
  return resolver
}
