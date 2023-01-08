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
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": WalletSigner {
            "_isSigner": true,
            "_mnemonic": [Function],
            "_signingKey": [Function],
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "provider": "<Provider network={1} />",
          },
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
      const { internal, ...res } = result.current.signer
      expect(res).toMatchInlineSnapshot(`
        {
          "data": WalletSigner {
            "_isSigner": true,
            "_mnemonic": [Function],
            "_signingKey": [Function],
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "provider": "<Provider network={1} />",
          },
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
      const { internal, ...res } = result.current.signer
      expect(res).toMatchInlineSnapshot(`
        {
          "data": WalletSigner {
            "_isSigner": true,
            "_mnemonic": [Function],
            "_signingKey": [Function],
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "provider": "<Provider network={1} />",
          },
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

      const nextSigner = getSigners()[1]!
      const provider = await result.current.account.connector?.getProvider()
      await provider.switchSigner(nextSigner)

      await waitFor(() =>
        expect(
          (result.current.signer.data as any).address === nextSigner.address,
        ).toBeTruthy(),
      )

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal: _, ...res2 } = result.current.signer
      expect(res2).toMatchInlineSnapshot(`
        {
          "data": WalletSigner {
            "_isSigner": true,
            "_mnemonic": [Function],
            "_signingKey": [Function],
            "address": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            "provider": "<Provider network={1} />",
          },
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
    })

    it('updates on network', async () => {
      const utils = renderHook(() => useSignerWithAccount())
      const { result, waitFor } = utils

      await actConnect({ utils })

      await waitFor(() => expect(result.current.signer.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current.signer
      expect(res).toMatchInlineSnapshot(`
        {
          "data": WalletSigner {
            "_isSigner": true,
            "_mnemonic": [Function],
            "_signingKey": [Function],
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "provider": "<Provider network={1} />",
          },
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

      await actSwitchNetwork({ utils, chainId: 1 })

      await waitFor(() => expect(result.current.signer.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal: _, ...res2 } = result.current.signer
      expect(res2).toMatchInlineSnapshot(`
        {
          "data": WalletSigner {
            "_isSigner": true,
            "_mnemonic": [Function],
            "_signingKey": [Function],
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "provider": "<Provider network={1} />",
          },
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
    })
  })
})
