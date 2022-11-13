import { getClient } from '../../client'
import type { WebSocketProvider } from '../../types'
import type {
  GetWebSocketProviderArgs,
  GetWebSocketProviderResult,
} from './getWebSocketProvider'
import { getWebSocketProvider } from './getWebSocketProvider'

export type WatchWebSocketProviderCallback<
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = (webSocketProvider: GetWebSocketProviderResult<TWebSocketProvider>) => void

export function watchWebSocketProvider<
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
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
