import { shallow } from 'zustand/shallow'

import { getClient } from '../../client'
import type { Provider, WebSocketProvider } from '../../types'
import { getProvider, getWebSocketProvider } from '../providers'
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
  const createListener = (provider: Provider | WebSocketProvider) => {
    if (unwatch) unwatch()
    unwatch = provider.watchBlockNumber({
      onBlockNumber: callback,
      emitOnBegin: true,
    })
  }

  const provider_ =
    getWebSocketProvider({ chainId: args.chainId }) ??
    getProvider({ chainId: args.chainId })
  if (args.listen) createListener(provider_)

  const client = getClient()
  const unsubscribe = client.subscribe(
    ({ provider, webSocketProvider }) => ({ provider, webSocketProvider }),
    async ({ provider, webSocketProvider }) => {
      const provider_ = webSocketProvider ?? provider
      if (args.listen && !args.chainId && provider_) {
        createListener(provider_)
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
