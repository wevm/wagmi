import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useEstimateFeesPerGas } from './useEstimateFeesPerGas.js'

test('default', async () => {
  const { result } = await renderHook(() => useEstimateFeesPerGas())

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 5_000 })

  expect(Object.keys(result.current.data!)).toMatchInlineSnapshot(`
    [
      "gasPrice",
      "maxFeePerGas",
      "maxPriorityFeePerGas",
    ]
  `)
})
