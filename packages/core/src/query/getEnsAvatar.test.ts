import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getEnsAvatarQueryOptions } from './getEnsAvatar.js'

test('default', () => {
  expect(getEnsAvatarQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "enabled": false,
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
    getEnsAvatarQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "ensAvatar",
        {
          "chainId": 1,
        },
      ],
    }
  `)
})
