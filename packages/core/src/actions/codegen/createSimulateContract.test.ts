import { abi, address, chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from '../connect.js'
import { disconnect } from '../disconnect.js'
import { switchChain } from '../switchChain.js'
import { createSimulateContract } from './createSimulateContract.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const simulateWagmiMintExample = createSimulateContract({
    address: address.wagmiMintExample,
    abi: abi.wagmiMintExample,
  })

  await expect(
    simulateWagmiMintExample(config, {
      functionName: 'mint',
    }),
  ).resolves.toMatchInlineSnapshot(`
    {
      "chainId": 1,
      "request": {
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

test('multichain', async () => {
  await connect(config, { connector })

  const simulateWagmiMintExample = createSimulateContract({
    address: {
      [chain.mainnet.id]: address.wagmiMintExample,
      [chain.mainnet2.id]: address.wagmiMintExample,
    },
    abi: abi.wagmiMintExample,
  })

  await expect(
    simulateWagmiMintExample(config, {
      functionName: 'mint',
    }),
  ).resolves.toMatchObject({
    chainId: 1,
  })

  await switchChain(config, { chainId: chain.mainnet2.id })
  await expect(
    simulateWagmiMintExample(config, {
      functionName: 'mint',
      chainId: chain.mainnet2.id,
    }),
  ).resolves.toMatchInlineSnapshot(`
    {
      "chainId": 456,
      "request": {
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
        "chainId": 456,
        "dataSuffix": undefined,
        "functionName": "mint",
      },
      "result": undefined,
    }
  `)

  await switchChain(config, { chainId: chain.mainnet.id })
  await disconnect(config, { connector })
})

test('functionName', async () => {
  await connect(config, { connector })

  const simulateWagmiMintExample = createSimulateContract({
    address: address.wagmiMintExample,
    abi: abi.wagmiMintExample,
    functionName: 'mint',
  })

  await expect(
    simulateWagmiMintExample(config, {}),
  ).resolves.toMatchInlineSnapshot(`
    {
      "chainId": 1,
      "request": {
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
