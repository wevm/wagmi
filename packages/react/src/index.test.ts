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
      "useContractRead",
      "useContractReads",
      "useContractWrite",
      "useDisconnect",
      "useEnsAddress",
      "useEnsAvatar",
      "useEnsName",
      "useEnsResolver",
      "useFeeData",
      "useContractSimulate",
      "usePrepareSendTransaction",
      "useReconnect",
      "useSendTransaction",
      "useSignMessage",
      "useSignTypedData",
      "useSwitchAccount",
      "useSwitchChain",
      "useToken",
      "useTransaction",
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
