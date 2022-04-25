import { getAddress } from 'ethers/lib/utils'

import { getProvider } from '../providers'

export type FetchEnsAddressArgs = {
  /** Chain id to use for provider */
  chainId?: number
  /** ENS name to resolve */
  name: string
}

export type FetchEnsAddressResult = string | null

export async function fetchEnsAddress({
  chainId,
  name,
}: FetchEnsAddressArgs): Promise<FetchEnsAddressResult> {
  const provider = getProvider({ chainId })
  const address = await provider.resolveName(name)

  try {
    return address ? getAddress(address) : null
  } catch (_error) {
    return null
  }
}
