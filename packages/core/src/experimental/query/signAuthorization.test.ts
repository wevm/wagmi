import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { signAuthorizationMutationOptions } from './signAuthorization.js'

test('default', () => {
  expect(signAuthorizationMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "signAuthorization",
      ],
    }
  `)
})
