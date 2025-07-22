import { config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'

import { showCallsStatusMutationOptions } from './showCallsStatus.js'

test('default', () => {
  expect(showCallsStatusMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "showCallsStatus",
      ],
    }
  `)
})
