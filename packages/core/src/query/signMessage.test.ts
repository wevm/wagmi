import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { signMessageMutationOptions } from './signMessage.js'

test('default', () => {
  expect(
    signMessageMutationOptions(config, { message: 'foo bar baz' }),
  ).toMatchInlineSnapshot(`
      {
        "mutationFn": [Function],
        "mutationKey": [
          "signMessage",
          {
            "message": "foo bar baz",
          },
        ],
      }
    `)
})
