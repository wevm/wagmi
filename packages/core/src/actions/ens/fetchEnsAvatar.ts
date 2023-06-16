import type { GetEnsAvatarReturnType } from 'viem/ens'
import { normalize } from 'viem/ens'

import { getPublicClient } from '../viem'

export type FetchEnsAvatarArgs = {
  /** ENS name */
  name: string
  /** Chain id to use for Public Client. */
  chainId?: number
  /** Universal Resolver contract address */
  universalResolverAddress?: `0x${string}`
}

export type FetchEnsAvatarResult = GetEnsAvatarReturnType

export async function fetchEnsAvatar({
  name,
  chainId,
  universalResolverAddress,
}: FetchEnsAvatarArgs): Promise<FetchEnsAvatarResult> {
  const publicClient = getPublicClient({ chainId })
  const avatar = await publicClient.getEnsAvatar({
    name: normalize(name),
    universalResolverAddress,
  })
  return avatar
}
