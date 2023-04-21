import { beforeEach, describe, expect, it } from 'vitest'

import { getWalletClients, setupClient } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from '../accounts/connect'
import { getWalletClient } from './getWalletClient'

const connector = new MockConnector({
  options: { walletClient: getWalletClients()[0]! },
})

describe('getWalletClient', () => {
  beforeEach(() => {
    setupClient()
  })

  describe('behavior', () => {
    it('not connected', async () => {
      expect(await getWalletClient()).toMatchInlineSnapshot(`null`)
    })

    it('connected', async () => {
      await connect({ connector })
      const { uid: _uid, ...walletClient } = (await getWalletClient()) || {}
      expect(walletClient).toMatchInlineSnapshot(`
        {
          "account": {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "type": "json-rpc",
          },
          "addChain": [Function],
          "chain": {
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
              "default": {
                "http": [
                  "http://127.0.0.1:8545",
                ],
                "webSocket": [
                  "ws://127.0.0.1:8545",
                ],
              },
              "public": {
                "http": [
                  "http://127.0.0.1:8545",
                ],
                "webSocket": [
                  "ws://127.0.0.1:8545",
                ],
              },
            },
          },
          "deployContract": [Function],
          "getAddresses": [Function],
          "getChainId": [Function],
          "getPermissions": [Function],
          "key": "wallet",
          "name": "Wallet Client",
          "pollingInterval": 4000,
          "request": [Function],
          "requestAddresses": [Function],
          "requestPermissions": [Function],
          "sendTransaction": [Function],
          "signMessage": [Function],
          "signTypedData": [Function],
          "switchChain": [Function],
          "transport": {
            "key": "custom",
            "name": "Custom Provider",
            "request": [Function],
            "retryCount": 0,
            "retryDelay": 150,
            "timeout": undefined,
            "type": "custom",
          },
          "type": "walletClient",
          "watchAsset": [Function],
          "writeContract": [Function],
        }
      `)
    })
  })
})
