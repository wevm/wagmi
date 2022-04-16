import { BaseProvider, WebSocketProvider } from '@ethersproject/providers'

import { ClientConfig, createClient } from '../src'
import {
  getMockConnector,
  getProvider,
  getSigners,
} from '../../core/test/utils'

type Config = Partial<ClientConfig>

export function setupWagmiClient(config: Config = {}) {
  return createClient<BaseProvider, WebSocketProvider>({
    connectors: [
      getMockConnector({
        signer: getSigners()[0],
      }),
    ],
    provider: getProvider,
    ...config,
  })
}

export function sleep(timeout: number): Promise<void> {
  return new Promise((resolve, _reject) => {
    setTimeout(resolve, timeout)
  })
}
