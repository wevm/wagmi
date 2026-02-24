import { testClient, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import type { Block } from 'viem'
import { expect, test, vi } from 'vitest'

import { useWatchBlocks } from './useWatchBlocks.js'

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

  rerender({
    callback: (block) => blocks2.push(block),
  })

  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitUntil(() => blocks2.length >= 1, { timeout: 10_000 })

  expect(blocks1.length).toBe(1)
  expect(blocks2.length).toBeGreaterThanOrEqual(1)
})
