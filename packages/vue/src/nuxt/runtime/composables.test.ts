import { expect, test } from 'vitest'

import * as composables from './composables.js'

test('exports only Nuxt auto-import composables', () => {
  expect(Object.keys(composables).sort()).toMatchInlineSnapshot(`
    [
      "useAccount",
      "useAccountEffect",
      "useBalance",
      "useBlockNumber",
      "useChainId",
      "useChains",
      "useClient",
      "useConfig",
      "useConnect",
      "useConnection",
      "useConnections",
      "useConnectorClient",
      "useConnectors",
      "useDisconnect",
      "useEnsAddress",
      "useEnsAvatar",
      "useEnsName",
      "useEstimateGas",
      "useReadContract",
      "useReconnect",
      "useSendTransaction",
      "useSignMessage",
      "useSignTypedData",
      "useSimulateContract",
      "useSwitchAccount",
      "useSwitchChain",
      "useSwitchConnection",
      "useTransaction",
      "useTransactionReceipt",
      "useWaitForTransactionReceipt",
      "useWatchBlockNumber",
      "useWriteContract",
    ]
  `)
})
