import { shallow } from 'zustand/shallow'

import { getClient } from '../../client'
import type { GetWalletClientArgs, GetWalletClientResult } from '../viem'
import { getWalletClient } from '../viem'

export type WatchWalletClientArgs = GetWalletClientArgs

export type WatchWalletClientCallback = (data: GetWalletClientResult) => void

export function watchWalletClient(
  { chainId }: WatchWalletClientArgs,
  callback: WatchWalletClientCallback,
) {
  const client = getClient()
  const handleChange = async () => {
    const walletClient = await getWalletClient({ chainId })
    if (!getClient().connector) return callback(null)
    return callback(walletClient)
  }
  const unsubscribe = client.subscribe(
    ({ data, connector }) => ({
      account: data?.account,
      chainId: data?.chain?.id,
      connector,
    }),
    handleChange,
    {
      equalityFn: shallow,
    },
  )
  return unsubscribe
}
