import { parseEther } from 'viem'
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
        to: 'moxey.eth',
        value: parseEther('0.01'),
      }),
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { config, ...rest } = result.current.prepareSendTransaction
    expect(config).toEqual({
      mode: 'prepared',
    })
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
        to: 'moxey.eth',
        value: parseEther('0.01'),
      }),
    )
    const { result, waitFor } = utils

    await actConnect({ utils })

    await waitFor(() =>
      expect(result.current.prepareSendTransaction.isSuccess).toBeTruthy(),
    )

    const res = result.current.prepareSendTransaction
    expect(res).toMatchInlineSnapshot(`
      {
        "config": {
          "accessList": undefined,
          "account": undefined,
          "data": undefined,
          "gas": undefined,
          "gasPrice": undefined,
          "maxFeePerGas": undefined,
          "maxPriorityFeePerGas": undefined,
          "mode": "prepared",
          "nonce": undefined,
          "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
          "value": 10000000000000000n,
        },
        "data": {
          "accessList": undefined,
          "account": undefined,
          "data": undefined,
          "gas": undefined,
          "gasPrice": undefined,
          "maxFeePerGas": undefined,
          "maxPriorityFeePerGas": undefined,
          "mode": "prepared",
          "nonce": undefined,
          "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
          "value": 10000000000000000n,
        },
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
          "isStale": true,
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
          chainId: 1,
          to: 'moxey.eth',
          value: parseEther('0.01'),
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
          chainId: 69_420,
          to: 'moxey.eth',
          value: parseEther('0.01'),
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
      let config: UsePrepareSendTransactionConfig = {
        to: undefined,
      }
      const utils = renderHook(() =>
        usePrepareSendTransactionWithConnect(config),
      )
      const { rerender, result, waitFor } = utils

      await actConnect({ utils })
      await waitFor(() =>
        expect(result.current.prepareSendTransaction.isIdle).toBeTruthy(),
      )
      expect(result.current.prepareSendTransaction.config).toEqual({
        mode: 'prepared',
      })

      config = {
        to: 'moxey.eth',
        value: 10000000000000000n,
      }
      rerender()

      await waitFor(() =>
        expect(result.current.prepareSendTransaction.isSuccess).toBeTruthy(),
      )
    })
  })
})
