import { Hash } from '@wagmi/core'
import { parseEther } from 'ethers/lib/utils'
import { describe, expect, it } from 'vitest'

import { act, actConnect, renderHook } from '../../../test'
import { useConnect } from '../accounts'
import { useSendTransaction } from './useSendTransaction'
import {
  UseWaitForTransactionArgs,
  UseWaitForTransactionConfig,
  useWaitForTransaction,
} from './useWaitForTransaction'

function useWaitForTransactionWithSendTransactionAndConnect(
  config: UseWaitForTransactionArgs & UseWaitForTransactionConfig = {},
) {
  return {
    connect: useConnect(),
    sendTransaction: useSendTransaction({ mode: 'recklesslyUnprepared' }),
    waitForTransaction: useWaitForTransaction(config),
  }
}

describe('useWaitForTransaction', () => {
  it('mounts', () => {
    const { result } = renderHook(() => useWaitForTransaction())
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

  describe('configuration', () => {
    it('scopeKey', async () => {
      const { result, waitFor } = renderHook(() => {
        return {
          transaction: useWaitForTransaction({
            hash: '0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b',
          }),
          transactionwithoutScopeKey: useWaitForTransaction({
            hash: '0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b',
            enabled: false,
          }),
          transactionwithScopeKey: useWaitForTransaction({
            hash: '0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b',
            scopeKey: 'wagmi',
            enabled: false,
          }),
        }
      })

      await waitFor(() =>
        expect(result.current.transaction.isSuccess).toBeTruthy(),
      )
      await waitFor(() =>
        expect(
          result.current.transactionwithoutScopeKey.isSuccess,
        ).toBeTruthy(),
      )
      await waitFor(() =>
        expect(result.current.transactionwithScopeKey.isIdle).toBeTruthy(),
      )
    })

    it('chainId', async () => {
      let hash: Hash | undefined = undefined
      const utils = renderHook(() =>
        useWaitForTransactionWithSendTransactionAndConnect({
          chainId: 1,
          hash,
        }),
      )
      const { rerender, result, waitFor } = utils
      await actConnect({ utils })

      await act(async () => {
        result.current.sendTransaction.sendTransaction!({
          recklesslySetUnpreparedRequest: {
            to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            value: parseEther('1'),
          },
        })
      })

      await waitFor(() =>
        expect(result.current.sendTransaction.isSuccess).toBeTruthy(),
      )
      hash = result.current.sendTransaction.data?.hash
      rerender()

      await waitFor(() =>
        expect(result.current.waitForTransaction.isSuccess).toBeTruthy(),
      )

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, internal, ...res } = result.current.waitForTransaction
      expect(data).toBeDefined()
      expect(data?.transactionHash).toEqual(hash)
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
    })

    it('hash', async () => {
      let hash: Hash | undefined = undefined
      const utils = renderHook(() =>
        useWaitForTransactionWithSendTransactionAndConnect({ hash }),
      )
      const { rerender, result, waitFor } = utils
      await actConnect({ utils })

      await act(async () => {
        result.current.sendTransaction.sendTransaction!({
          recklesslySetUnpreparedRequest: {
            to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            value: parseEther('1'),
          },
        })
      })

      await waitFor(() =>
        expect(result.current.sendTransaction.isSuccess).toBeTruthy(),
      )
      hash = result.current.sendTransaction.data?.hash
      rerender()

      await waitFor(() =>
        expect(result.current.waitForTransaction.isSuccess).toBeTruthy(),
      )

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, internal, ...res } = result.current.waitForTransaction
      expect(data).toBeDefined()
      expect(data?.transactionHash).toEqual(hash)
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
    })
  })
})
