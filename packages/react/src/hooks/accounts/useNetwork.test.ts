import {
  actHook,
  getMockConnector,
  getSigners,
  queryClient,
  renderHook,
  setupWagmiClient,
  wrapper,
} from '../../../test'
import { useConnect } from './useConnect'
import { useNetwork } from './useNetwork'

const useNetworkWithConnect = () => {
  const connect = useConnect()
  const network = useNetwork()
  return { connect, network } as const
}

describe('useNetwork', () => {
  describe('on mount', () => {
    it('not connected', async () => {
      const { result } = renderHook(() => useNetwork())
      expect(result.current).toMatchInlineSnapshot(`
        {
          "activeChain": undefined,
          "chains": [],
          "context": undefined,
          "data": undefined,
          "error": null,
          "failureCount": 0,
          "isError": false,
          "isIdle": true,
          "isLoading": false,
          "isPaused": false,
          "isSuccess": false,
          "pendingChainId": undefined,
          "reset": [Function],
          "status": "idle",
          "switchNetwork": undefined,
          "switchNetworkAsync": undefined,
        }
      `)
    })

    it('connected', async () => {
      const { result } = renderHook(() => useNetworkWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      const { chains, ...data } = result.current.network
      expect(chains.length).toEqual(5)
      expect(data).toMatchInlineSnapshot(`
        {
          "activeChain": {
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
            "id": 1,
            "name": "Ethereum",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Ether",
              "symbol": "ETH",
            },
            "rpcUrls": {
              "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
              "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
              "infura": "https://mainnet.infura.io/v3",
            },
            "unsupported": false,
          },
          "context": undefined,
          "data": undefined,
          "error": null,
          "failureCount": 0,
          "isError": false,
          "isIdle": true,
          "isLoading": false,
          "isPaused": false,
          "isSuccess": false,
          "pendingChainId": undefined,
          "reset": [Function],
          "status": "idle",
          "switchNetwork": [Function],
          "switchNetworkAsync": [Function],
        }
      `)
    })

    it('unsupported chain', async () => {
      const { result } = renderHook(() => useNetworkWithConnect(), {
        wrapper,
        initialProps: {
          client: setupWagmiClient({
            connectors: [
              getMockConnector({
                network: 69,
                signer: getSigners()[0],
              }),
            ],
            queryClient,
          }),
        },
      })

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      const { chains, ...data } = result.current.network
      expect(chains.length).toEqual(5)
      expect(data).toMatchInlineSnapshot(`
        {
          "activeChain": {
            "blockExplorers": {
              "default": {
                "name": "Etherscan",
                "url": "https://kovan-optimistic.etherscan.io",
              },
              "etherscan": {
                "name": "Etherscan",
                "url": "https://kovan-optimistic.etherscan.io",
              },
            },
            "id": 69,
            "name": "Optimism Kovan",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Kovan Ether",
              "symbol": "KOR",
            },
            "rpcUrls": {
              "alchemy": "https://opt-kovan.g.alchemy.com/v2",
              "default": [
                "https://kovan.optimism.io",
              ],
              "infura": "https://optimism-kovan.infura.io/v3",
            },
            "testnet": true,
            "unsupported": true,
          },
          "context": undefined,
          "data": undefined,
          "error": null,
          "failureCount": 0,
          "isError": false,
          "isIdle": true,
          "isLoading": false,
          "isPaused": false,
          "isSuccess": false,
          "pendingChainId": undefined,
          "reset": [Function],
          "status": "idle",
          "switchNetwork": undefined,
          "switchNetworkAsync": undefined,
        }
      `)
    })
  })

  it('switchChain', async () => {
    const { result, waitFor } = renderHook(() => useNetworkWithConnect())

    await actHook(async () => {
      const mockConnector = result.current.connect.connectors[0]
      result.current.connect.connect(mockConnector)
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { chains: _, ...data } = result.current.network
    expect(data).toMatchInlineSnapshot(`
      {
        "activeChain": {
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
          "id": 1,
          "name": "Ethereum",
          "nativeCurrency": {
            "decimals": 18,
            "name": "Ether",
            "symbol": "ETH",
          },
          "rpcUrls": {
            "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
            "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
            "infura": "https://mainnet.infura.io/v3",
          },
          "unsupported": false,
        },
        "context": undefined,
        "data": undefined,
        "error": null,
        "failureCount": 0,
        "isError": false,
        "isIdle": true,
        "isLoading": false,
        "isPaused": false,
        "isSuccess": false,
        "pendingChainId": undefined,
        "reset": [Function],
        "status": "idle",
        "switchNetwork": [Function],
        "switchNetworkAsync": [Function],
      }
    `)

    await actHook(async () => {
      result.current.network.switchNetwork?.(4)
    })

    await waitFor(() => result.current.network.isSuccess)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { chains: __, ...data2 } = result.current.network
    expect(data2).toMatchInlineSnapshot(`
      {
        "activeChain": {
          "blockExplorers": {
            "default": {
              "name": "Etherscan",
              "url": "https://rinkeby.etherscan.io",
            },
            "etherscan": {
              "name": "Etherscan",
              "url": "https://rinkeby.etherscan.io",
            },
          },
          "id": 4,
          "name": "Rinkeby",
          "nativeCurrency": {
            "decimals": 18,
            "name": "Rinkeby Ether",
            "symbol": "rETH",
          },
          "rpcUrls": {
            "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
            "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
            "infura": "https://rinkeby.infura.io/v3",
          },
          "testnet": true,
          "unsupported": false,
        },
        "context": undefined,
        "data": {
          "blockExplorers": {
            "default": {
              "name": "Etherscan",
              "url": "https://rinkeby.etherscan.io",
            },
            "etherscan": {
              "name": "Etherscan",
              "url": "https://rinkeby.etherscan.io",
            },
          },
          "id": 4,
          "name": "Rinkeby",
          "nativeCurrency": {
            "decimals": 18,
            "name": "Rinkeby Ether",
            "symbol": "rETH",
          },
          "rpcUrls": {
            "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
            "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
            "infura": "https://rinkeby.infura.io/v3",
          },
          "testnet": true,
        },
        "error": null,
        "failureCount": 0,
        "isError": false,
        "isIdle": false,
        "isLoading": false,
        "isPaused": false,
        "isSuccess": true,
        "pendingChainId": 4,
        "reset": [Function],
        "status": "success",
        "switchNetwork": [Function],
        "switchNetworkAsync": [Function],
      }
    `)
  })
})
