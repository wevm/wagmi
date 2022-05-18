import { getClient } from '../../client'
import { Provider } from '../../types'
import { FetchBlockNumberResult, fetchBlockNumber } from './fetchBlockNumber'

export type WatchBlockNumberArgs = { listen: boolean }
export type WatchBlockNumberCallback = (
  blockNumber: FetchBlockNumberResult,
) => void

export function watchBlockNumber(
  args: WatchBlockNumberArgs,
  callback: WatchBlockNumberCallback,
) {
  let previousProvider: Provider
  const createListener = (provider: Provider) => {
    if (previousProvider) {
      previousProvider?.off('block', callback)
    }
    provider.on('block', callback)
    previousProvider = provider
  }

  const client = getClient()
  const provider_ = client.webSocketProvider ?? client.provider
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
  return () => {
    unsubscribe()
    provider_?.off('block', callback)
  }
}
