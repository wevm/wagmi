import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { switchConnectionMutationOptions } from './switchConnection.js'

test('default', () => {
  expect(switchConnectionMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "switchConnection",
      ],
    }
  `)
})
