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
