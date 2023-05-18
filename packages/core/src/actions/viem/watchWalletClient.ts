import { shallow } from 'zustand/shallow'

import { getConfig } from '../../config'
import type { GetWalletClientArgs, GetWalletClientResult } from '../viem'
import { getWalletClient } from '../viem'

export type WatchWalletClientArgs = GetWalletClientArgs

export type WatchWalletClientCallback = (data: GetWalletClientResult) => void

export function watchWalletClient(
  { chainId }: WatchWalletClientArgs,
  callback: WatchWalletClientCallback,
) {
  const config = getConfig()
  const handleChange = async ({ chainId: chainId_ }: { chainId?: number }) => {
    if (chainId && chainId_ && chainId !== chainId_) return
    const walletClient = await getWalletClient({ chainId })
    if (!getConfig().connector) return callback(null)
    return callback(walletClient)
  }
  const unsubscribe = config.subscribe(
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
