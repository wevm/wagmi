import { WebSocketProvider } from '@ethersproject/providers'

import { wagmiClient } from '../../client'

export type GetWebSocketProviderResult = WebSocketProvider | undefined

export function getWebSocketProvider(): GetWebSocketProviderResult {
  return wagmiClient.webSocketProvider
}
