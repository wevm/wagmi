import { config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'

import { signMessageMutationOptions } from './signMessage.js'

test('default', () => {
  expect(signMessageMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "signMessage",
      ],
    }
  `)
})
