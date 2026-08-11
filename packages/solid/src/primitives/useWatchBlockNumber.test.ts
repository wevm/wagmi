import { config, testClient, wait } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { expect, test, vi } from 'vitest'

import { useWatchBlockNumber } from './useWatchBlockNumber.js'

test('default', async () => {
  await testClient.mainnet.restart()

  const blockNumbers: bigint[] = []
  renderPrimitive(() =>
    useWatchBlockNumber(() => ({
      onBlockNumber(blockNumber) {
        blockNumbers.push(blockNumber)
      },
    })),
  )

  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })

  await vi.waitUntil(() => blockNumbers.length === 3, { timeout: 10_000 })
  expect(blockNumbers.length).toBe(3)
})

test('parameters: config', async () => {
  const blockNumbers: bigint[] = []
  renderPrimitive(() =>
    useWatchBlockNumber(() => ({
      config,
      onBlockNumber(blockNumber) {
        blockNumbers.push(blockNumber)
      },
    })),
  )

  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })
  await wait(100)
  await testClient.mainnet.mine({ blocks: 1 })

  await vi.waitUntil(() => blockNumbers.length === 3, { timeout: 10_000 })
  expect(blockNumbers.length).toBe(3)
})

test('parameters: enabled', async () => {
  const onBlockNumber = vi.fn()
  renderPrimitive(() =>
    useWatchBlockNumber(() => ({
      enabled: false,
      onBlockNumber,
      emitOnBegin: true,
    })),
  )

  await wait(200)

  expect(onBlockNumber).not.toHaveBeenCalled()
})
