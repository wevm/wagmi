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
        "sendTransaction": undefined,
        "sendTransactionAsync": undefined,
        "status": "idle",
        "variables": undefined,
      }
    `)
  })

  describe('return value', () => {
    describe('sendTransactionPrepared', () => {
      it('sends transaction', async () => {
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
      it('sends transaction', async () => {
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
