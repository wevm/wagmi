import { BitPluginAvatar } from '@dotbit/plugin-avatar'
import type { Address } from 'abitype'
import { CoinType, createInstance } from 'dotbit'

const dotbit = createInstance()
dotbit.installPlugin(new BitPluginAvatar())

export type FetchDotbitAvatarArgs = {
  /** Address or ENS name */
  address: Address
  /** Chain id to use for keyInfo */
  chainId?: number
}

export type FetchDotbitAvatarResult = string | null

export async function fetchDotbitAvatar({
  address,
  chainId,
}: FetchDotbitAvatarArgs): Promise<FetchDotbitAvatarResult> {
  const account = await dotbit.reverse({
    key: address,
    coin_type: CoinType.ETH,
    chain_id: chainId?.toString(),
  })
  if (!account) {
    return null
  }
  const avatar = await dotbit.avatar(account.account)
  return avatar?.url || null
}
