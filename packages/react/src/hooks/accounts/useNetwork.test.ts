import { connect } from '@wagmi/core'
import { MockConnector } from '@wagmi/core/connectors/mock'

import {
  act,
  actConnect,
  actDisconnect,
  getSigners,
  renderHook,
  setupClient,
} from '../../../test'
import { UseConnectArgs, UseConnectConfig, useConnect } from './useConnect'
import { useDisconnect } from './useDisconnect'
import { UseNetworkArgs, UseNetworkConfig, useNetwork } from './useNetwork'

function useNetworkWithConnectAndDisconnect(
  config: {
    connect?: UseConnectArgs & UseConnectConfig
    network?: UseNetworkArgs & UseNetworkConfig
  } = {},
) {
  return {
    connect: useConnect(config.connect),
    disconnect: useDisconnect(),
    network: useNetwork(config.network),
  }
}

describe('useNetwork', () => {
  describe('mounts', () => {
    it('is connected', async () => {
      const client = setupClient()
      await connect({ connector: client.connectors[0] })

      const { result, waitFor } = renderHook(() => useNetwork(), {
        initialProps: { client },
      })

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      const { activeChain, chains, ...res } = result.current
      expect(activeChain?.id).toEqual(1)
      expect(chains.length).toEqual(5)
      expect(res).toMatchInlineSnapshot(`
        {
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
      const { result, waitFor } = renderHook(() => useNetwork())

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      const { chains, ...res } = result.current
      expect(chains.length).toEqual(5)
      expect(res).toMatchInlineSnapshot(`
        {
          "activeChain": undefined,
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
      const { result, waitFor } = renderHook(() => useNetwork({ chainId: 1 }))

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      const { chains, ...res } = result.current
      expect(chains.length).toEqual(5)
      expect(res).toMatchInlineSnapshot(`
        {
          "activeChain": undefined,
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
          useNetworkWithConnectAndDisconnect({
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

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { activeChain, chains, data, ...res } = result.current.network
        expect(activeChain?.id).toMatchInlineSnapshot(`4`)
        expect(data?.id).toMatchInlineSnapshot(`4`)
        expect(res).toMatchInlineSnapshot(`
          {
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
        const utils = renderHook(() => useNetworkWithConnectAndDisconnect())
        const { result, waitFor } = utils

        await actConnect({ utils })

        await act(async () => result.current.network.switchNetwork?.(4))

        await waitFor(() =>
          expect(result.current.network.isSuccess).toBeTruthy(),
        )

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { activeChain, chains, data, ...res } = result.current.network
        expect(activeChain?.id).toMatchInlineSnapshot(`4`)
        expect(data?.id).toMatchInlineSnapshot(`4`)
        expect(res).toMatchInlineSnapshot(`
          {
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
            signer: getSigners()[0],
          },
        })
        const utils = renderHook(() =>
          useNetworkWithConnectAndDisconnect({
            connect: { connector },
          }),
        )
        const { result, waitFor } = utils

        await actConnect({ utils, connector })
        await act(async () => result.current.network.switchNetwork?.(4))
        await waitFor(() => expect(result.current.network.isError).toBeTruthy())

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { activeChain, chains, ...res } = result.current.network
        expect(res).toMatchInlineSnapshot(`
          {
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
          useNetworkWithConnectAndDisconnect({
            network: { chainId: 69 },
          }),
        )
        const { result, waitFor } = utils

        await actConnect({ utils })

        await act(async () => result.current.network.switchNetwork?.())

        await waitFor(() =>
          expect(result.current.network.isSuccess).toBeTruthy(),
        )

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { activeChain, chains, data, ...res } = result.current.network
        expect(activeChain?.id).toMatchInlineSnapshot(`69`)
        expect(activeChain?.unsupported).toMatchInlineSnapshot(`true`)
        expect(data?.id).toMatchInlineSnapshot(`69`)
        expect(res).toMatchInlineSnapshot(`
          {
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
          useNetworkWithConnectAndDisconnect({
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
              "id": 4,
              "name": "Rinkeby",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Rinkeby Ether",
                "symbol": "rETH",
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
            signer: getSigners()[0],
          },
        })
        const utils = renderHook(() =>
          useNetworkWithConnectAndDisconnect({
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
    it('updates on connect and disconnect', async () => {
      const utils = renderHook(() => useNetworkWithConnectAndDisconnect())
      const { result } = utils

      await actConnect({ utils })
      expect(result.current.network.activeChain?.id).toMatchInlineSnapshot(`1`)
      await actDisconnect({ utils })
      expect(result.current.network.activeChain).toMatchInlineSnapshot(
        `undefined`,
      )
    })

    it('connector does not support programmatic switching', async () => {
      const connector = new MockConnector({
        options: {
          flags: { noSwitchChain: true },
          signer: getSigners()[0],
        },
      })
      const utils = renderHook(() =>
        useNetworkWithConnectAndDisconnect({
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
