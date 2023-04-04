import { GetEnsAvatarReturnType, normalize } from 'viem/ens'
import { getProvider } from '../providers'

export type FetchEnsAvatarArgs = {
  /** ENS name */
  name: string
  /** Chain id to use for provider */
  chainId?: number
}

export type FetchEnsAvatarResult = GetEnsAvatarReturnType

export async function fetchEnsAvatar({
  name,
  chainId,
}: FetchEnsAvatarArgs): Promise<FetchEnsAvatarResult> {
  const provider = getProvider({ chainId })
  const avatar = await provider.getEnsAvatar({ name: normalize(name) })
  return avatar
}
