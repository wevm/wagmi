import type { Address } from 'abitype'
import { getAddress } from 'ethers/lib/utils.js'

import { getProvider } from '../providers'

export type FetchEnsAddressArgs = {
  /** Chain id to use for provider */
  chainId?: number
  /** ENS name to resolve */
  name: string
}

export type FetchEnsAddressResult = Address | null

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
