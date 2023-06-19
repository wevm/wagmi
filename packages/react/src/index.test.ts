import { expect, test } from 'vitest'

import * as react from './index.js'

test('exports', () => {
  expect(Object.keys(react)).toMatchInlineSnapshot(`
    [
      "WagmiConfig",
      "WagmiContext",
      "Context",
      "BaseError",
      "WagmiConfigNotFoundError",
      "useAccount",
      "useBalance",
      "useBlockNumber",
      "useChainId",
      "useConfig",
      "useConnect",
      "useConnections",
      "useDisconnect",
      "useReconnect",
      "useSwitchAccount",
      "useSwitchChain",
      "useSwitchNetwork",
      "createConfig",
      "createConnector",
      "ChainNotConfiguredError",
      "ProviderNotFoundError",
      "ConnectorAlreadyConnectedError",
      "createQueryClient",
      "createStorage",
      "noopStorage",
      "deserialize",
      "normalizeChainId",
      "serialize",
    ]
  `)
})
