import type { Address } from 'abitype'
import { getAddress } from 'viem'

import { getPublicClient } from '../viem'

export type FetchEnsNameArgs = {
  /** Address to lookup */
  address: Address
  /** Chain id to use for Public Client */
  chainId?: number
}

export type FetchEnsNameResult = string | null

export async function fetchEnsName({
  address,
  chainId,
}: FetchEnsNameArgs): Promise<FetchEnsNameResult> {
  const publicClient = getPublicClient({ chainId })
  return publicClient.getEnsName({
    address: getAddress(address),
  })
}
