import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { requestPermissionsMutationOptions } from './requestPermissions.js'

test('default', () => {
  expect(requestPermissionsMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "requestPermissions",
      ],
    }
  `)
})
