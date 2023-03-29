import type { Address } from 'abitype'
import { getAddress } from 'ethers/lib/utils.js'

import { getProvider } from '../providers'

export type FetchEnsNameArgs = {
  /** Address to lookup */
  address: Address
  /** Chain id to use for provider */
  chainId?: number
}

export type FetchEnsNameResult = string | null

export async function fetchEnsName({
  address,
  chainId,
}: FetchEnsNameArgs): Promise<FetchEnsNameResult> {
  const provider = getProvider({ chainId })
  return provider.getEnsName({
    address: getAddress(address),
    // TODO(viem-migration): remove below once viem updates to new universal resolver contract.
    universalResolverAddress: '0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376',
  })
}
