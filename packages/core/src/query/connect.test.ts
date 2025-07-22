import { config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'

import { connectMutationOptions } from './connect.js'

test('default', () => {
  expect(connectMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "connect",
      ],
    }
  `)
})
