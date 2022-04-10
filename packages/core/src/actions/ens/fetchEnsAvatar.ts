import { getProvider } from '../providers'

export type FetchEnsAvatarArgs = {
  /** Address or ENS name */
  addressOrName: string
  /** Chain id to use for provider */
  chainId?: number
}

export type FetchEnsAvatarResult = string | null

export async function fetchEnsAvatar({
  addressOrName,
  chainId,
}: FetchEnsAvatarArgs): Promise<FetchEnsAvatarResult> {
  const provider = getProvider({ chainId })
  // TODO: Update with more advanced logic
  // https://github.com/ensdomains/ens-avatar
  const avatar = await provider.getAvatar(addressOrName)
  return avatar
}
