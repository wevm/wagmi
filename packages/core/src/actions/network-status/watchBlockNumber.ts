import { shallow } from 'zustand/shallow'

import { getClient } from '../../client'
import type { PublicClient, WebSocketPublicClient } from '../../types'
import { getPublicClient, getWebSocketPublicClient } from '../viem'
import type { FetchBlockNumberResult } from './fetchBlockNumber'

export type WatchBlockNumberArgs = { chainId?: number; listen: boolean }
export type WatchBlockNumberCallback = (
  blockNumber: FetchBlockNumberResult,
) => void

export function watchBlockNumber(
  args: WatchBlockNumberArgs,
  callback: WatchBlockNumberCallback,
) {
  let unwatch: () => void
  const createListener = (
    publicClient: PublicClient | WebSocketPublicClient,
  ) => {
    if (unwatch) unwatch()
    unwatch = publicClient.watchBlockNumber({
      onBlockNumber: callback,
      emitOnBegin: true,
      poll: true,
    })
  }

  const publicClient_ =
    getWebSocketPublicClient({ chainId: args.chainId }) ??
    getPublicClient({ chainId: args.chainId })
  if (args.listen) createListener(publicClient_)

  const client = getClient()
  const unsubscribe = client.subscribe(
    ({ publicClient, webSocketPublicClient }) => ({
      publicClient,
      webSocketPublicClient,
    }),
    async ({ publicClient, webSocketPublicClient }) => {
      const publicClient_ = webSocketPublicClient ?? publicClient
      if (args.listen && !args.chainId && publicClient_) {
        createListener(publicClient_)
      }
    },
    {
      equalityFn: shallow,
    },
  )
  return () => {
    unsubscribe()
    unwatch?.()
  }
}
