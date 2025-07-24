import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useEstimateFeesPerGas } from './useEstimateFeesPerGas.js'

test('default', async () => {
  const { result } = await renderHook(() => useEstimateFeesPerGas())

  await vi.waitUntil(() => result.current.isSuccess)

  expect(Object.keys(result.current.data!)).toMatchInlineSnapshot(`
    [
      "formatted",
      "gasPrice",
      "maxFeePerGas",
      "maxPriorityFeePerGas",
    ]
  `)
})
