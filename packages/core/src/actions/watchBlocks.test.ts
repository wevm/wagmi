import { config, testClient, wait } from '@wagmi/test'
import type { Block } from 'viem'
import { expect, test, vi } from 'vitest'
import { watchBlocks } from './watchBlocks.js'

test('default', async () => {
  const blocks: Block[] = []
  const unwatch = watchBlocks(config, {
    onBlock(block) {
      blocks.push(block)
    },
  })

  await testClient.mainnet.mine({ blocks: 1 })
  await wait(500)
  await testClient.mainnet.mine({ blocks: 1 })
  await wait(500)
  await testClient.mainnet.mine({ blocks: 1 })

  await vi.waitUntil(() => blocks.length === 3, { timeout: 10_000 })
  expect(blocks.length).toBe(3)

  unwatch()
  await wait(100)
})
