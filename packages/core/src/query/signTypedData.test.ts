import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { signTypedDataMutationOptions } from './signTypedData.js'

test('default', () => {
  expect(signTypedDataMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "signTypedData",
      ],
    }
  `)
})
