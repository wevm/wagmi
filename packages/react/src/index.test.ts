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
      "useEnsAddress",
      "useEnsAvatar",
      "useEnsName",
      "useEnsResolver",
      "useChainId",
      "useConfig",
      "useConnect",
      "useConnections",
      "useDisconnect",
      "useReconnect",
      "useSignMessage",
      "useSwitchAccount",
      "useSwitchChain",
      "createConfig",
      "createConnector",
      "ChainNotConfiguredError",
      "ProviderNotFoundError",
      "ConnectorAlreadyConnectedError",
      "createStorage",
      "noopStorage",
      "deserialize",
      "normalizeChainId",
      "serialize",
    ]
  `)
})
