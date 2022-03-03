import { BaseProvider } from '@ethersproject/providers'

import { wagmiClient } from '../../client'
import { fetchBlockNumber } from './fetchBlockNumber'

export type WatchBlockNumberCallback = (blockNumber: number) => void

export function watchBlockNumber(callback: WatchBlockNumberCallback) {
  let prevProvider: BaseProvider
  const createListener = (provider: BaseProvider) => {
    const listener = (blockNumber: number) => {
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
  createListener(provider_)

  const unsubscribe = wagmiClient.subscribe(
    ({ provider, webSocketProvider }) => [provider, webSocketProvider],
    async ([provider, webSocketProvider]) => {
      const provider_ = webSocketProvider ?? provider
      if (provider_) {
        createListener(provider_)
      }
      callback(await fetchBlockNumber())
    },
  )
  return unsubscribe
}
