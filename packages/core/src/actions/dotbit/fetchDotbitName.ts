import type { Address } from 'abitype'
import { CoinType, createInstance } from 'dotbit'

const dotbit = createInstance()

export type FetchDotbitNameArgs = {
  /** Address to lookup */
  address: Address
  /** Chain id to use for keyInfo */
  chainId?: number
}

export type FetchDotbitNameResult = string | null

export async function fetchDotbitName({
  address,
  chainId,
}: FetchDotbitNameArgs): Promise<FetchDotbitNameResult> {
  const account = await dotbit.reverse({
    key: address,
    coin_type: CoinType.ETH,
    chain_id: chainId?.toString(),
  })
  return account?.account || null
}
