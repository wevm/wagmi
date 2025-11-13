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

  await vi.waitUntil(() => blocks.length === 3, { timeout: 5_000 })
  expect(blocks.length).toBe(3)
})
