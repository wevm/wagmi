import { testClient, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useWatchBlockNumber } from './useWatchBlockNumber.js'

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

  await vi.waitUntil(() => blockNumbers.length === 3, { timeout: 5_000 })
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
  await vi.waitUntil(() => blockNumbers.length >= 1, { timeout: 5_000 })

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
  await vi.waitUntil(() => blockNumbers.length >= 2, { timeout: 5_000 })

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
  await vi.waitUntil(() => blockNumbers1.length >= 1, { timeout: 5_000 })

  rerender({
    callback: (blockNumber) => blockNumbers2.push(blockNumber),
  })

  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitUntil(() => blockNumbers2.length >= 1, { timeout: 5_000 })

  expect(blockNumbers1.length).toBe(1)
  expect(blockNumbers2.length).toBeGreaterThanOrEqual(1)
})
