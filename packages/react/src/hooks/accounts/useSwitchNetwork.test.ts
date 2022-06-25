import { connect } from '@wagmi/core'
import { MockConnector } from '@wagmi/core/connectors/mock'

import {
  act,
  actConnect,
  getSigners,
  renderHook,
  setupClient,
} from '../../../test'
import { UseConnectArgs, UseConnectConfig, useConnect } from './useConnect'
import {
  UseSwitchNetworkArgs,
  UseSwitchNetworkConfig,
  useSwitchNetwork,
} from './useSwitchNetwork'

function useSwitchNetworkWithConnect(
  config: {
    connect?: UseConnectArgs & UseConnectConfig
    network?: UseSwitchNetworkArgs & UseSwitchNetworkConfig
  } = {},
) {
  return {
    connect: useConnect(config.connect),
    network: useSwitchNetwork(config.network),
  }
}

describe('useSwitchNetwork', () => {
  describe('mounts', () => {
    it('is connected', async () => {
      const client = setupClient()
      await connect({ connector: client.connectors[0]! })

      const { result, waitFor } = renderHook(() => useSwitchNetwork(), {
        initialProps: { client },
      })

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      expect(result.current).toMatchInlineSnapshot(`
        {
          "chains": [
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
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 1,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 14353601,
              },
              "name": "Ethereum",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Ether",
                "symbol": "ETH",
              },
              "network": "homestead",
              "rpcUrls": {
                "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
                "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://mainnet.infura.io/v3",
              },
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://ropsten.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://ropsten.etherscan.io",
                },
              },
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 3,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 12063863,
              },
              "name": "Ropsten",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Ropsten Ether",
                "symbol": "ROP",
              },
              "network": "ropsten",
              "rpcUrls": {
                "alchemy": "https://eth-ropsten.alchemyapi.io/v2",
                "default": "https://eth-ropsten.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://ropsten.infura.io/v3",
              },
              "testnet": true,
            },
            {
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
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 4,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 10299530,
              },
              "name": "Rinkeby",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Rinkeby Ether",
                "symbol": "RIN",
              },
              "network": "rinkeby",
              "rpcUrls": {
                "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
                "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://rinkeby.infura.io/v3",
              },
              "testnet": true,
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://goerli.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://goerli.etherscan.io",
                },
              },
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 5,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 6507670,
              },
              "name": "Goerli",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Goerli Ether",
                "symbol": "GOR",
              },
              "network": "goerli",
              "rpcUrls": {
                "alchemy": "https://eth-goerli.alchemyapi.io/v2",
                "default": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://goerli.infura.io/v3",
              },
              "testnet": true,
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://kovan.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://kovan.etherscan.io",
                },
              },
              "id": 42,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 30285908,
              },
              "name": "Kovan",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Kovan Ether",
                "symbol": "KOV",
              },
              "network": "kovan",
              "rpcUrls": {
                "alchemy": "https://eth-kovan.alchemyapi.io/v2",
                "default": "https://eth-kovan.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://kovan.infura.io/v3",
              },
              "testnet": true,
            },
          ],
          "data": undefined,
          "error": null,
          "isError": false,
          "isIdle": true,
          "isLoading": false,
          "isSuccess": false,
          "pendingChainId": undefined,
          "reset": [Function],
          "status": "idle",
          "switchNetwork": [Function],
          "switchNetworkAsync": [Function],
          "variables": undefined,
        }
      `)
    })

    it('is not connected', async () => {
      const { result, waitFor } = renderHook(() => useSwitchNetwork())

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      expect(result.current).toMatchInlineSnapshot(`
        {
          "chains": [
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
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 1,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 14353601,
              },
              "name": "Ethereum",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Ether",
                "symbol": "ETH",
              },
              "network": "homestead",
              "rpcUrls": {
                "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
                "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://mainnet.infura.io/v3",
              },
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://ropsten.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://ropsten.etherscan.io",
                },
              },
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 3,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 12063863,
              },
              "name": "Ropsten",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Ropsten Ether",
                "symbol": "ROP",
              },
              "network": "ropsten",
              "rpcUrls": {
                "alchemy": "https://eth-ropsten.alchemyapi.io/v2",
                "default": "https://eth-ropsten.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://ropsten.infura.io/v3",
              },
              "testnet": true,
            },
            {
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
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 4,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 10299530,
              },
              "name": "Rinkeby",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Rinkeby Ether",
                "symbol": "RIN",
              },
              "network": "rinkeby",
              "rpcUrls": {
                "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
                "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://rinkeby.infura.io/v3",
              },
              "testnet": true,
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://goerli.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://goerli.etherscan.io",
                },
              },
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 5,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 6507670,
              },
              "name": "Goerli",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Goerli Ether",
                "symbol": "GOR",
              },
              "network": "goerli",
              "rpcUrls": {
                "alchemy": "https://eth-goerli.alchemyapi.io/v2",
                "default": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://goerli.infura.io/v3",
              },
              "testnet": true,
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://kovan.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://kovan.etherscan.io",
                },
              },
              "id": 42,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 30285908,
              },
              "name": "Kovan",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Kovan Ether",
                "symbol": "KOV",
              },
              "network": "kovan",
              "rpcUrls": {
                "alchemy": "https://eth-kovan.alchemyapi.io/v2",
                "default": "https://eth-kovan.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://kovan.infura.io/v3",
              },
              "testnet": true,
            },
          ],
          "data": undefined,
          "error": null,
          "isError": false,
          "isIdle": true,
          "isLoading": false,
          "isSuccess": false,
          "pendingChainId": undefined,
          "reset": [Function],
          "status": "idle",
          "switchNetwork": undefined,
          "switchNetworkAsync": undefined,
          "variables": undefined,
        }
      `)
    })
  })

  describe('configuration', () => {
    it('chainId', async () => {
      const { result, waitFor } = renderHook(() =>
        useSwitchNetwork({ chainId: 1 }),
      )

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      expect(result.current).toMatchInlineSnapshot(`
        {
          "chains": [
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
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 1,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 14353601,
              },
              "name": "Ethereum",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Ether",
                "symbol": "ETH",
              },
              "network": "homestead",
              "rpcUrls": {
                "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
                "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://mainnet.infura.io/v3",
              },
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://ropsten.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://ropsten.etherscan.io",
                },
              },
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 3,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 12063863,
              },
              "name": "Ropsten",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Ropsten Ether",
                "symbol": "ROP",
              },
              "network": "ropsten",
              "rpcUrls": {
                "alchemy": "https://eth-ropsten.alchemyapi.io/v2",
                "default": "https://eth-ropsten.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://ropsten.infura.io/v3",
              },
              "testnet": true,
            },
            {
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
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 4,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 10299530,
              },
              "name": "Rinkeby",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Rinkeby Ether",
                "symbol": "RIN",
              },
              "network": "rinkeby",
              "rpcUrls": {
                "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
                "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://rinkeby.infura.io/v3",
              },
              "testnet": true,
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://goerli.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://goerli.etherscan.io",
                },
              },
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 5,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 6507670,
              },
              "name": "Goerli",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Goerli Ether",
                "symbol": "GOR",
              },
              "network": "goerli",
              "rpcUrls": {
                "alchemy": "https://eth-goerli.alchemyapi.io/v2",
                "default": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://goerli.infura.io/v3",
              },
              "testnet": true,
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://kovan.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://kovan.etherscan.io",
                },
              },
              "id": 42,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 30285908,
              },
              "name": "Kovan",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Kovan Ether",
                "symbol": "KOV",
              },
              "network": "kovan",
              "rpcUrls": {
                "alchemy": "https://eth-kovan.alchemyapi.io/v2",
                "default": "https://eth-kovan.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://kovan.infura.io/v3",
              },
              "testnet": true,
            },
          ],
          "data": undefined,
          "error": null,
          "isError": false,
          "isIdle": true,
          "isLoading": false,
          "isSuccess": false,
          "pendingChainId": undefined,
          "reset": [Function],
          "status": "idle",
          "switchNetwork": undefined,
          "switchNetworkAsync": undefined,
          "variables": undefined,
        }
      `)
    })
  })

  describe('return value', () => {
    describe('switchNetwork', () => {
      it('uses configuration', async () => {
        const utils = renderHook(() =>
          useSwitchNetworkWithConnect({
            network: {
              chainId: 4,
            },
          }),
        )
        const { result, waitFor } = utils

        await actConnect({ utils })

        await act(async () => result.current.network.switchNetwork?.())
        await waitFor(() =>
          expect(result.current.network.isSuccess).toBeTruthy(),
        )

        const { data, ...res } = result.current.network
        expect(data?.id).toMatchInlineSnapshot(`4`)
        expect(res).toMatchInlineSnapshot(`
          {
            "chains": [
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
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 1,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 14353601,
                },
                "name": "Ethereum",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Ether",
                  "symbol": "ETH",
                },
                "network": "homestead",
                "rpcUrls": {
                  "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
                  "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://mainnet.infura.io/v3",
                },
              },
              {
                "blockExplorers": {
                  "default": {
                    "name": "Etherscan",
                    "url": "https://ropsten.etherscan.io",
                  },
                  "etherscan": {
                    "name": "Etherscan",
                    "url": "https://ropsten.etherscan.io",
                  },
                },
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 3,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 12063863,
                },
                "name": "Ropsten",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Ropsten Ether",
                  "symbol": "ROP",
                },
                "network": "ropsten",
                "rpcUrls": {
                  "alchemy": "https://eth-ropsten.alchemyapi.io/v2",
                  "default": "https://eth-ropsten.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://ropsten.infura.io/v3",
                },
                "testnet": true,
              },
              {
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
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 4,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 10299530,
                },
                "name": "Rinkeby",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Rinkeby Ether",
                  "symbol": "RIN",
                },
                "network": "rinkeby",
                "rpcUrls": {
                  "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
                  "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://rinkeby.infura.io/v3",
                },
                "testnet": true,
              },
              {
                "blockExplorers": {
                  "default": {
                    "name": "Etherscan",
                    "url": "https://goerli.etherscan.io",
                  },
                  "etherscan": {
                    "name": "Etherscan",
                    "url": "https://goerli.etherscan.io",
                  },
                },
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 5,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 6507670,
                },
                "name": "Goerli",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Goerli Ether",
                  "symbol": "GOR",
                },
                "network": "goerli",
                "rpcUrls": {
                  "alchemy": "https://eth-goerli.alchemyapi.io/v2",
                  "default": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://goerli.infura.io/v3",
                },
                "testnet": true,
              },
              {
                "blockExplorers": {
                  "default": {
                    "name": "Etherscan",
                    "url": "https://kovan.etherscan.io",
                  },
                  "etherscan": {
                    "name": "Etherscan",
                    "url": "https://kovan.etherscan.io",
                  },
                },
                "id": 42,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 30285908,
                },
                "name": "Kovan",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Kovan Ether",
                  "symbol": "KOV",
                },
                "network": "kovan",
                "rpcUrls": {
                  "alchemy": "https://eth-kovan.alchemyapi.io/v2",
                  "default": "https://eth-kovan.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://kovan.infura.io/v3",
                },
                "testnet": true,
              },
            ],
            "error": null,
            "isError": false,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": true,
            "pendingChainId": 4,
            "reset": [Function],
            "status": "success",
            "switchNetwork": [Function],
            "switchNetworkAsync": [Function],
            "variables": {
              "chainId": 4,
            },
          }
        `)
      })

      it('uses deferred args', async () => {
        const utils = renderHook(() => useSwitchNetworkWithConnect())
        const { result, waitFor } = utils

        await actConnect({ utils })

        await act(async () => result.current.network.switchNetwork?.(4))

        await waitFor(() =>
          expect(result.current.network.isSuccess).toBeTruthy(),
        )

        const { data, ...res } = result.current.network
        expect(data?.id).toMatchInlineSnapshot(`4`)
        expect(res).toMatchInlineSnapshot(`
          {
            "chains": [
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
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 1,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 14353601,
                },
                "name": "Ethereum",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Ether",
                  "symbol": "ETH",
                },
                "network": "homestead",
                "rpcUrls": {
                  "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
                  "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://mainnet.infura.io/v3",
                },
              },
              {
                "blockExplorers": {
                  "default": {
                    "name": "Etherscan",
                    "url": "https://ropsten.etherscan.io",
                  },
                  "etherscan": {
                    "name": "Etherscan",
                    "url": "https://ropsten.etherscan.io",
                  },
                },
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 3,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 12063863,
                },
                "name": "Ropsten",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Ropsten Ether",
                  "symbol": "ROP",
                },
                "network": "ropsten",
                "rpcUrls": {
                  "alchemy": "https://eth-ropsten.alchemyapi.io/v2",
                  "default": "https://eth-ropsten.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://ropsten.infura.io/v3",
                },
                "testnet": true,
              },
              {
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
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 4,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 10299530,
                },
                "name": "Rinkeby",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Rinkeby Ether",
                  "symbol": "RIN",
                },
                "network": "rinkeby",
                "rpcUrls": {
                  "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
                  "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://rinkeby.infura.io/v3",
                },
                "testnet": true,
              },
              {
                "blockExplorers": {
                  "default": {
                    "name": "Etherscan",
                    "url": "https://goerli.etherscan.io",
                  },
                  "etherscan": {
                    "name": "Etherscan",
                    "url": "https://goerli.etherscan.io",
                  },
                },
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 5,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 6507670,
                },
                "name": "Goerli",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Goerli Ether",
                  "symbol": "GOR",
                },
                "network": "goerli",
                "rpcUrls": {
                  "alchemy": "https://eth-goerli.alchemyapi.io/v2",
                  "default": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://goerli.infura.io/v3",
                },
                "testnet": true,
              },
              {
                "blockExplorers": {
                  "default": {
                    "name": "Etherscan",
                    "url": "https://kovan.etherscan.io",
                  },
                  "etherscan": {
                    "name": "Etherscan",
                    "url": "https://kovan.etherscan.io",
                  },
                },
                "id": 42,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 30285908,
                },
                "name": "Kovan",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Kovan Ether",
                  "symbol": "KOV",
                },
                "network": "kovan",
                "rpcUrls": {
                  "alchemy": "https://eth-kovan.alchemyapi.io/v2",
                  "default": "https://eth-kovan.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://kovan.infura.io/v3",
                },
                "testnet": true,
              },
            ],
            "error": null,
            "isError": false,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": true,
            "pendingChainId": 4,
            "reset": [Function],
            "status": "success",
            "switchNetwork": [Function],
            "switchNetworkAsync": [Function],
            "variables": {
              "chainId": 4,
            },
          }
        `)
      })

      it('fails', async () => {
        const connector = new MockConnector({
          options: {
            flags: { failSwitchChain: true },
            signer: getSigners()[0]!,
          },
        })
        const utils = renderHook(() =>
          useSwitchNetworkWithConnect({
            connect: { connector },
          }),
        )
        const { result, waitFor } = utils

        await actConnect({ utils, connector })
        await act(async () => result.current.network.switchNetwork?.(4))
        await waitFor(() => expect(result.current.network.isError).toBeTruthy())

        expect(result.current.network).toMatchInlineSnapshot(`
          {
            "chains": [
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
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 1,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 14353601,
                },
                "name": "Ethereum",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Ether",
                  "symbol": "ETH",
                },
                "network": "homestead",
                "rpcUrls": {
                  "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
                  "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://mainnet.infura.io/v3",
                },
              },
              {
                "blockExplorers": {
                  "default": {
                    "name": "Etherscan",
                    "url": "https://ropsten.etherscan.io",
                  },
                  "etherscan": {
                    "name": "Etherscan",
                    "url": "https://ropsten.etherscan.io",
                  },
                },
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 3,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 12063863,
                },
                "name": "Ropsten",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Ropsten Ether",
                  "symbol": "ROP",
                },
                "network": "ropsten",
                "rpcUrls": {
                  "alchemy": "https://eth-ropsten.alchemyapi.io/v2",
                  "default": "https://eth-ropsten.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://ropsten.infura.io/v3",
                },
                "testnet": true,
              },
              {
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
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 4,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 10299530,
                },
                "name": "Rinkeby",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Rinkeby Ether",
                  "symbol": "RIN",
                },
                "network": "rinkeby",
                "rpcUrls": {
                  "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
                  "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://rinkeby.infura.io/v3",
                },
                "testnet": true,
              },
              {
                "blockExplorers": {
                  "default": {
                    "name": "Etherscan",
                    "url": "https://goerli.etherscan.io",
                  },
                  "etherscan": {
                    "name": "Etherscan",
                    "url": "https://goerli.etherscan.io",
                  },
                },
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 5,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 6507670,
                },
                "name": "Goerli",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Goerli Ether",
                  "symbol": "GOR",
                },
                "network": "goerli",
                "rpcUrls": {
                  "alchemy": "https://eth-goerli.alchemyapi.io/v2",
                  "default": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://goerli.infura.io/v3",
                },
                "testnet": true,
              },
              {
                "blockExplorers": {
                  "default": {
                    "name": "Etherscan",
                    "url": "https://kovan.etherscan.io",
                  },
                  "etherscan": {
                    "name": "Etherscan",
                    "url": "https://kovan.etherscan.io",
                  },
                },
                "id": 42,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 30285908,
                },
                "name": "Kovan",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Kovan Ether",
                  "symbol": "KOV",
                },
                "network": "kovan",
                "rpcUrls": {
                  "alchemy": "https://eth-kovan.alchemyapi.io/v2",
                  "default": "https://eth-kovan.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://kovan.infura.io/v3",
                },
                "testnet": true,
              },
            ],
            "data": undefined,
            "error": [UserRejectedRequestError: User rejected request],
            "isError": true,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": false,
            "pendingChainId": 4,
            "reset": [Function],
            "status": "error",
            "switchNetwork": [Function],
            "switchNetworkAsync": [Function],
            "variables": {
              "chainId": 4,
            },
          }
        `)
      })

      it('unsupported chain', async () => {
        const utils = renderHook(() =>
          useSwitchNetworkWithConnect({
            network: { chainId: 69 },
          }),
        )
        const { result, waitFor } = utils

        await actConnect({ utils })

        await act(async () => result.current.network.switchNetwork?.())

        await waitFor(() =>
          expect(result.current.network.isSuccess).toBeTruthy(),
        )

        const { data, ...res } = result.current.network
        expect(data?.id).toMatchInlineSnapshot(`69`)
        expect(res).toMatchInlineSnapshot(`
          {
            "chains": [
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
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 1,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 14353601,
                },
                "name": "Ethereum",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Ether",
                  "symbol": "ETH",
                },
                "network": "homestead",
                "rpcUrls": {
                  "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
                  "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://mainnet.infura.io/v3",
                },
              },
              {
                "blockExplorers": {
                  "default": {
                    "name": "Etherscan",
                    "url": "https://ropsten.etherscan.io",
                  },
                  "etherscan": {
                    "name": "Etherscan",
                    "url": "https://ropsten.etherscan.io",
                  },
                },
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 3,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 12063863,
                },
                "name": "Ropsten",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Ropsten Ether",
                  "symbol": "ROP",
                },
                "network": "ropsten",
                "rpcUrls": {
                  "alchemy": "https://eth-ropsten.alchemyapi.io/v2",
                  "default": "https://eth-ropsten.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://ropsten.infura.io/v3",
                },
                "testnet": true,
              },
              {
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
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 4,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 10299530,
                },
                "name": "Rinkeby",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Rinkeby Ether",
                  "symbol": "RIN",
                },
                "network": "rinkeby",
                "rpcUrls": {
                  "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
                  "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://rinkeby.infura.io/v3",
                },
                "testnet": true,
              },
              {
                "blockExplorers": {
                  "default": {
                    "name": "Etherscan",
                    "url": "https://goerli.etherscan.io",
                  },
                  "etherscan": {
                    "name": "Etherscan",
                    "url": "https://goerli.etherscan.io",
                  },
                },
                "ens": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "id": 5,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 6507670,
                },
                "name": "Goerli",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Goerli Ether",
                  "symbol": "GOR",
                },
                "network": "goerli",
                "rpcUrls": {
                  "alchemy": "https://eth-goerli.alchemyapi.io/v2",
                  "default": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://goerli.infura.io/v3",
                },
                "testnet": true,
              },
              {
                "blockExplorers": {
                  "default": {
                    "name": "Etherscan",
                    "url": "https://kovan.etherscan.io",
                  },
                  "etherscan": {
                    "name": "Etherscan",
                    "url": "https://kovan.etherscan.io",
                  },
                },
                "id": 42,
                "multicall": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 30285908,
                },
                "name": "Kovan",
                "nativeCurrency": {
                  "decimals": 18,
                  "name": "Kovan Ether",
                  "symbol": "KOV",
                },
                "network": "kovan",
                "rpcUrls": {
                  "alchemy": "https://eth-kovan.alchemyapi.io/v2",
                  "default": "https://eth-kovan.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                  "infura": "https://kovan.infura.io/v3",
                },
                "testnet": true,
              },
            ],
            "error": null,
            "isError": false,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": true,
            "pendingChainId": 69,
            "reset": [Function],
            "status": "success",
            "switchNetwork": [Function],
            "switchNetworkAsync": [Function],
            "variables": {
              "chainId": 69,
            },
          }
        `)
      })
    })

    describe('switchNetworkAsync', () => {
      it('uses configuration', async () => {
        const utils = renderHook(() =>
          useSwitchNetworkWithConnect({
            network: {
              chainId: 4,
            },
          }),
        )
        const { result, waitFor } = utils

        await actConnect({ utils })

        await act(async () => {
          const res = await result.current.network.switchNetworkAsync?.()
          expect(res).toMatchInlineSnapshot(`
            {
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
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 4,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 10299530,
              },
              "name": "Rinkeby",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Rinkeby Ether",
                "symbol": "RIN",
              },
              "network": "rinkeby",
              "rpcUrls": {
                "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
                "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://rinkeby.infura.io/v3",
              },
              "testnet": true,
            }
          `)
        })

        await waitFor(() =>
          expect(result.current.network.isSuccess).toBeTruthy(),
        )
      })

      it('throws error', async () => {
        const connector = new MockConnector({
          options: {
            flags: { failSwitchChain: true },
            signer: getSigners()[0]!,
          },
        })
        const utils = renderHook(() =>
          useSwitchNetworkWithConnect({
            connect: { connector },
          }),
        )
        const { result, waitFor } = utils

        await actConnect({ utils, connector })

        await act(async () => {
          await expect(
            result.current.network.switchNetworkAsync?.(4),
          ).rejects.toThrowErrorMatchingInlineSnapshot(
            `"User rejected request"`,
          )
        })

        await waitFor(() => expect(result.current.network.isError).toBeTruthy())
      })
    })
  })

  describe('behavior', () => {
    it('connector does not support programmatic switching', async () => {
      const connector = new MockConnector({
        options: {
          flags: { noSwitchChain: true },
          signer: getSigners()[0]!,
        },
      })
      const utils = renderHook(() =>
        useSwitchNetworkWithConnect({
          connect: { connector },
        }),
      )
      const { result } = utils

      await actConnect({ utils, connector })

      await act(async () => {
        try {
          result.current.network.switchNetwork?.(4)
        } catch (error) {
          expect(error).toMatchInlineSnapshot(
            `[TypeError: result.current.network.switchNetwork is not a function]`,
          )
        }
      })
    })
  })
})
