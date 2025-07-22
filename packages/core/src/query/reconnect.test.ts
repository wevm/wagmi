import { config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'

import { reconnectMutationOptions } from './reconnect.js'

test('default', () => {
  expect(reconnectMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "reconnect",
      ],
    }
  `)
})
