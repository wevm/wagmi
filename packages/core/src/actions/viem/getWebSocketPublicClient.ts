import { getClient } from '../../client'
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
  const client = getClient<any, TWebSocketPublicClient>()
  if (chainId)
    return (
      client.getWebSocketPublicClient({ chainId }) ||
      client.webSocketPublicClient
    )
  return client.webSocketPublicClient
}
