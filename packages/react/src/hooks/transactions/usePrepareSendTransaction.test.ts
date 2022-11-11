import { BigNumber } from 'ethers'
import { describe, expect, it } from 'vitest'

import { act, actConnect, renderHook } from '../../../test'
import { useConnect, useSwitchNetwork } from '../accounts'
import type { UsePrepareSendTransactionConfig } from './usePrepareSendTransaction'
import { usePrepareSendTransaction } from './usePrepareSendTransaction'

function usePrepareSendTransactionWithConnect(
  config: UsePrepareSendTransactionConfig,
) {
  const { ...prepareSendTransaction } = usePrepareSendTransaction(config)
  return {
    connect: useConnect(),
    network: useSwitchNetwork(),
    prepareSendTransaction,
  }
}

describe('usePrepareSendTransaction', () => {
  it('mounts', async () => {
    const { result } = renderHook(() =>
      usePrepareSendTransactionWithConnect({
        request: {
          to: 'moxey.eth',
          value: BigNumber.from('10000000000000000'),
        },
      }),
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { config, ...rest } = result.current.prepareSendTransaction
    expect(config).toBeDefined()
    expect(rest).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": null,
        "fetchStatus": "idle",
        "internal": {
          "dataUpdatedAt": 0,
          "errorUpdatedAt": 0,
          "failureCount": 0,
          "isFetchedAfterMount": false,
          "isLoadingError": false,
          "isPaused": false,
          "isPlaceholderData": false,
          "isPreviousData": false,
          "isRefetchError": false,
          "isStale": true,
          "remove": [Function],
        },
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

  it('connect', async () => {
    const utils = renderHook(() =>
      usePrepareSendTransactionWithConnect({
        request: {
          to: 'moxey.eth',
          value: BigNumber.from('10000000000000000'),
        },
      }),
    )
    const { result, waitFor } = utils

    await actConnect({ utils })

    await waitFor(() =>
      expect(result.current.prepareSendTransaction.isSuccess).toBeTruthy(),
    )

    const { config, data: res, ...rest } = result.current.prepareSendTransaction
    const { gasLimit, ...restRequest } = config?.request || {}
    expect(res).toBeDefined()
    expect(config).toBeDefined()
    expect(gasLimit).toBeDefined()
    expect(restRequest).toMatchInlineSnapshot(`
      {
        "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
        "value": {
          "hex": "0x2386f26fc10000",
          "type": "BigNumber",
        },
      }
    `)
    expect(rest).toMatchInlineSnapshot(`
      {
        "error": null,
        "fetchStatus": "idle",
        "internal": {
          "dataUpdatedAt": 1643673600000,
          "errorUpdatedAt": 0,
          "failureCount": 0,
          "isFetchedAfterMount": true,
          "isLoadingError": false,
          "isPaused": false,
          "isPlaceholderData": false,
          "isPreviousData": false,
          "isRefetchError": false,
          "isStale": false,
          "remove": [Function],
        },
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

  describe('errors', () => {
    it('should throw an error on the wrong chain', async () => {
      const utils = renderHook(() =>
        usePrepareSendTransactionWithConnect({
          request: {
            to: 'moxey.eth',
            value: BigNumber.from('10000000000000000'),
          },
          chainId: 1,
        }),
      )

      const { result, waitFor } = utils
      await actConnect({ chainId: 5, utils })

      await waitFor(() =>
        expect(result.current.prepareSendTransaction.isError).toBeTruthy(),
      )
      expect(result.current.prepareSendTransaction.error).toMatchInlineSnapshot(
        '[ChainMismatchError: Chain mismatch: Expected "Ethereum", received "Goerli".]',
      )

      await act(async () => result.current.network.switchNetwork?.(1))
      await waitFor(() => expect(result.current.network.isSuccess).toBeTruthy())

      await waitFor(() =>
        expect(result.current.prepareSendTransaction.isSuccess).toBeTruthy(),
      )
    })

    it('should throw an error if chainId is not configured', async () => {
      const utils = renderHook(() =>
        usePrepareSendTransactionWithConnect({
          request: {
            to: 'moxey.eth',
            value: BigNumber.from('10000000000000000'),
          },
          chainId: 69_420,
        }),
      )

      const { result, waitFor } = utils
      await actConnect({ chainId: 69_420, utils })

      await waitFor(() =>
        expect(result.current.prepareSendTransaction.isError).toBeTruthy(),
      )
      expect(result.current.prepareSendTransaction.error).toMatchInlineSnapshot(
        '[ChainNotConfigured: Chain "69420" not configured for connector "mock".]',
      )
    })
  })

  describe('behaviors', () => {
    it('does not run when request is undefined', async () => {
      const config = {
        request: undefined,
      } as const
      const utils = renderHook(() =>
        usePrepareSendTransactionWithConnect(config),
      )
      const { rerender, result, waitFor } = utils

      await actConnect({ utils })
      await waitFor(() =>
        expect(result.current.prepareSendTransaction.isIdle).toBeTruthy(),
      )
      expect(result.current.prepareSendTransaction.config.request).toBe(
        undefined,
      )

      // @ts-expect-error assigning to readonly object
      config.request = {
        to: 'moxey.eth',
        value: BigNumber.from('10000000000000000'),
      }
      rerender()

      await waitFor(() =>
        expect(result.current.prepareSendTransaction.isSuccess).toBeTruthy(),
      )
    })
  })
})
