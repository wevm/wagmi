import { expect, test } from 'vitest'

import * as vue from './index.js'

test('exports', () => {
  expect(Object.keys(vue)).toMatchInlineSnapshot(`
    [
      "configKey",
      "WagmiPlugin",
      "BaseError",
      "WagmiProviderNotFoundError",
      "WagmiInjectionContextError",
      "useAccount",
      "useBlockNumber",
      "useChainId",
      "useChains",
      "useConfig",
      "useConnect",
      "useConnections",
      "useConnectors",
      "useDisconnect",
      "useSwitchChain",
      "createConfig",
      "createConnector",
      "ChainNotConfiguredError",
      "ConnectorAlreadyConnectedError",
      "ConnectorNotFoundError",
      "ConnectorAccountNotFoundError",
      "ProviderNotFoundError",
      "SwitchChainNotSupportedError",
      "createStorage",
      "noopStorage",
      "custom",
      "fallback",
      "http",
      "webSocket",
      "unstable_connector",
      "cookieStorage",
      "cookieToInitialState",
      "deepEqual",
      "deserialize",
      "normalizeChainId",
      "parseCookie",
      "serialize",
      "version",
    ]
  `)
})
