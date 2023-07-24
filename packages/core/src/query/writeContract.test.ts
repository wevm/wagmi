import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

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
