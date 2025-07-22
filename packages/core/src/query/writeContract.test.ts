import { config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'

import { writeContractMutationOptions } from './writeContract.js'

test('default', () => {
  expect(writeContractMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "writeContract",
      ],
    }
  `)
})
