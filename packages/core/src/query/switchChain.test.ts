import { config, testChains } from '@wagmi/test'
import { expect, test } from 'vitest'

import { switchChainMutationOptions } from './switchChain.js'

test('default', () => {
  expect(
    switchChainMutationOptions(config, { chainId: testChains.anvil.id }),
  ).toMatchInlineSnapshot(`
    {
      "getVariables": [Function],
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
