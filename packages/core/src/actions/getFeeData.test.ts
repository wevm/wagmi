import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getFeeData } from './getFeeData.js'

test('default', async () => {
  const result = await getFeeData(config)
  expect(Object.keys(result)).toMatchInlineSnapshot(`
    [
      "lastBaseFeePerGas",
      "gasPrice",
      "maxFeePerGas",
      "maxPriorityFeePerGas",
      "formatted",
    ]
  `)
})
