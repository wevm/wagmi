import type { WebSocketProvider } from '@ethersproject/providers'

import { getClient } from '../../client'
import {
  GetWebSocketProviderResult,
  getWebSocketProvider,
} from './getWebSocketProvider'

export type WatchWebSocketProviderCallback<
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = (webSocketProvider: GetWebSocketProviderResult<TWebSocketProvider>) => void

export function watchWebSocketProvider<
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
>(callback: WatchWebSocketProviderCallback<TWebSocketProvider>) {
  const client = getClient()
  const handleChange = async () =>
    callback(getWebSocketProvider<TWebSocketProvider>())
  const unsubscribe = client.subscribe(
    ({ webSocketProvider }) => webSocketProvider,
    handleChange,
  )
  return unsubscribe
}
