import { connect, disconnect } from '@wagmi/core'
import { abi, address, config, testClient, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { beforeEach, expect, test, vi } from 'vitest'

import { useWriteContractSync } from './useWriteContractSync.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  await disconnect(config).catch(() => {})
})

test('default', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() => useWriteContractSync())

  result.current.mutate({
    abi: abi.wagmiMintExample,
    address: address.wagmiMintExample,
    functionName: 'mint',
  })
  await wait(4_000)
  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitUntil(() => result.current.isSuccess, { timeout: 15_000 })

  expect(result.current.data).toBeDefined()
  expect(result.current.data?.status).toBe('success')
  expect(result.current.data?.blockNumber).toBeDefined()

  await disconnect(config, { connector })
})
