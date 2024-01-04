import { config, testClient, wait } from '@wagmi/test'
import { expect, test } from 'vitest'

import { watchBlockNumber } from './watchBlockNumber.js'

test('default', async () => {
  const blockNumbers: bigint[] = []
  const unwatch = watchBlockNumber(config, {
    onBlockNumber(blockNumber) {
      blockNumbers.push(blockNumber)
    },
  })

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

  unwatch()
})
