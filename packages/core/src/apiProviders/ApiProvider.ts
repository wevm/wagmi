import { providers } from 'ethers'

import { Chain } from '../types'

export type ApiProvider<
  Provider extends providers.BaseProvider = providers.BaseProvider,
  WebSocketProvider extends providers.BaseProvider = providers.WebSocketProvider,
> = (chain: Chain) => {
  chain: Chain
  provider: () => Provider
  webSocketProvider?: () => WebSocketProvider
} | null
