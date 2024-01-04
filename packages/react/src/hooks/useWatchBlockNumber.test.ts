import { testClient, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test } from 'vitest'

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
  await wait(100)

  expect(blockNumbers.length).toBe(3)
  expect(
    blockNumbers.map((blockNumber) => blockNumber - blockNumbers[0]!),
  ).toEqual([0n, 1n, 2n])
})
