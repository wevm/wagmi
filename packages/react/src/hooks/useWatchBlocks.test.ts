import { testClient, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import type { Block } from 'viem'
import { expect, test } from 'vitest'

import { useWatchBlocks } from './useWatchBlocks.js'

test('default', async () => {
  const blocks: Block[] = []
  renderHook(() =>
    useWatchBlocks({
      onBlock(block) {
        blocks.push(block)
      },
    }),
  )

  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)

  expect(blocks.length).toBe(3)
  expect(blocks.map((block) => block.number! - blocks[0]!.number!)).toEqual([
    0n,
    1n,
    2n,
  ])
})
