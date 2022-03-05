import { wagmiClient } from '../../client'

export type FetchEnsAvatarArgs = {
  /** Address or ENS name */
  addressOrName: string
}

export type FetchEnsAvatarResult = string | null

export async function fetchEnsAvatar({
  addressOrName,
}: FetchEnsAvatarArgs): Promise<FetchEnsAvatarResult> {
  // TODO: Update with more advanced logic
  // https://github.com/ensdomains/ens-avatar
  const avatar = await wagmiClient.provider.getAvatar(addressOrName)
  return avatar
}
