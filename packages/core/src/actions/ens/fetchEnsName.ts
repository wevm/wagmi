import { type Address, getAddress } from 'viem'

import { getPublicClient } from '../viem'

export type FetchEnsNameArgs = {
  /** Address to lookup */
  address: Address
  /** Chain id to use for Public Client */
  chainId?: number
  /** Universal Resolver contract address */
  universalResolverAddress?: `0x${string}`
}

export type FetchEnsNameResult = string | null

export async function fetchEnsName({
  address,
  chainId,
  universalResolverAddress,
}: FetchEnsNameArgs): Promise<FetchEnsNameResult> {
  const publicClient = getPublicClient({ chainId })
  return publicClient.getEnsName({
    address: getAddress(address),
    universalResolverAddress,
  })
}
