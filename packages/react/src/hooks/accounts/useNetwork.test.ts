import { actHook, renderHook, wrapper } from '../../../test'
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
      expect(result.current[0]).toMatchInlineSnapshot(`
        {
          "data": {
            "chain": undefined,
            "chains": [],
          },
          "error": undefined,
          "loading": false,
        }
      `)
    })

    it('connected', async () => {
      const { result } = renderHook(() => useNetworkWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)
      })

      const { data: { chains, ...restData } = {}, ...rest } =
        result.current.network[0]
      expect({ data: restData, ...rest }).toMatchInlineSnapshot(`
        {
          "data": {
            "chain": {
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
          },
          "error": undefined,
          "loading": false,
        }
      `)
      expect(chains).toHaveLength(5)
    })

    it('unsupported chain', async () => {
      const { result } = renderHook(() => useNetworkWithConnect(), {
        wrapper,
        initialProps: { chainId: 69 },
      })

      await actHook(async () => {
        const mockConnector = result.current.connect[0].data.connectors[0]
        await result.current.connect[1](mockConnector)
      })

      const { data: { chains, ...restData } = {}, ...rest } =
        result.current.network[0]
      expect({ data: restData, ...rest }).toMatchInlineSnapshot(`
        {
          "data": {
            "chain": {
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
          },
          "error": undefined,
          "loading": false,
        }
      `)
      expect(chains).toHaveLength(5)
    })
  })

  it('switchChain', async () => {
    const { result } = renderHook(() => useNetworkWithConnect())

    await actHook(async () => {
      const mockConnector = result.current.connect[0].data.connectors[0]
      await result.current.connect[1](mockConnector)
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: { chains, ...restData } = {}, ...rest } =
      result.current.network[0]
    expect({ data: restData, ...rest }).toMatchInlineSnapshot(`
      {
        "data": {
          "chain": {
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
        },
        "error": undefined,
        "loading": false,
      }
    `)

    await actHook(async () => {
      const res = await result.current.network[1]?.(4)
      expect(res).toMatchInlineSnapshot(`
        {
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
          "error": undefined,
        }
      `)
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: { chains: chains2, ...restData2 } = {}, ...rest2 } =
      result.current.network[0]
    expect({ data: restData2, ...rest2 }).toMatchInlineSnapshot(`
      {
        "data": {
          "chain": {
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
        },
        "error": undefined,
        "loading": false,
      }
    `)
  })
})
