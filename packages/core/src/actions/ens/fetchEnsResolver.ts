import type { GetEnsResolverReturnType } from 'viem'
import { normalize } from 'viem/ens'

import { getPublicClient } from '../viem'

export type FetchEnsResolverArgs = {
  /** Chain id to use for Public Client */
  chainId?: number
  /** ENS name to resolve */
  name: string
  /** Universal Resolver contract address */
  universalResolverAddress?: `0x${string}`
}

export type FetchEnsResolverResult = GetEnsResolverReturnType

export async function fetchEnsResolver({
  chainId,
  name,
  universalResolverAddress,
}: FetchEnsResolverArgs): Promise<FetchEnsResolverResult> {
  const publicClient = getPublicClient({ chainId })
  const resolver = await publicClient.getEnsResolver({
    name: normalize(name),
    universalResolverAddress,
  })
  return resolver
}
