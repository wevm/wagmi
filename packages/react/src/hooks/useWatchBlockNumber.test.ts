import { watchBlockNumber } from '@wagmi/core'
import { testClient, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import {
  type UseWatchBlockNumberParameters,
  useWatchBlockNumber,
} from './useWatchBlockNumber.js'

vi.mock('@wagmi/core', { spy: true })

test('behavior: subscribes when a callback is added', async () => {
  const watch = vi.mocked(watchBlockNumber)
  const unwatch = vi.fn()
  watch.mockClear()

  await watch.withImplementation(
    () => unwatch,
    async () => {
      const { rerender, unmount } = await renderHook(
        (props) => useWatchBlockNumber({ onBlockNumber: props?.callback }),
        {
          initialProps: {
            callback:
              undefined as UseWatchBlockNumberParameters['onBlockNumber'],
          },
        },
      )

      expect(watch).not.toHaveBeenCalled()

      const callback = vi.fn()
      await rerender({ callback })
      expect(watch).toHaveBeenCalledTimes(1)
      const options = watch.mock.calls[0]![1]
      options.onBlockNumber(1n, undefined)
      expect(callback).toHaveBeenCalledTimes(1)

      const nextCallback = vi.fn()
      await rerender({ callback: nextCallback })
      expect(watch).toHaveBeenCalledTimes(1)
      expect(unwatch).not.toHaveBeenCalled()
      options.onBlockNumber(1n, undefined)
      expect(callback).toHaveBeenCalledTimes(1)
      expect(nextCallback).toHaveBeenCalledTimes(1)

      await unmount()
      expect(unwatch).toHaveBeenCalledTimes(1)
    },
  )
})

test('behavior: unsubscribes when a callback is removed', async () => {
  const watch = vi.mocked(watchBlockNumber)
  const unwatch = vi.fn()
  watch.mockClear()

  await watch.withImplementation(
    () => unwatch,
    async () => {
      const { rerender, unmount } = await renderHook(
        (props) => useWatchBlockNumber({ onBlockNumber: props?.callback }),
        {
          initialProps: {
            callback: vi.fn() as UseWatchBlockNumberParameters['onBlockNumber'],
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

test('default', async () => {
  const blockNumbers: bigint[] = []
  renderHook(() =>
    useWatchBlockNumber({
      onBlockNumber(blockNumber) {
        blockNumbers.push(blockNumber)
      },
    }),
  )

  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })

  await vi.waitUntil(() => blockNumbers.length === 3, { timeout: 10_000 })
  expect(blockNumbers.length).toBe(3)
})

test('behavior: does not resubscribe when onBlockNumber changes', async () => {
  const blockNumbers: bigint[] = []
  let callbackCallCount = 0

  const { rerender } = await renderHook(
    (props) =>
      useWatchBlockNumber({
        onBlockNumber: props?.callback,
      }),
    {
      initialProps: {
        callback: (blockNumber: bigint) => {
          callbackCallCount++
          blockNumbers.push(blockNumber)
        },
      },
    },
  )

  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitUntil(() => blockNumbers.length >= 1, { timeout: 10_000 })

  // Rerender with new callback references multiple times
  rerender({
    callback: (blockNumber: bigint) => {
      callbackCallCount++
      blockNumbers.push(blockNumber)
    },
  })
  rerender({
    callback: (blockNumber: bigint) => {
      callbackCallCount++
      blockNumbers.push(blockNumber)
    },
  })
  rerender({
    callback: (blockNumber: bigint) => {
      callbackCallCount++
      blockNumbers.push(blockNumber)
    },
  })

  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitUntil(() => blockNumbers.length >= 2, { timeout: 10_000 })

  rerender({
    callback: (blockNumber: bigint) => {
      callbackCallCount++
      blockNumbers.push(blockNumber)
    },
  })

  // If resubscribing happened, we'd see duplicate block numbers or
  // emitOnBegin behavior. We should only have 2 blocks total.
  expect(blockNumbers.length).toBe(2)
  expect(callbackCallCount).toBe(2)
})

test('behavior: uses latest callback after rerender', async () => {
  const blockNumbers1: bigint[] = []
  const blockNumbers2: bigint[] = []

  const { rerender } = await renderHook(
    (props) =>
      useWatchBlockNumber({
        onBlockNumber: props?.callback,
      }),
    {
      initialProps: {
        callback: (blockNumber: bigint) => blockNumbers1.push(blockNumber),
      },
    },
  )

  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitUntil(() => blockNumbers1.length >= 1, { timeout: 10_000 })

  rerender({
    callback: (blockNumber) => blockNumbers2.push(blockNumber),
  })

  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitUntil(() => blockNumbers2.length >= 1, { timeout: 10_000 })

  expect(blockNumbers1.length).toBe(1)
  expect(blockNumbers2.length).toBeGreaterThanOrEqual(1)
})
