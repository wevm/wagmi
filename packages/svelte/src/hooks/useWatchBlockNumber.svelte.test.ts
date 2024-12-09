import { testClient, wait } from '@wagmi/test'
import { testHook } from '@wagmi/test/svelte'
import { expect, test } from 'vitest'
import { useWatchBlockNumber } from './useWatchBlockNumber.svelte.js'

test(
  'default',
  testHook(async () => {
    const blockNumbers: bigint[] = []
    useWatchBlockNumber(() => ({
      onBlockNumber(blockNumber) {
        blockNumbers.push(blockNumber)
      },
    }))

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
  }),
)
