import { connect, disconnect } from '@wagmi/core'
import { abi, address, config, testClient, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useWriteContractSync } from './useWriteContractSync.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() => useWriteContractSync())

  result.current.mutate({
    address: address.wagmiMintExample,
    abi: abi.wagmiMintExample,
    functionName: 'mint',
  })
  await wait(2_000)
  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  expect(result.current.data).toBeDefined()

  await disconnect(config, { connector })
})
