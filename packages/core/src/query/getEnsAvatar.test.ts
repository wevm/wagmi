import { config, testChains } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getEnsAvatarQueryOptions } from './getEnsAvatar.js'

test('default', () => {
  expect(getEnsAvatarQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "ensAvatar",
        {},
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getEnsAvatarQueryOptions(config, { chainId: testChains.anvil.id }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "ensAvatar",
        {
          "chainId": 123,
        },
      ],
    }
  `)
})
