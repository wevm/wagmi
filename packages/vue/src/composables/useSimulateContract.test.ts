import { connect, disconnect } from '@wagmi/core'
import { abi, address, config, wait } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test } from 'vitest'

import { useSimulateContract } from './useSimulateContract.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const [result] = renderComposable(() =>
    useSimulateContract({
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'mint',
    }),
  )

  await waitFor(result.isSuccess)

  expect(result.data.value).toMatchInlineSnapshot(`
    {
      "chainId": 1,
      "request": {
        "__mode": "prepared",
        "abi": [
          {
            "inputs": [],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
          },
        ],
        "account": {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "type": "json-rpc",
        },
        "address": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        "args": undefined,
        "chainId": 1,
        "dataSuffix": undefined,
        "functionName": "mint",
      },
      "result": undefined,
    }
  `)

  await disconnect(config, { connector })
})

test('behavior: disabled when properties missing', async () => {
  const [result] = renderComposable(() => useSimulateContract())

  await wait(100)

  expect(result.fetchStatus.value).toBe('idle')
})
