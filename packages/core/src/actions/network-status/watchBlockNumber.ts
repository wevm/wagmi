import type { BaseProvider } from '@ethersproject/providers'

import { client } from '../../client'
import { FetchBlockNumberResult, fetchBlockNumber } from './fetchBlockNumber'

export type WatchBlockNumberArgs = { listen: boolean }
export type WatchBlockNumberCallback = (
  blockNumber: FetchBlockNumberResult,
) => void

export function watchBlockNumber(
  args: WatchBlockNumberArgs,
  callback: WatchBlockNumberCallback,
) {
  let prevProvider: BaseProvider
  const createListener = (provider: BaseProvider) => {
    const listener = (blockNumber: FetchBlockNumberResult) => {
      callback(blockNumber)
    }
    if (prevProvider) {
      prevProvider?.off('block', listener)
    }
    provider.on('block', listener)
    prevProvider = provider
  }

  const { provider, webSocketProvider } = client
  const provider_ = webSocketProvider ?? provider
  if (args.listen) createListener(provider_)

  const unsubscribe = client.subscribe(
    ({ provider, webSocketProvider }) => ({ provider, webSocketProvider }),
    async ({ provider, webSocketProvider }) => {
      const provider_ = webSocketProvider ?? provider
      if (args.listen && provider_) {
        createListener(provider_)
      }
      callback(await fetchBlockNumber())
    },
    {
      equalityFn: (selected, previous) =>
        selected.provider === previous.provider &&
        selected.webSocketProvider === previous.webSocketProvider,
    },
  )
  return unsubscribe
}
