import { accounts, chain, config } from '@wagmi/test'
import { parseEther, parseGwei } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { expect, test } from 'vitest'

import { prepareTransactionRequestQueryOptions } from './prepareTransactionRequest.js'

const targetAccount = accounts[0]

test('default', () => {
  expect(
    prepareTransactionRequestQueryOptions(config, {
      to: targetAccount,
      value: parseEther('1'),
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "prepareTransactionRequest",
        {
          "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "value": 1000000000000000000n,
        },
      ],
    }
  `)
})

test('parameters: account', () => {
  expect(
    prepareTransactionRequestQueryOptions(config, {
      account: privateKeyToAccount(
        '0x0123456789012345678901234567890123456789012345678901234567890123',
      ),
      to: targetAccount,
      value: parseEther('1'),
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "prepareTransactionRequest",
        {
          "account": {
            "address": "0x14791697260E4c9A71f18484C9f997B308e59325",
            "publicKey": "0x046655feed4d214c261e0a6b554395596f1f1476a77d999560e5a8df9b8a1a3515217e88dd05e938efdd71b2cce322bf01da96cd42087b236e8f5043157a9c068e",
            "signMessage": [Function],
            "signTransaction": [Function],
            "signTypedData": [Function],
            "source": "privateKey",
            "type": "local",
          },
          "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "value": 1000000000000000000n,
        },
      ],
    }
  `)
})

test('parameters: data', () => {
  expect(
    prepareTransactionRequestQueryOptions(config, {
      data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      to: targetAccount,
      value: parseEther('1'),
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "prepareTransactionRequest",
        {
          "data": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "value": 1000000000000000000n,
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    prepareTransactionRequestQueryOptions(config, {
      chainId: chain.mainnet2.id,
      to: targetAccount,
      value: parseEther('1'),
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "prepareTransactionRequest",
        {
          "chainId": 456,
          "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "value": 1000000000000000000n,
        },
      ],
    }
  `)
})

test('parameters: nonce', () => {
  expect(
    prepareTransactionRequestQueryOptions(config, {
      nonce: 5,
      to: targetAccount,
      value: parseEther('1'),
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "prepareTransactionRequest",
        {
          "nonce": 5,
          "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "value": 1000000000000000000n,
        },
      ],
    }
  `)
})

test('parameters: gasPrice', () => {
  expect(
    prepareTransactionRequestQueryOptions(config, {
      gasPrice: parseGwei('10'),
      to: targetAccount,
      value: parseEther('1'),
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "prepareTransactionRequest",
        {
          "gasPrice": 10000000000n,
          "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "value": 1000000000000000000n,
        },
      ],
    }
  `)
})

test('parameters: maxFeePerGas', () => {
  expect(
    prepareTransactionRequestQueryOptions(config, {
      maxFeePerGas: parseGwei('100'),
      to: targetAccount,
      value: parseEther('1'),
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "prepareTransactionRequest",
        {
          "maxFeePerGas": 100000000000n,
          "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "value": 1000000000000000000n,
        },
      ],
    }
  `)
})

test('parameters: maxPriorityFeePerGas', () => {
  expect(
    prepareTransactionRequestQueryOptions(config, {
      maxPriorityFeePerGas: parseGwei('5'),
      to: targetAccount,
      value: parseEther('1'),
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "prepareTransactionRequest",
        {
          "maxPriorityFeePerGas": 5000000000n,
          "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "value": 1000000000000000000n,
        },
      ],
    }
  `)
})

test('parameters: type', () => {
  expect(
    prepareTransactionRequestQueryOptions(config, {
      type: 'eip1559',
      to: targetAccount,
      value: parseEther('1'),
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "prepareTransactionRequest",
        {
          "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "type": "eip1559",
          "value": 1000000000000000000n,
        },
      ],
    }
  `)
})

test('parameters: parameters', () => {
  expect(
    prepareTransactionRequestQueryOptions(config, {
      parameters: ['gas'],
      to: targetAccount,
      value: parseEther('1'),
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "prepareTransactionRequest",
        {
          "parameters": [
            "gas",
          ],
          "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "value": 1000000000000000000n,
        },
      ],
    }
  `)
})
