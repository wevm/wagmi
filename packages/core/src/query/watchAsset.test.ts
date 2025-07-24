import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { watchAssetMutationOptions } from './watchAsset.js'

test('default', () => {
  expect(watchAssetMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "watchAsset",
      ],
    }
  `)
})
