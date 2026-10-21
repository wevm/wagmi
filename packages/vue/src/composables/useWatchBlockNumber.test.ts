import { testClient, wait } from '@wagmi/test'
import { renderComposable } from '@wagmi/test/vue'
import { expect, test, vi } from 'vitest'
import { ref } from 'vue'
import { useWatchBlockNumber } from './useWatchBlockNumber.js'

test('default', async () => {
  const blockNumbers: bigint[] = []
  renderComposable(() =>
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
  await vi.waitUntil(() => blockNumbers.length >= 3, { timeout: 10_000 })

  expect(blockNumbers.length).toBeGreaterThanOrEqual(3)
  expect(
    blockNumbers
      .slice(0, 3)
      .map((blockNumber) => blockNumber - blockNumbers[0]!),
  ).toEqual([0n, 1n, 2n])
  await wait(500)
})

test('parameters: enabled', async () => {
  const enabled = ref(true)

  const blockNumbers: bigint[] = []
  renderComposable(() =>
    useWatchBlockNumber({
      enabled,
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
  await vi.waitUntil(() => blockNumbers.length >= 3, { timeout: 10_000 })

  expect(blockNumbers.length).toBeGreaterThanOrEqual(3)
  expect(
    blockNumbers
      .slice(0, 3)
      .map((blockNumber) => blockNumber - blockNumbers[0]!),
  ).toEqual([0n, 1n, 2n])

  enabled.value = false
  const blockNumbersLength = blockNumbers.length

  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)

  expect(blockNumbers.length).toBe(blockNumbersLength)
  await wait(500)
})
