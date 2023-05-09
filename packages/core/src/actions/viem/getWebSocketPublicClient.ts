import { getConfig } from '../../config'
import type { WebSocketPublicClient } from '../../types'

export type GetWebSocketPublicClientArgs = {
  /** Chain id to use for public client */
  chainId?: number
}

export type GetWebSocketPublicClientResult<
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
> = TWebSocketPublicClient | undefined

export function getWebSocketPublicClient<
  TWebSocketPublicClient extends WebSocketPublicClient = WebSocketPublicClient,
>({
  chainId,
}: GetWebSocketPublicClientArgs = {}): GetWebSocketPublicClientResult<TWebSocketPublicClient> {
  const config = getConfig<any, TWebSocketPublicClient>()
  if (chainId)
    return (
      config.getWebSocketPublicClient({ chainId }) ||
      config.webSocketPublicClient
    )
  return config.webSocketPublicClient
}
