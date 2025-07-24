import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { deployContractMutationOptions } from './deployContract.js'

test('default', () => {
  expect(deployContractMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "deployContract",
      ],
    }
  `)
})
