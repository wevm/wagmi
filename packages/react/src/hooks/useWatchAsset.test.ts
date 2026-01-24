import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useWatchAsset } from './useWatchAsset.js'

const connector = config.connectors[0]!

const tokenInfo = {
  address: '0x0000000000000000000000000000000000000000',
  symbol: 'NULL',
  decimals: 18,
}

test('default', async () => {
  await connect(config, { connector })

  const { result } = await renderHook(() => useWatchAsset())

  result.current.mutate({ type: 'ERC20', options: tokenInfo })
  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  expect(result.current.data).toEqual(true)

  await disconnect(config, { connector })
})
