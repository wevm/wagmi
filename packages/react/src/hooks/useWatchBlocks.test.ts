import { watchBlocks } from '@wagmi/core'
import { testClient, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import type { Block } from 'viem'
import { expect, test, vi } from 'vitest'

import {
  type UseWatchBlocksParameters,
  useWatchBlocks,
} from './useWatchBlocks.js'

vi.mock('@wagmi/core', { spy: true })

test('behavior: subscribes when a callback is added', async () => {
  const watch = vi.mocked(watchBlocks)
  const unwatch = vi.fn()
  watch.mockClear()

  await watch.withImplementation(
    () => unwatch,
    async () => {
      const { rerender, unmount } = await renderHook(
        (props) => useWatchBlocks({ onBlock: props?.callback }),
        {
          initialProps: {
            callback: undefined as UseWatchBlocksParameters['onBlock'],
          },
        },
      )

      expect(watch).not.toHaveBeenCalled()

      const callback = vi.fn()
      await rerender({ callback })
      expect(watch).toHaveBeenCalledTimes(1)
      const options = watch.mock.calls[0]![1]
      options.onBlock({ number: 1n } as Block, undefined)
      expect(callback).toHaveBeenCalledTimes(1)

      const nextCallback = vi.fn()
      await rerender({ callback: nextCallback })
      expect(watch).toHaveBeenCalledTimes(1)
      expect(unwatch).not.toHaveBeenCalled()
      options.onBlock({ number: 1n } as Block, undefined)
      expect(callback).toHaveBeenCalledTimes(1)
      expect(nextCallback).toHaveBeenCalledTimes(1)

      await unmount()
      expect(unwatch).toHaveBeenCalledTimes(1)
    },
  )
})

test('behavior: unsubscribes when a callback is removed', async () => {
  const watch = vi.mocked(watchBlocks)
  const unwatch = vi.fn()
  watch.mockClear()

  await watch.withImplementation(
    () => unwatch,
    async () => {
      const { rerender, unmount } = await renderHook(
        (props) => useWatchBlocks({ onBlock: props?.callback }),
        {
          initialProps: {
            callback: vi.fn() as UseWatchBlocksParameters['onBlock'],
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
  const blocks: Block[] = []
  await renderHook(() =>
    useWatchBlocks({
      onBlock(block) {
        blocks.push(block)
      },
    }),
  )

  await testClient.mainnet.mine({ blocks: 1 })
  await wait(500)
  await testClient.mainnet.mine({ blocks: 1 })
  await wait(500)
  await testClient.mainnet.mine({ blocks: 1 })

  await vi.waitUntil(() => blocks.length === 3, { timeout: 10_000 })
  expect(blocks.length).toBe(3)
})

test('behavior: uses latest callback after rerender', async () => {
  const blocks1: Block[] = []
  const blocks2: Block[] = []

  const { rerender } = await renderHook(
    (props) =>
      useWatchBlocks({
        onBlock: props?.callback,
      }),
    {
      initialProps: {
        callback: (block: Block) => blocks1.push(block),
      },
    },
  )

  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitUntil(() => blocks1.length >= 1, { timeout: 10_000 })

  await rerender({
    callback: (block) => blocks2.push(block),
  })

  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitUntil(() => blocks2.length >= 1, { timeout: 10_000 })

  expect(blocks1.length).toBe(1)
  expect(blocks2.length).toBeGreaterThanOrEqual(1)
})
