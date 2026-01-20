import { accounts, chain, config, typedData } from '@wagmi/test'
import { expect, test } from 'vitest'

import { verifyTypedDataQueryOptions } from './verifyTypedData.js'

const address = accounts[0]

test('default', () => {
  expect(
    verifyTypedDataQueryOptions(config, {
      address,
      ...typedData.basic,
      primaryType: 'Mail',
      signature:
        '0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c',
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "verifyTypedData",
        {
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "domain": {
            "chainId": 1,
            "name": "Ether Mail",
            "verifyingContract": "0x0000000000000000000000000000000000000000",
            "version": "1",
          },
          "message": {
            "contents": "Hello, Bob!",
            "from": {
              "name": "Cow",
              "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            },
            "to": {
              "name": "Bob",
              "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
            },
          },
          "primaryType": "Mail",
          "signature": "0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c",
          "types": {
            "Mail": [
              {
                "name": "from",
                "type": "Person",
              },
              {
                "name": "to",
                "type": "Person",
              },
              {
                "name": "contents",
                "type": "string",
              },
            ],
            "Person": [
              {
                "name": "name",
                "type": "string",
              },
              {
                "name": "wallet",
                "type": "address",
              },
            ],
          },
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    verifyTypedDataQueryOptions(config, {
      ...typedData.basic,
      domain: {
        ...typedData.basic.domain,
        chainId: chain.mainnet2.id,
      },
      chainId: chain.mainnet2.id,
      address,
      primaryType: 'Mail',
      signature:
        '0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c',
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "verifyTypedData",
        {
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "chainId": 456,
          "domain": {
            "chainId": 456,
            "name": "Ether Mail",
            "verifyingContract": "0x0000000000000000000000000000000000000000",
            "version": "1",
          },
          "message": {
            "contents": "Hello, Bob!",
            "from": {
              "name": "Cow",
              "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            },
            "to": {
              "name": "Bob",
              "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
            },
          },
          "primaryType": "Mail",
          "signature": "0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c",
          "types": {
            "Mail": [
              {
                "name": "from",
                "type": "Person",
              },
              {
                "name": "to",
                "type": "Person",
              },
              {
                "name": "contents",
                "type": "string",
              },
            ],
            "Person": [
              {
                "name": "name",
                "type": "string",
              },
              {
                "name": "wallet",
                "type": "address",
              },
            ],
          },
        },
      ],
    }
  `)
})

test('parameters: blockNumber', () => {
  expect(
    verifyTypedDataQueryOptions(config, {
      blockNumber: 1234567890n,
      address,
      ...typedData.basic,
      primaryType: 'Mail',
      signature:
        '0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c',
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "verifyTypedData",
        {
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "blockNumber": 1234567890n,
          "domain": {
            "chainId": 1,
            "name": "Ether Mail",
            "verifyingContract": "0x0000000000000000000000000000000000000000",
            "version": "1",
          },
          "message": {
            "contents": "Hello, Bob!",
            "from": {
              "name": "Cow",
              "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            },
            "to": {
              "name": "Bob",
              "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
            },
          },
          "primaryType": "Mail",
          "signature": "0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c",
          "types": {
            "Mail": [
              {
                "name": "from",
                "type": "Person",
              },
              {
                "name": "to",
                "type": "Person",
              },
              {
                "name": "contents",
                "type": "string",
              },
            ],
            "Person": [
              {
                "name": "name",
                "type": "string",
              },
              {
                "name": "wallet",
                "type": "address",
              },
            ],
          },
        },
      ],
    }
  `)
})

test('parameters: blockTag', () => {
  expect(
    verifyTypedDataQueryOptions(config, {
      blockTag: 'pending',
      address,
      ...typedData.basic,
      primaryType: 'Mail',
      signature:
        '0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c',
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": true,
      "queryFn": [Function],
      "queryKey": [
        "verifyTypedData",
        {
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "blockTag": "pending",
          "domain": {
            "chainId": 1,
            "name": "Ether Mail",
            "verifyingContract": "0x0000000000000000000000000000000000000000",
            "version": "1",
          },
          "message": {
            "contents": "Hello, Bob!",
            "from": {
              "name": "Cow",
              "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            },
            "to": {
              "name": "Bob",
              "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
            },
          },
          "primaryType": "Mail",
          "signature": "0xefd5fb29a274ea6682673d8b3caa9263e936d48d486e5df68893003e0a76496439594d12245008c6fba1c8e3ef28241cffe1bef27ff6bca487b167f261f329251c",
          "types": {
            "Mail": [
              {
                "name": "from",
                "type": "Person",
              },
              {
                "name": "to",
                "type": "Person",
              },
              {
                "name": "contents",
                "type": "string",
              },
            ],
            "Person": [
              {
                "name": "name",
                "type": "string",
              },
              {
                "name": "wallet",
                "type": "address",
              },
            ],
          },
        },
      ],
    }
  `)
})
