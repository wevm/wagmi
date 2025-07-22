import { config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'

import { switchChainMutationOptions } from './switchChain.js'

test('default', () => {
  expect(switchChainMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "switchChain",
      ],
    }
  `)
})
