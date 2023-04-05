import { connect } from '@wagmi/core'
import { describe, expect, it } from 'vitest'

import {
  actConnect,
  actDisconnect,
  actSwitchNetwork,
  getSigners,
  renderHook,
  setupClient,
} from '../../../test'
import { useAccount } from './useAccount'
import { useConnect } from './useConnect'
import { useDisconnect } from './useDisconnect'
import { useSigner } from './useSigner'
import { useSwitchNetwork } from './useSwitchNetwork'

function useSignerWithAccount() {
  return {
    account: useAccount(),
    connect: useConnect(),
    disconnect: useDisconnect(),
    switchNetwork: useSwitchNetwork(),
    signer: useSigner(),
  }
}

describe('useSigner', () => {
  describe('mounts', () => {
    it('is connected', async () => {
      const client = setupClient()
      await connect({ connector: client.connectors[0]! })

      const { result, waitFor } = renderHook(() => useSigner(), {
        initialProps: { client },
      })

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, data, ...res } = result.current
      const { uid, ...signer } = data || {}
      expect(uid).toBeDefined()
      expect(res).toMatchInlineSnapshot(`
        {
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
          "isFetching": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
      expect(signer).toMatchInlineSnapshot(`
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
              },
              "public": {
                "http": [
                  "http://127.0.0.1:8545",
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

    it('is not connected', async () => {
      const { result, waitFor } = renderHook(() => useSigner())

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": false,
          "isFetchedAfterMount": false,
          "isFetching": false,
          "isIdle": true,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "idle",
        }
      `)
    })
  })

  describe('behavior', () => {
    it('updates on connect and disconnect', async () => {
      const utils = renderHook(() => useSignerWithAccount())
      const { result, waitFor } = utils

      await actConnect({ utils })

      await waitFor(() => expect(result.current.signer.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, data, ...res } = result.current.signer
      const { uid, ...rest } = data || {}
      expect(res).toMatchInlineSnapshot(`
        {
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
          "isFetching": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
      expect(rest).toMatchInlineSnapshot(`
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
              },
              "public": {
                "http": [
                  "http://127.0.0.1:8545",
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

      await actDisconnect({ utils })

      await waitFor(() => expect(result.current.signer.isIdle).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal: _, ...res2 } = result.current.signer
      expect(res2).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": false,
          "isFetchedAfterMount": false,
          "isFetching": false,
          "isIdle": true,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "idle",
        }
      `)
    })

    it('updates on account change', async () => {
      const utils = renderHook(() => useSignerWithAccount())
      const { result, waitFor } = utils

      await actConnect({ utils })

      await waitFor(() => expect(result.current.signer.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, data, ...res } = result.current.signer
      const { uid, ...rest } = data || {}
      expect(res).toMatchInlineSnapshot(`
        {
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
          "isFetching": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
      expect(rest).toMatchInlineSnapshot(`
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
              },
              "public": {
                "http": [
                  "http://127.0.0.1:8545",
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

      const nextSigner = getSigners()[1]!
      const provider = await result.current.account.connector?.getProvider()
      await provider.switchSigner(nextSigner)

      await waitFor(() =>
        expect(
          (result.current.signer.data as any).account.address ===
            nextSigner.account.address,
        ).toBeTruthy(),
      )

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal: _, data: data2, ...res2 } = result.current.signer
      const { uid: uid2, ...rest2 } = data2 || {}
      expect(res2).toMatchInlineSnapshot(`
        {
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
          "isFetching": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
      expect(rest2).toMatchInlineSnapshot(`
        {
          "account": {
            "address": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
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
              },
              "public": {
                "http": [
                  "http://127.0.0.1:8545",
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

    it('updates on network', async () => {
      const utils = renderHook(() => useSignerWithAccount())
      const { result, waitFor } = utils

      await actConnect({ utils })

      await waitFor(() => expect(result.current.signer.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, data, ...res } = result.current.signer
      const { uid, ...rest } = data || {}
      expect(res).toMatchInlineSnapshot(`
        {
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
          "isFetching": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
      expect(rest).toMatchInlineSnapshot(`
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
              },
              "public": {
                "http": [
                  "http://127.0.0.1:8545",
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

      await actSwitchNetwork({ utils, chainId: 1 })

      await waitFor(() => expect(result.current.signer.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal: _, data: data2, ...res2 } = result.current.signer
      const { uid: uid2, ...rest2 } = data2 || {}
      expect(res2).toMatchInlineSnapshot(`
        {
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
          "isFetching": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
      expect(rest2).toMatchInlineSnapshot(`
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
              },
              "public": {
                "http": [
                  "http://127.0.0.1:8545",
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
