import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { addChainMutationOptions } from './addChain.js'

test('default', () => {
  expect(addChainMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "addChain",
      ],
    }
  `)
})
