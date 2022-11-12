import { getClient } from '../../client'
import type { WebSocketProvider } from '../../types'

export type GetWebSocketProviderArgs = {
  /** Chain id to use for provider */
  chainId?: number
}

export type GetWebSocketProviderResult<
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = TWebSocketProvider | undefined

export function getWebSocketProvider<
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
>({
  chainId,
}: GetWebSocketProviderArgs = {}): GetWebSocketProviderResult<TWebSocketProvider> {
  const client = getClient<any, TWebSocketProvider>()
  if (chainId)
    return client.getWebSocketProvider({ chainId }) || client.webSocketProvider
  return client.webSocketProvider
}
