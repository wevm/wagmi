import { providers } from 'ethers'

import { getClient } from '../../client'
import {
  GetWebSocketProviderArgs,
  GetWebSocketProviderResult,
  getWebSocketProvider,
} from './getWebSocketProvider'

export type WatchWebSocketProviderCallback<
  TWebSocketProvider extends providers.WebSocketProvider = providers.WebSocketProvider,
> = (webSocketProvider: GetWebSocketProviderResult<TWebSocketProvider>) => void

export function watchWebSocketProvider<
  TWebSocketProvider extends providers.WebSocketProvider = providers.WebSocketProvider,
>(
  args: GetWebSocketProviderArgs,
  callback: WatchWebSocketProviderCallback<TWebSocketProvider>,
) {
  const client = getClient()
  const handleChange = async () =>
    callback(getWebSocketProvider<TWebSocketProvider>(args))
  const unsubscribe = client.subscribe(
    ({ webSocketProvider }) => webSocketProvider,
    handleChange,
  )
  return unsubscribe
}
