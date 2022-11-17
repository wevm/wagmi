import type { Address } from 'abitype'

import { getProvider } from '../providers'

export type FetchEnsAvatarArgs = {
  /** Address or ENS name */
  address: Address
  /** Chain id to use for provider */
  chainId?: number
}

export type FetchEnsAvatarResult = string | null

export async function fetchEnsAvatar({
  address,
  chainId,
}: FetchEnsAvatarArgs): Promise<FetchEnsAvatarResult> {
  const provider = getProvider({ chainId })
  // TODO: Update with more advanced logic
  // https://github.com/ensdomains/ens-avatar
  const avatar = await provider.getAvatar(address)
  return avatar
}
