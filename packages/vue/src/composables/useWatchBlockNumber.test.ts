import { testClient, wait } from '@wagmi/test'
import { renderComposable } from '@wagmi/test/vue'
import { expect, test } from 'vitest'
import { ref } from 'vue-demi'
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
  await wait(100)

  expect(blockNumbers.length).toBe(3)
  expect(
    blockNumbers.map((blockNumber) => blockNumber - blockNumbers[0]!),
  ).toEqual([0n, 1n, 2n])
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
  await wait(100)

  expect(blockNumbers.length).toBe(3)
  expect(
    blockNumbers.map((blockNumber) => blockNumber - blockNumbers[0]!),
  ).toEqual([0n, 1n, 2n])

  enabled.value = false

  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)

  expect(
    blockNumbers.map((blockNumber) => blockNumber - blockNumbers[0]!),
  ).toEqual([0n, 1n, 2n])
})
