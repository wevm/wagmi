import { connect, disconnect } from '@wagmi/core'
import { abi, address, config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useWriteContract } from './useWriteContract.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() => useWriteContract())

  result.current.writeContract({
    abi: abi.wagmiMintExample,
    address: address.wagmiMintExample,
    functionName: 'mint',
  })
  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  expect(result.current.data).toBeDefined()

  await disconnect(config, { connector })
})
