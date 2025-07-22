import { config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'

import { estimateFeesPerGas } from './estimateFeesPerGas.js'

test('default', async () => {
  const result = await estimateFeesPerGas(config)
  expect(Object.keys(result)).toMatchInlineSnapshot(`
    [
      "formatted",
      "gasPrice",
      "maxFeePerGas",
      "maxPriorityFeePerGas",
    ]
  `)
})
