import { parseEther } from 'ethers/lib/utils'

import { act, actConnect, renderHook } from '../../../test'
import { useConnect } from '../accounts'
import {
  UseSendTransactionEagerArgs,
  UseSendTransactionEagerConfig,
  useSendTransactionEager,
} from './useSendTransactionEager'

function useSendTransactionEagerWithConnect(
  config?: UseSendTransactionEagerArgs & UseSendTransactionEagerConfig,
) {
  return {
    connect: useConnect(),
    sendTransactionEager: useSendTransactionEager(config),
  }
}

describe('useSendTransactionEager', () => {
  it('mounts', async () => {
    const { result } = renderHook(() =>
      useSendTransactionEager({
        request: {
          to: 'moxey.eth',
          value: parseEther('1'),
        },
      }),
    )

    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": null,
        "internal": {
          "eagerRequest": undefined,
        },
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
      useSendTransactionEager({
        request: {
          to: 'moxey.eth',
          value: parseEther('1'),
        },
      }),
    )

    await waitFor(() =>
      expect(result.current.internal.eagerRequest).toBeDefined(),
    )

    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": null,
        "internal": {
          "eagerRequest": {
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
    describe('sendTransactionEager', () => {
      it('uses eager request when it has been populated', async () => {
        const utils = renderHook(() =>
          useSendTransactionEagerWithConnect({
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
            result.current.sendTransactionEager.internal.eagerRequest,
          ).toBeDefined(),
        )

        await act(async () => {
          result.current.sendTransactionEager.sendTransaction()
        })

        await waitFor(() =>
          expect(result.current.sendTransactionEager.isSuccess).toBeTruthy(),
        )

        const { data, ...res } = result.current.sendTransactionEager
        expect(data).toBeDefined()
        expect(data?.hash).toBeDefined()
        expect(res).toMatchInlineSnapshot(`
          {
            "error": null,
            "internal": {
              "eagerRequest": {
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

      it('uses given request if eager request has not been populated', async () => {
        const utils = renderHook(() =>
          useSendTransactionEagerWithConnect({
            request: {
              to: 'moxey.eth',
              value: parseEther('1'),
            },
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          result.current.sendTransactionEager.sendTransaction()
        })

        await waitFor(() =>
          expect(result.current.sendTransactionEager.isSuccess).toBeTruthy(),
        )

        const { data, ...res } = result.current.sendTransactionEager
        expect(data).toBeDefined()
        expect(data?.hash).toBeDefined()
        expect(res).toMatchInlineSnapshot(`
          {
            "error": null,
            "internal": {
              "eagerRequest": {
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
                "to": "moxey.eth",
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
          useSendTransactionEagerWithConnect({
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
            result.current.sendTransactionEager.internal.eagerRequest,
          ).toBeDefined(),
        )

        await act(async () => {
          result.current.sendTransactionEager.sendTransaction()
        })

        await waitFor(() =>
          expect(result.current.sendTransactionEager.isError).toBeTruthy(),
        )

        const { error, ...res } = result.current.sendTransactionEager
        expect(
          error?.message?.includes(
            "sender doesn't have enough funds to send tx",
          ),
        ).toEqual(true)
        expect(res).toMatchInlineSnapshot(`
          {
            "data": undefined,
            "internal": {
              "eagerRequest": {
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

    describe('sendTransactionEagerAsync', () => {
      it('uses configuration', async () => {
        const utils = renderHook(() =>
          useSendTransactionEagerWithConnect({
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
            result.current.sendTransactionEager.internal.eagerRequest,
          ).toBeDefined(),
        )

        await act(async () => {
          const res =
            await result.current.sendTransactionEager.sendTransactionAsync()
          expect(res.hash).toBeDefined()
        })

        await waitFor(() =>
          expect(result.current.sendTransactionEager.isSuccess).toBeTruthy(),
        )
      })

      it('throws on error', async () => {
        const utils = renderHook(() =>
          useSendTransactionEagerWithConnect({
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
            result.current.sendTransactionEager.internal.eagerRequest,
          ).toBeDefined(),
        )

        await act(async () => {
          const mockConnector = result.current.connect.connectors[0]
          result.current.connect.connect({ connector: mockConnector })
        })

        await act(async () => {
          try {
            await result.current.sendTransactionEager.sendTransactionAsync()
          } catch (error) {
            expect(
              (error as Error)?.message?.includes(
                "sender doesn't have enough funds to send tx",
              ),
            ).toEqual(true)
          }
        })

        await waitFor(() =>
          expect(result.current.sendTransactionEager.isError).toBeTruthy(),
        )
      })
    })
  })
})
