import { accounts, address, chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { parseEther, parseGwei } from 'viem'
import { callQueryOptions } from './call.js'

const name4bytes = '0x06fdde03'
const account = accounts[0]

test('default', () => {
  expect(
    callQueryOptions(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "call",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "data": "0x06fdde03",
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
    }
  `)
})

test('parameters: accessList', () => {
  expect(
    callQueryOptions(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      accessList: [
        {
          address: '0x1',
          storageKeys: ['0x1'],
        },
      ],
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "call",
        {
          "accessList": [
            {
              "address": "0x1",
              "storageKeys": [
                "0x1",
              ],
            },
          ],
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "data": "0x06fdde03",
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
    }
  `)
})

test('parameters: blockNumber', () => {
  expect(
    callQueryOptions(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      blockNumber: 1234567890n,
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "call",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "blockNumber": 1234567890n,
          "data": "0x06fdde03",
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
    }
  `)
})

test('parameters: blockTag', () => {
  expect(
    callQueryOptions(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      blockTag: 'safe',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "call",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "blockTag": "safe",
          "data": "0x06fdde03",
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    callQueryOptions(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      chainId: chain.mainnet2.id,
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "call",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chainId": 456,
          "data": "0x06fdde03",
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
    }
  `)
})

test('parameters: gas', () => {
  expect(
    callQueryOptions(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      gas: 100000n,
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "call",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "data": "0x06fdde03",
          "gas": 100000n,
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
    }
  `)
})

test('parameters: gasPrice', () => {
  expect(
    callQueryOptions(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      gasPrice: parseGwei('20'),
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "call",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "data": "0x06fdde03",
          "gasPrice": 20000000000n,
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
    }
  `)
})

test('parameters: maxFeePerGas', () => {
  expect(
    callQueryOptions(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      maxFeePerGas: parseGwei('20'),
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "call",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "data": "0x06fdde03",
          "maxFeePerGas": 20000000000n,
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
    }
  `)
})

test('parameters: maxPriorityFeePerGas', () => {
  expect(
    callQueryOptions(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      maxPriorityFeePerGas: parseGwei('2'),
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "call",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "data": "0x06fdde03",
          "maxPriorityFeePerGas": 2000000000n,
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
    }
  `)
})

test('parameters: nonce', () => {
  expect(
    callQueryOptions(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      nonce: 123,
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "call",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "data": "0x06fdde03",
          "nonce": 123,
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
        },
      ],
    }
  `)
})

test('parameters: type', () => {
  expect(
    callQueryOptions(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      type: 'eip1559',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "call",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "data": "0x06fdde03",
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "type": "eip1559",
        },
      ],
    }
  `)
})

test('parameters: value', () => {
  expect(
    callQueryOptions(config, {
      account,
      data: name4bytes,
      to: address.wagmiMintExample,
      value: parseEther('1'),
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "call",
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "data": "0x06fdde03",
          "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
          "value": 1000000000000000000n,
        },
      ],
    }
  `)
})
