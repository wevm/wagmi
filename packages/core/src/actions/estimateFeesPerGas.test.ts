import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { estimateFeesPerGas } from './estimateFeesPerGas.js'

test('default', async () => {
  const result = await estimateFeesPerGas(config)
  expect(Object.keys(result)).toMatchInlineSnapshot(`
    [
      "gasPrice",
      "maxFeePerGas",
      "maxPriorityFeePerGas",
    ]
  `)
})
