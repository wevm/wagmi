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
            "blockExplorers": [
              {
                "name": "Etherscan",
                "url": "https://etherscan.io",
              },
            ],
            "id": 1,
            "name": "Mainnet",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Ether",
              "symbol": "ETH",
            },
            "rpcUrls": [
              "https://mainnet.infura.io/v3",
            ],
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
            "blockExplorers": [
              {
                "name": "Etherscan",
                "url": "https://kovan-optimistic.etherscan.io",
              },
            ],
            "id": 69,
            "name": "Optimism Kovan",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Kovan Ether",
              "symbol": "KOR",
            },
            "rpcUrls": [
              "https://kovan.optimism.io",
            ],
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
    const { result } = renderHook(() => useNetworkWithConnect())

    await actHook(async () => {
      const mockConnector = result.current.connect.connectors[0]
      result.current.connect.connect(mockConnector)
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { chains: _, ...data } = result.current.network
    expect(data).toMatchInlineSnapshot(`
      {
        "activeChain": {
          "blockExplorers": [
            {
              "name": "Etherscan",
              "url": "https://etherscan.io",
            },
          ],
          "id": 1,
          "name": "Mainnet",
          "nativeCurrency": {
            "decimals": 18,
            "name": "Ether",
            "symbol": "ETH",
          },
          "rpcUrls": [
            "https://mainnet.infura.io/v3",
          ],
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { chains: __, ...data2 } = result.current.network
    expect(data2).toMatchInlineSnapshot(`
      {
        "activeChain": {
          "blockExplorers": [
            {
              "name": "Etherscan",
              "url": "https://rinkeby.etherscan.io",
            },
          ],
          "id": 4,
          "name": "Rinkeby",
          "nativeCurrency": {
            "decimals": 18,
            "name": "Rinkeby Ether",
            "symbol": "rETH",
          },
          "rpcUrls": [
            "https://rinkeby.infura.io/v3",
          ],
          "testnet": true,
          "unsupported": false,
        },
        "context": undefined,
        "data": {
          "blockExplorers": [
            {
              "name": "Etherscan",
              "url": "https://rinkeby.etherscan.io",
            },
          ],
          "id": 4,
          "name": "Rinkeby",
          "nativeCurrency": {
            "decimals": 18,
            "name": "Rinkeby Ether",
            "symbol": "rETH",
          },
          "rpcUrls": [
            "https://rinkeby.infura.io/v3",
          ],
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
