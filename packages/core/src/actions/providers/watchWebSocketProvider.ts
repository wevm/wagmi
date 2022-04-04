import type { WebSocketProvider } from '@ethersproject/providers'

import { client } from '../../client'
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
  const handleChange = async () =>
    callback(await getWebSocketProvider<TWebSocketProvider>())
  const unsubscribe = client.subscribe(({ provider }) => provider, handleChange)
  return unsubscribe
}
