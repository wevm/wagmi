import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { sendCallsSyncMutationOptions } from './sendCallsSync.js'

test('default', () => {
  expect(sendCallsSyncMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "sendCallsSync",
      ],
    }
  `)
})
