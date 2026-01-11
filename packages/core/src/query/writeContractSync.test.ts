import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { writeContractSyncMutationOptions } from './writeContractSync.js'

test('default', () => {
  expect(writeContractSyncMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "writeContractSync",
      ],
    }
  `)
})
