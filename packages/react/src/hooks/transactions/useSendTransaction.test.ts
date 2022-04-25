import { parseEther } from 'ethers/lib/utils'

import { act, actConnect, renderHook } from '../../../test'
import { useConnect } from '../accounts'
import {
  UseSendTransactionArgs,
  UseSendTransactionConfig,
  useSendTransaction,
} from './useSendTransaction'

function useSendTransactionWithConnect(
  config: UseSendTransactionArgs & UseSendTransactionConfig = {},
) {
  return { connect: useConnect(), sendTransaction: useSendTransaction(config) }
}

describe('useSendTransaction', () => {
  it('mounts', () => {
    const { result } = renderHook(() => useSendTransaction())
    expect(result.current).toMatchInlineSnapshot(`
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

  describe('return value', () => {
    describe('sendTransaction', () => {
      it('uses configuration', async () => {
        const utils = renderHook(() =>
          useSendTransactionWithConnect({
            request: {
              to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
              value: parseEther('1'),
            },
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          result.current.sendTransaction.sendTransaction()
        })

        await waitFor(() =>
          expect(result.current.sendTransaction.isSuccess).toBeTruthy(),
        )

        const { data, ...res } = result.current.sendTransaction
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
                "to": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                "value": {
                  "hex": "0x0de0b6b3a7640000",
                  "type": "BigNumber",
                },
              },
            },
          }
        `)
      })

      it('uses deferred args', async () => {
        const utils = renderHook(() => useSendTransactionWithConnect())
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          result.current.sendTransaction.sendTransaction({
            request: {
              to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
              value: parseEther('1'),
            },
          })
        })

        await waitFor(() =>
          expect(result.current.sendTransaction.isSuccess).toBeTruthy(),
        )

        const { data, ...res } = result.current.sendTransaction
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
                "to": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
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
          useSendTransactionWithConnect({
            request: {
              to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
              value: parseEther('100000'),
            },
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          result.current.sendTransaction.sendTransaction()
        })

        await waitFor(() =>
          expect(result.current.sendTransaction.isError).toBeTruthy(),
        )

        const { error, ...res } = result.current.sendTransaction
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
                "to": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
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

    describe('sendTransactionAsync', () => {
      it('uses configuration', async () => {
        const utils = renderHook(() =>
          useSendTransactionWithConnect({
            request: {
              to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
              value: parseEther('1'),
            },
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          const res =
            await result.current.sendTransaction.sendTransactionAsync()
          expect(res.hash).toBeDefined()
        })

        await waitFor(() =>
          expect(result.current.sendTransaction.isSuccess).toBeTruthy(),
        )
      })

      it('throws on error', async () => {
        const utils = renderHook(() =>
          useSendTransactionWithConnect({
            request: {
              to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
              value: parseEther('100000'),
            },
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          const mockConnector = result.current.connect.connectors[0]
          result.current.connect.connect(mockConnector)
        })

        await act(async () => {
          try {
            await result.current.sendTransaction.sendTransactionAsync()
          } catch (error) {
            expect(
              (error as Error)?.message?.includes(
                "sender doesn't have enough funds to send tx",
              ),
            ).toEqual(true)
          }
        })

        await waitFor(() =>
          expect(result.current.sendTransaction.isError).toBeTruthy(),
        )
      })
    })
  })
})
