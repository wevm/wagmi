import { describe, expect, it } from 'vitest'

import { mainnet } from '../chains'
import { jsonRpcProvider } from './jsonRpc'

describe('jsonRpcProvider', () => {
  it('default', () => {
    const provider = jsonRpcProvider({
      rpc: (chain) => ({
        http: chain.rpcUrls.default.http[0]!,
      }),
    })(mainnet)
    expect(provider?.rpcUrls).toMatchInlineSnapshot(`
      {
        "http": [
          "https://cloudflare-eth.com",
        ],
        "webSocket": undefined,
      }
    `)
    expect(provider?.chain).toMatchInlineSnapshot(`
      {
        "blockExplorers": {
          "default": {
            "name": "Etherscan",
            "url": "https://etherscan.io",
          },
          "etherscan": {
            "name": "Etherscan",
            "url": "https://etherscan.io",
          },
        },
        "contracts": {
          "ensRegistry": {
            "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
          },
          "ensUniversalResolver": {
            "address": "0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da",
            "blockCreated": 16773775,
          },
          "multicall3": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 14353601,
          },
        },
        "id": 1,
        "name": "Ethereum",
        "nativeCurrency": {
          "decimals": 18,
          "name": "Ether",
          "symbol": "ETH",
        },
        "network": "homestead",
        "rpcUrls": {
          "alchemy": {
            "http": [
              "https://eth-mainnet.g.alchemy.com/v2",
            ],
            "webSocket": [
              "wss://eth-mainnet.g.alchemy.com/v2",
            ],
          },
          "default": {
            "http": [
              "https://cloudflare-eth.com",
            ],
          },
          "infura": {
            "http": [
              "https://mainnet.infura.io/v3",
            ],
            "webSocket": [
              "wss://mainnet.infura.io/ws/v3",
            ],
          },
          "public": {
            "http": [
              "https://cloudflare-eth.com",
            ],
          },
        },
      }
    `)
  })

  it('default', () => {
    const provider = jsonRpcProvider({
      rpc: (chain) => ({
        http: chain.rpcUrls.default.http[0]!,
        webSocket: `ws://${chain.id}.com`,
      }),
    })(mainnet)
    expect(provider?.rpcUrls).toMatchInlineSnapshot(`
      {
        "http": [
          "https://cloudflare-eth.com",
        ],
        "webSocket": [
          "ws://1.com",
        ],
      }
    `)
  })
})
