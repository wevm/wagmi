import type { GetEnsAvatarReturnType } from 'viem/ens'
import { normalize } from 'viem/ens'

import { getPublicClient } from '../viem'

export type FetchEnsAvatarArgs = {
  /** ENS name */
  name: string
  /** Chain id to use for Public Client. */
  chainId?: number
}

export type FetchEnsAvatarResult = GetEnsAvatarReturnType

export async function fetchEnsAvatar({
  name,
  chainId,
}: FetchEnsAvatarArgs): Promise<FetchEnsAvatarResult> {
  const publicClient = getPublicClient({ chainId })
  const avatar = await publicClient.getEnsAvatar({ name: normalize(name) })
  return avatar
}
