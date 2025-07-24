import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { writeContractsMutationOptions } from './writeContracts.js'

test('default', () => {
  expect(writeContractsMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "writeContracts",
      ],
    }
  `)
})
