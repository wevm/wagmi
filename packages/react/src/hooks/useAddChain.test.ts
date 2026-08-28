import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { avalanche } from 'viem/chains'
import { test, vi } from 'vitest'

import { useAddChain } from './useAddChain.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() => useAddChain())

  result.current.mutate({ chain: avalanche })
  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  await disconnect(config, { connector })
})

test('no block explorer', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() => useAddChain())

  result.current.mutate({
    chain: { ...avalanche, blockExplorers: undefined },
  })
  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  await disconnect(config, { connector })
})
