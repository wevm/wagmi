import { config, testClient, wait } from '@wagmi/test'
import { expect, test } from 'vitest'

import type { Block } from 'viem'
import { watchBlocks } from './watchBlocks.js'

test('default', async () => {
  const blocks: Block[] = []
  const unwatch = watchBlocks(config, {
    onBlock(block) {
      blocks.push(block)
    },
  })

  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)

  expect(blocks.length).toBe(3)
  expect(blocks.map((block) => block.number! - blocks[0]?.number!)).toEqual([
    0n,
    1n,
    2n,
  ])

  unwatch()
})
