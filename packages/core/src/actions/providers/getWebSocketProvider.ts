import type { WebSocketProvider } from '@ethersproject/providers'

import { client } from '../../client'

export type GetWebSocketProviderResult = WebSocketProvider | undefined

export function getWebSocketProvider(): GetWebSocketProviderResult {
  return client.webSocketProvider
}
