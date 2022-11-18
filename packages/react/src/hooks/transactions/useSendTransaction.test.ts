import type { TransactionResponse } from '@ethersproject/providers'
import { MockConnector } from '@wagmi/core/connectors/mock'
import { parseEther } from 'ethers/lib/utils.js'
import { describe, expect, it } from 'vitest'

import { act, actConnect, getSigners, renderHook } from '../../../test'
import { useConnect } from '../accounts'
import type { UsePrepareSendTransactionConfig } from './usePrepareSendTransaction'
import { usePrepareSendTransaction } from './usePrepareSendTransaction'
import type {
  UseSendTransactionArgs,
  UseSendTransactionConfig,
} from './useSendTransaction'
import { useSendTransaction } from './useSendTransaction'

function useSendTransactionWithConnect(
  config: UseSendTransactionArgs & UseSendTransactionConfig,
) {
  return {
    connect: useConnect(),
    sendTransaction: useSendTransaction(config),
  }
}

function useSendTransactionPreparedWithConnect(
  config: UsePrepareSendTransactionConfig & { chainId?: number },
) {
  const prepareSendTransaction = usePrepareSendTransaction(config)
  return {
    connect: useConnect(),
    prepareSendTransaction,
    sendTransaction: useSendTransaction({
      chainId: config?.chainId,
      ...prepareSendTransaction.config,
    }),
  }
}

describe('useSendTransaction', () => {
  it('mounts', () => {
    const { result } = renderHook(() =>
      useSendTransaction({ mode: 'recklesslyUnprepared' }),
    )
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

  describe('configuration', () => {
    describe('chainId', () => {
      it('recklesslyUnprepared - unable to switch', async () => {
        const connector = new MockConnector({
          options: {
            flags: { noSwitchChain: true },
            signer: getSigners()[0]!,
          },
        })
        const utils = renderHook(() =>
          useSendTransactionWithConnect({
            chainId: 1,
            mode: 'recklesslyUnprepared',
            request: {
              to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
              value: parseEther('1'),
            },
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ chainId: 5, connector, utils })

        await waitFor(() =>
          expect(result.current.sendTransaction.sendTransaction).toBeDefined(),
        )

        await act(async () => {
          result.current.sendTransaction.sendTransaction?.()
        })

        await waitFor(() =>
          expect(result.current.sendTransaction.isError).toBeTruthy(),
        )

        expect(result.current.sendTransaction.error).toMatchInlineSnapshot(
          '[ChainMismatchError: Chain mismatch: Expected "Ethereum", received "Goerli".]',
        )
      })
    })
  })

  describe('return value', () => {
    describe('sendTransaction', () => {
      it('prepared', async () => {
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
          expect(result.current.sendTransaction.sendTransaction).toBeDefined(),
        )

        await act(async () => {
          result.current.sendTransaction.sendTransaction?.()
        })

        await waitFor(() =>
          expect(result.current.sendTransaction.isSuccess).toBeTruthy(),
        )

        const { data, ...res } = result.current.sendTransaction
        expect(data).toBeDefined()
        expect(data?.hash).toBeDefined()
        expect(data?.wait).toBeDefined()
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
              "chainId": undefined,
              "mode": "prepared",
              "request": {
                "gasLimit": {
                  "hex": "0x5208",
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

      it('recklesslyUnprepared', async () => {
        const utils = renderHook(() =>
          useSendTransactionWithConnect({
            mode: 'recklesslyUnprepared',
            request: {
              to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
              value: parseEther('1'),
            },
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          result.current.sendTransaction.sendTransaction?.()
        })

        await waitFor(() =>
          expect(result.current.sendTransaction.isSuccess).toBeTruthy(),
        )

        const { data, ...res } = result.current.sendTransaction
        expect(data).toBeDefined()
        expect(data?.hash).toBeDefined()
        expect(data?.wait).toBeDefined()
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
              "chainId": undefined,
              "mode": "recklesslyUnprepared",
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
        const utils = renderHook(() =>
          useSendTransactionWithConnect({ mode: 'recklesslyUnprepared' }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          result.current.sendTransaction.sendTransaction?.({
            recklesslySetUnpreparedRequest: {
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
        expect(data?.wait).toBeDefined()
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
              "chainId": undefined,
              "mode": "recklesslyUnprepared",
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
            mode: 'recklesslyUnprepared',
            request: {
              to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
              value: parseEther('100000'),
            },
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          result.current.sendTransaction.sendTransaction?.()
        })

        await waitFor(() =>
          expect(result.current.sendTransaction.isError).toBeTruthy(),
        )

        const { error, ...res } = result.current.sendTransaction
        expect(
          error?.message?.includes(
            'insufficient funds for intrinsic transaction cost',
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
              "chainId": undefined,
              "mode": "recklesslyUnprepared",
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
      it('prepared', async () => {
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
          expect(result.current.sendTransaction.sendTransaction).toBeDefined(),
        )

        await act(async () => {
          const res =
            (await result.current.sendTransaction.sendTransactionAsync?.()) as TransactionResponse
          expect(res.hash).toBeDefined()
        })

        await waitFor(() =>
          expect(result.current.sendTransaction.isSuccess).toBeTruthy(),
        )
      })

      it('recklesslyUnprepared', async () => {
        const utils = renderHook(() =>
          useSendTransactionWithConnect({
            mode: 'recklesslyUnprepared',
            request: {
              to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
              value: parseEther('1'),
            },
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          const res = await result.current.sendTransaction
            .sendTransactionAsync!()
          expect(res.hash).toBeDefined()
        })

        await waitFor(() =>
          expect(result.current.sendTransaction.isSuccess).toBeTruthy(),
        )
      })

      it('throws on error', async () => {
        const utils = renderHook(() =>
          useSendTransactionWithConnect({
            mode: 'recklesslyUnprepared',
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
          result.current.connect.connect({ connector: mockConnector })
        })

        await act(async () => {
          try {
            await result.current.sendTransaction.sendTransactionAsync?.()
          } catch (error) {
            expect(
              (error as Error)?.message?.includes(
                'insufficient funds for intrinsic transaction cost',
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
