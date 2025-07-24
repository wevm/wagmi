import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { sendCallsMutationOptions } from './sendCalls.js'

test('default', () => {
  expect(sendCallsMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "sendCalls",
      ],
    }
  `)
})
