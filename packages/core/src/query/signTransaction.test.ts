import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { signTransactionMutationOptions } from './signTransaction.js'

test('default', () => {
  expect(signTransactionMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "signTransaction",
      ],
    }
  `)
})
