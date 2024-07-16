import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useWatchAsset } from './useWatchAsset.js'

const connector = config.connectors[0]!

const tokenInfo = {
  address: '0x0000000000000000000000000000000000000000',
  symbol: 'NULL',
  decimals: 18,
}

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => useWatchAsset())

  result.current.watchAsset({ type: 'ERC20', options: tokenInfo })
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current.data).toEqual(true)

  await disconnect(config, { connector })
})
