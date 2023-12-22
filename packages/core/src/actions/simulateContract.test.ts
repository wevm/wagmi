import { abi, accounts, address, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { simulateContract } from './simulateContract.js'

const connector = config.connectors[0]!

test('parameters: account', async () => {
  await expect(
    simulateContract(config, {
      account: accounts[0],
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'mint',
    }),
  ).resolves.toMatchInlineSnapshot(`
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
        "chainId": undefined,
        "dataSuffix": undefined,
        "functionName": "mint",
      },
      "result": undefined,
    }
  `)
})

test('parameters: connector', async () => {
  await connect(config, { connector })

  await expect(
    simulateContract(config, {
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'mint',
      connector,
    }),
  ).resolves.toMatchInlineSnapshot(`
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
        "chainId": undefined,
        "dataSuffix": undefined,
        "functionName": "mint",
      },
      "result": undefined,
    }
  `)

  await disconnect(config, { connector })
})
