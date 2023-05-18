import { getConfig } from '../../config'
import type { WebSocketPublicClient } from '../../types'
import type {
  GetWebSocketPublicClientArgs,
  GetWebSocketPublicClientResult,
} from './getWebSocketPublicClient'
import { getWebSocketPublicClient } from './getWebSocketPublicClient'

export type WatchWebSocketPublicClientCallback<
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
> = (
  webSocketPublicClient: GetWebSocketPublicClientResult<TWebSocketPublicClient>,
) => void

export function watchWebSocketPublicClient<
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
>(
  args: GetWebSocketPublicClientArgs,
  callback: WatchWebSocketPublicClientCallback<TWebSocketPublicClient>,
) {
  const config = getConfig()
  const handleChange = async () =>
    callback(getWebSocketPublicClient<TWebSocketPublicClient>(args))
  const unsubscribe = config.subscribe(
    ({ webSocketPublicClient }) => webSocketPublicClient,
    handleChange,
  )
  return unsubscribe
}
