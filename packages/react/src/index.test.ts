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
      "useEnsAddress",
      "useEnsAvatar",
      "useEnsName",
      "useEnsResolver",
      "useFeeData",
      "usePrepareSendTransaction",
      "useReconnect",
      "useSignMessage",
      "useSwitchAccount",
      "useSwitchChain",
      "useToken",
      "useWaitForTransactionReceipt",
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
