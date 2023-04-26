import { MockConnector } from '@wagmi/core/connectors/mock'
import { parseEther } from 'viem'
import { describe, expect, it } from 'vitest'

import { act, actConnect, getWalletClients, renderHook } from '../../../test'
import type { SendTransactionResult } from '../../actions'
import { useConnect } from '../accounts'
import type { UsePrepareSendTransactionConfig } from './usePrepareSendTransaction'
import { usePrepareSendTransaction } from './usePrepareSendTransaction'
import type {
  UseSendTransactionArgs,
  UseSendTransactionConfig,
} from './useSendTransaction'
import { useSendTransaction } from './useSendTransaction'

function useSendTransactionWithConnect(
  config: UseSendTransactionArgs & UseSendTransactionConfig = {},
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

  describe('configuration', () => {
    describe('chainId', () => {
      it('unable to switch', async () => {
        const connector = new MockConnector({
          options: {
            flags: { noSwitchChain: true },
            walletClient: getWalletClients()[0]!,
          },
        })
        const utils = renderHook(() =>
          useSendTransactionWithConnect({
            chainId: 1,
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
          expect(result.current.prepareSendTransaction.isSuccess).toBeTruthy(),
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
                "gas": 21000n,
                "to": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
                "value": 1000000000000000000n,
              },
            },
          }
        `)
      })

      it('unprepared', async () => {
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
          result.current.sendTransaction.sendTransaction?.()
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
              "chainId": undefined,
              "mode": undefined,
              "request": {
                "to": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                "value": 1000000000000000000n,
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
          result.current.sendTransaction.sendTransaction?.({
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
              "chainId": undefined,
              "mode": undefined,
              "request": {
                "to": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                "value": 1000000000000000000n,
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
          result.current.sendTransaction.sendTransaction?.()
        })

        await waitFor(() =>
          expect(result.current.sendTransaction.isError).toBeTruthy(),
        )

        const { error, ...res } = result.current.sendTransaction
        expect(error?.message).toMatchInlineSnapshot(`
          "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account.

          This error could arise when the account does not have enough funds to:
           - pay for the total gas fee,
           - pay for the value to send.
           
          The cost of the transaction is calculated as \`gas * gas fee + value\`, where:
           - \`gas\` is the amount of gas needed for transaction to execute,
           - \`gas fee\` is the gas fee,
           - \`value\` is the amount of ether to send to the recipient.
           
          Request Arguments:
            from:   0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
            to:     0x70997970C51812dc3A010C7d01b50e0d17dc79C8
            value:  100000 ETH
            gas:    21000

          Details: Insufficient funds for gas * price + value
          Version: viem@0.3.12"
        `)
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
              "mode": undefined,
              "request": {
                "to": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                "value": 100000000000000000000000n,
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
            (await result.current.sendTransaction.sendTransactionAsync?.()) as SendTransactionResult
          expect(res.hash).toBeDefined()
        })

        await waitFor(() =>
          expect(result.current.sendTransaction.isSuccess).toBeTruthy(),
        )
      })

      it('unprepared', async () => {
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
            expect((error as Error).message).toMatchInlineSnapshot(`
              "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account.

              This error could arise when the account does not have enough funds to:
               - pay for the total gas fee,
               - pay for the value to send.
               
              The cost of the transaction is calculated as \`gas * gas fee + value\`, where:
               - \`gas\` is the amount of gas needed for transaction to execute,
               - \`gas fee\` is the gas fee,
               - \`value\` is the amount of ether to send to the recipient.
               
              Request Arguments:
                from:   0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
                to:     0x70997970C51812dc3A010C7d01b50e0d17dc79C8
                value:  100000 ETH
                gas:    21000

              Details: Insufficient funds for gas * price + value
              Version: viem@0.3.12"
            `)
          }
        })

        await waitFor(() =>
          expect(result.current.sendTransaction.isError).toBeTruthy(),
        )
      })
    })
  })
})
