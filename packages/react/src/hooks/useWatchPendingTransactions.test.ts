import {
  connect,
  disconnect,
  sendTransaction,
  watchPendingTransactions,
} from '@wagmi/core'
import {
  accounts,
  config,
  testClient,
  transactionHashRegex,
  wait,
} from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { parseEther } from 'viem'
import type { OnTransactionsParameter } from 'viem/actions'
import { expect, test, vi } from 'vitest'

import {
  type UseWatchPendingTransactionsParameters,
  useWatchPendingTransactions,
} from './useWatchPendingTransactions.js'

vi.mock('@wagmi/core', { spy: true })

test('behavior: subscribes when a callback is added', async () => {
  const watch = vi.mocked(watchPendingTransactions)
  const unwatch = vi.fn()
  watch.mockClear()

  await watch.withImplementation(
    () => unwatch,
    async () => {
      const { rerender, unmount } = await renderHook(
        (props) =>
          useWatchPendingTransactions({ onTransactions: props?.callback }),
        {
          initialProps: {
            callback:
              undefined as UseWatchPendingTransactionsParameters['onTransactions'],
          },
        },
      )

      expect(watch).not.toHaveBeenCalled()

      const callback = vi.fn()
      await rerender({ callback })
      expect(watch).toHaveBeenCalledTimes(1)
      const options = watch.mock.calls[0]![1]
      options.onTransactions([])
      expect(callback).toHaveBeenCalledTimes(1)

      const nextCallback = vi.fn()
      await rerender({ callback: nextCallback })
      expect(watch).toHaveBeenCalledTimes(1)
      expect(unwatch).not.toHaveBeenCalled()
      options.onTransactions([])
      expect(callback).toHaveBeenCalledTimes(1)
      expect(nextCallback).toHaveBeenCalledTimes(1)

      await unmount()
      expect(unwatch).toHaveBeenCalledTimes(1)
    },
  )
})

test('behavior: unsubscribes when a callback is removed', async () => {
  const watch = vi.mocked(watchPendingTransactions)
  const unwatch = vi.fn()
  watch.mockClear()

  await watch.withImplementation(
    () => unwatch,
    async () => {
      const { rerender, unmount } = await renderHook(
        (props) =>
          useWatchPendingTransactions({ onTransactions: props?.callback }),
        {
          initialProps: {
            callback:
              vi.fn() as UseWatchPendingTransactionsParameters['onTransactions'],
          },
        },
      )

      expect(watch).toHaveBeenCalledTimes(1)

      await rerender({ callback: undefined })
      expect(unwatch).toHaveBeenCalledTimes(1)
      expect(watch).toHaveBeenCalledTimes(1)

      await rerender({ callback: vi.fn() })
      expect(watch).toHaveBeenCalledTimes(2)

      await unmount()
      expect(unwatch).toHaveBeenCalledTimes(2)
    },
  )
})

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  let transactions: OnTransactionsParameter = []
  renderHook(() =>
    useWatchPendingTransactions({
      onTransactions(next) {
        transactions = [...transactions, ...next]
      },
    }),
  )
  await wait(1000)

  await sendTransaction(config, {
    to: accounts[1],
    value: parseEther('1'),
  })
  await wait(200)

  await sendTransaction(config, {
    to: accounts[3],
    value: parseEther('1'),
  })
  await wait(200)

  await testClient.mainnet.mine({ blocks: 1 })

  expect(transactions.length).toBe(2)
  expect(transactions[0]).toMatch(transactionHashRegex)

  await disconnect(config, { connector })
})

test('behavior: uses latest callback after rerender', async () => {
  await connect(config, { connector })

  let transactions1: OnTransactionsParameter = []
  let transactions2: OnTransactionsParameter = []

  const { rerender } = await renderHook(
    (props) =>
      useWatchPendingTransactions({
        onTransactions: props?.callback,
      }),
    {
      initialProps: {
        callback: (next: OnTransactionsParameter) => {
          transactions1 = [...transactions1, ...next]
        },
      },
    },
  )
  await wait(1000)

  await sendTransaction(config, {
    to: accounts[1],
    value: parseEther('0.001'),
  })
  await vi.waitUntil(() => transactions1.length >= 1, { timeout: 10_000 })
  await testClient.mainnet.mine({ blocks: 1 })

  rerender({
    callback: (next) => {
      transactions2 = [...transactions2, ...next]
    },
  })

  await sendTransaction(config, {
    to: accounts[1],
    value: parseEther('0.001'),
  })
  await vi.waitUntil(() => transactions2.length >= 1, { timeout: 10_000 })
  await testClient.mainnet.mine({ blocks: 1 })

  expect(transactions1.length).toBe(1)
  expect(transactions2.length).toBeGreaterThanOrEqual(1)

  await disconnect(config, { connector })
})
