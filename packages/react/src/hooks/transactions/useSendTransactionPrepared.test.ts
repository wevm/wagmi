import { TransactionResponse } from '@ethersproject/providers'
import { parseEther } from 'ethers/lib/utils'

import { act, actConnect, renderHook } from '../../../test'
import { useConnect } from '../accounts'
import {
  UsePrepareTransactionArgs,
  UsePrepareTransactionConfig,
  usePrepareTransaction,
} from './usePrepareTransaction'
import { useSendTransactionPrepared } from './useSendTransactionPrepared'

function useSendTransactionPreparedWithConnect(
  config: UsePrepareTransactionArgs & UsePrepareTransactionConfig,
) {
  const prepareTransaction = usePrepareTransaction(config)
  return {
    prepareTransaction,
    connect: useConnect(),
    sendTransactionPrepared: useSendTransactionPrepared({
      request: prepareTransaction.data,
    }),
  }
}

describe('useSendTransactionPrepared', () => {
  it('mounts', async () => {
    const { result } = renderHook(() =>
      useSendTransactionPreparedWithConnect({
        request: {
          to: 'moxey.eth',
          value: parseEther('1'),
        },
      }),
    )

    expect(result.current.sendTransactionPrepared).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": null,
        "isError": false,
        "isIdle": true,
        "isLoading": false,
        "isSuccess": false,
        "reset": [Function],
        "sendTransaction": [Function],
        "sendTransactionAsync": [Function],
        "status": "idle",
        "variables": undefined,
      }
    `)
  })

  it('populates eager request', async () => {
    const { result, waitFor } = renderHook(() =>
      useSendTransactionPreparedWithConnect({
        request: {
          to: 'moxey.eth',
          value: parseEther('1'),
        },
      }),
    )

    await waitFor(() =>
      expect(result.current.prepareTransaction.isSuccess).toBeTruthy(),
    )

    expect(result.current.prepareTransaction).toMatchInlineSnapshot(`
      {
        "data": {
          "gasLimit": {
            "hex": "0x5209",
            "type": "BigNumber",
          },
          "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
          "value": {
            "hex": "0x0de0b6b3a7640000",
            "type": "BigNumber",
          },
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

  describe('return value', () => {
    describe('sendTransactionPrepared', () => {
      it('uses eager request when it has been populated', async () => {
        const utils = renderHook(() =>
          useSendTransactionPreparedWithConnect({
            request: {
              to: 'moxey.eth',
              value: parseEther('1'),
            },
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await waitFor(() =>
          expect(
            result.current.sendTransactionPrepared.sendTransaction,
          ).toBeDefined(),
        )

        await act(async () => {
          result.current.sendTransactionPrepared.sendTransaction?.()
        })

        await waitFor(() =>
          expect(result.current.sendTransactionPrepared.isSuccess).toBeTruthy(),
        )

        const { data, ...res } = result.current.sendTransactionPrepared
        expect(data).toBeDefined()
        expect(data?.hash).toBeDefined()
        expect(res).toMatchInlineSnapshot(`
          {
            "error": null,
            "isError": false,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": true,
            "reset": [Function],
            "sendTransaction": [Function],
            "sendTransactionAsync": [Function],
            "status": "success",
            "variables": {
              "request": {
                "gasLimit": {
                  "hex": "0x5209",
                  "type": "BigNumber",
                },
                "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
                "value": {
                  "hex": "0x0de0b6b3a7640000",
                  "type": "BigNumber",
                },
              },
            },
          }
        `)
      })

      it('fails on insufficient balance', async () => {
        const utils = renderHook(() =>
          useSendTransactionPreparedWithConnect({
            request: {
              to: 'moxey.eth',
              value: parseEther('100000'),
            },
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await waitFor(() =>
          expect(
            result.current.sendTransactionPrepared.sendTransaction,
          ).toBeDefined(),
        )

        await act(async () => {
          result.current.sendTransactionPrepared.sendTransaction?.()
        })

        await waitFor(() =>
          expect(result.current.sendTransactionPrepared.isError).toBeTruthy(),
        )

        const { error, ...res } = result.current.sendTransactionPrepared
        expect(
          error?.message?.includes(
            "sender doesn't have enough funds to send tx",
          ),
        ).toEqual(true)
        expect(res).toMatchInlineSnapshot(`
          {
            "data": undefined,
            "isError": true,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": false,
            "reset": [Function],
            "sendTransaction": [Function],
            "sendTransactionAsync": [Function],
            "status": "error",
            "variables": {
              "request": {
                "gasLimit": {
                  "hex": "0x5209",
                  "type": "BigNumber",
                },
                "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
                "value": {
                  "hex": "0x152d02c7e14af6800000",
                  "type": "BigNumber",
                },
              },
            },
          }
        `)
      })
    })

    describe('sendTransactionPreparedAsync', () => {
      it('uses configuration', async () => {
        const utils = renderHook(() =>
          useSendTransactionPreparedWithConnect({
            request: {
              to: 'moxey.eth',
              value: parseEther('1'),
            },
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await waitFor(() =>
          expect(
            result.current.sendTransactionPrepared.sendTransaction,
          ).toBeDefined(),
        )

        await act(async () => {
          const res =
            (await result.current.sendTransactionPrepared.sendTransactionAsync?.()) as TransactionResponse
          expect(res.hash).toBeDefined()
        })

        await waitFor(() =>
          expect(result.current.sendTransactionPrepared.isSuccess).toBeTruthy(),
        )
      })

      it('throws on error', async () => {
        const utils = renderHook(() =>
          useSendTransactionPreparedWithConnect({
            request: {
              to: 'moxey.eth',
              value: parseEther('100000'),
            },
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await waitFor(() =>
          expect(
            result.current.sendTransactionPrepared.sendTransactionAsync,
          ).toBeDefined(),
        )

        await act(async () => {
          const mockConnector = result.current.connect.connectors[0]
          result.current.connect.connect({ connector: mockConnector })
        })

        await act(async () => {
          try {
            await result.current.sendTransactionPrepared.sendTransactionAsync?.()
          } catch (error) {
            expect(
              (error as Error)?.message?.includes(
                "sender doesn't have enough funds to send tx",
              ),
            ).toEqual(true)
          }
        })

        await waitFor(() =>
          expect(result.current.sendTransactionPrepared.isError).toBeTruthy(),
        )
      })
    })
  })
})
