import { BaseProvider } from '@ethersproject/providers'

import { wagmiClient } from '../../client'
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

  const { provider, webSocketProvider } = wagmiClient
  const provider_ = webSocketProvider ?? provider
  if (args.listen) createListener(provider_)

  const unsubscribe = wagmiClient.subscribe(
    ({ provider, webSocketProvider }) => [provider, webSocketProvider],
    async ([provider, webSocketProvider]) => {
      const provider_ = webSocketProvider ?? provider
      if (args.listen && provider_) {
        createListener(provider_)
      }
      callback(await fetchBlockNumber())
    },
  )
  return unsubscribe
}
