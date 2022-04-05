import { client } from '../../client'
import { fetchAvatar } from './ensAvatar/fetchAvatar'

export type FetchEnsAvatarArgs = {
  /** Address or ENS name */
  addressOrName: string
}

export type FetchEnsAvatarResult = string | null

export async function fetchEnsAvatar({
  addressOrName,
}: FetchEnsAvatarArgs): Promise<FetchEnsAvatarResult> {
  if (addressOrName.slice(-4) !== '.eth') {
    const ensName = await client.provider.lookupAddress(addressOrName)
    if (!ensName) return null
    return await fetchAvatar(ensName)
  }
  return await fetchAvatar(addressOrName)
}
