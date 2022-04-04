import type { WebSocketProvider } from '@ethersproject/providers'

import { getClient } from '../../client'

export type GetWebSocketProviderResult<
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
> = TWebSocketProvider | undefined

export function getWebSocketProvider<
  TWebSocketProvider extends WebSocketProvider = WebSocketProvider,
>(): GetWebSocketProviderResult<TWebSocketProvider> {
  return getClient<any, TWebSocketProvider>().provider
}
