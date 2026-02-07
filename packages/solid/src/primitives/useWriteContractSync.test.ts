import { connect, disconnect } from '@wagmi/core'
import { abi, address, config, testClient, wait } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { beforeEach, expect, test, vi } from 'vitest'

import { useWriteContractSync } from './useWriteContractSync.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  await disconnect(config).catch(() => {})
})

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderPrimitive(() => useWriteContractSync())

  result.mutate({
    abi: abi.wagmiMintExample,
    address: address.wagmiMintExample,
    functionName: 'mint',
  })
  await wait(2_000)
  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitUntil(() => result.isSuccess, { timeout: 15_000 })

  expect(result.data).toBeDefined()
  expect(result.data?.status).toBe('success')
  expect(result.data?.blockNumber).toBeDefined()

  await disconnect(config, { connector })
})
