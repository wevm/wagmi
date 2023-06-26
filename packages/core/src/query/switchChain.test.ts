import { config, testChains } from '@wagmi/test'
import { expect, test } from 'vitest'

import { switchChainMutationOptions } from './switchChain.js'

test('default', () => {
  expect(
    switchChainMutationOptions(config, { chainId: testChains.anvil.id }),
  ).toMatchInlineSnapshot(`
      {
        "mutationFn": [Function],
        "mutationKey": [
          "switchChain",
          {
            "chainId": 123,
          },
        ],
      }
    `)
})
