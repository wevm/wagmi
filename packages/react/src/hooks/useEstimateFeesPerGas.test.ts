import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useEstimateFeesPerGas } from './useEstimateFeesPerGas.js'

test('default', async () => {
  const { result } = renderHook(() => useEstimateFeesPerGas())

  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(Object.keys(result.current.data!)).toMatchInlineSnapshot(`
    [
      "formatted",
      "gasPrice",
      "maxFeePerGas",
      "maxPriorityFeePerGas",
    ]
  `)
})
