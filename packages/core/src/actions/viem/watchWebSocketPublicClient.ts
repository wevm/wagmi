import { getClient } from '../../client'
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
  const client = getClient()
  const handleChange = async () =>
    callback(getWebSocketPublicClient<TWebSocketPublicClient>(args))
  const unsubscribe = client.subscribe(
    ({ webSocketPublicClient }) => webSocketPublicClient,
    handleChange,
  )
  return unsubscribe
}
