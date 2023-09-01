import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getWalletClients } from '../../test'
import { WalletClient } from '../types'
import { MockConnector } from './connector'

describe('MockConnector', () => {
  let connector: MockConnector
  let walletClient: WalletClient
  beforeEach(() => {
    const walletClients = getWalletClients()
    walletClient = walletClients[0]!
    connector = new MockConnector({
      options: { walletClient },
    })
  })

  it('constructor', () => {
    expect(connector.name).toEqual('Mock')
    expect(connector.ready).toEqual(true)
  })

  describe('connect', () => {
    it('succeeds', async () => {
      const onChange = vi.fn()
      connector.on('change', onChange)

      expect(await connector.connect()).toMatchInlineSnapshot(`
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chain": {
            "id": 1,
            "unsupported": false,
          },
          "provider": "<MockProvider>",
        }
      `)
      expect(onChange).toBeCalledTimes(1)
      expect(await connector.isAuthorized()).toEqual(true)
    })

    it('fails', async () => {
      const connector = new MockConnector({
        options: {
          flags: { failConnect: true },
          walletClient,
        },
      })
      await expect(
        connector.connect(),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "User rejected the request.

        Details: Failed to connect.
        Version: viem@1.0.0"
      `)
    })
  })

  it('disconnect', async () => {
    const onDisconnect = vi.fn()
    connector.on('disconnect', onDisconnect)

    await connector.connect()
    await connector.disconnect()
    expect(onDisconnect).toBeCalledTimes(1)
  })

  describe('getAccount', () => {
    it('succeeds', async () => {
      await connector.connect()
      expect(await connector.getAccount()).toMatchInlineSnapshot(
        `"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"`,
      )
    })

    it('fails', async () => {
      await expect(
        connector.getAccount(),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Failed to get account"`)
    })
  })

  it('getChainId', async () => {
    expect(await connector.getChainId()).toEqual(1)
  })

  it('getProvider', async () => {
    expect(await connector.getProvider()).toMatchInlineSnapshot(
      `"<MockProvider>"`,
    )
  })

  it('getWalletClient', async () => {
    await connector.connect()
    const { uid: _, ...walletClient } = await connector.getWalletClient()
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
              "address": "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62",
              "blockCreated": 16966585,
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

  describe('isAuthorized', () => {
    it('true', async () => {
      await connector.connect()
      expect(await connector.isAuthorized()).toMatchInlineSnapshot('true')
    })

    it('false', async () => {
      expect(await connector.isAuthorized()).toMatchInlineSnapshot('true')
    })
  })

  describe('switchChain', () => {
    it('succeeds', async () => {
      const onChange = vi.fn()
      connector.on('change', onChange)

      expect(await connector.getChainId()).toEqual(1)
      await connector.connect()
      await connector.switchChain?.(4)
      expect(onChange).toBeCalledTimes(2)
      expect(await connector.getChainId()).toEqual(4)
    })

    it('fails', async () => {
      const connector = new MockConnector({
        options: {
          flags: { failSwitchChain: true },
          walletClient,
        },
      })
      await connector.connect()
      await expect(
        connector.switchChain?.(4),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "User rejected the request.

        Details: Failed to switch chain.
        Version: viem@1.0.0"
      `)
    })
  })

  it('watchAsset', async () => {
    await connector.connect()
    expect(
      await connector.watchAsset({
        address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        decimals: 18,
        symbol: 'UNI',
      }),
    ).toEqual(true)
  })
})
