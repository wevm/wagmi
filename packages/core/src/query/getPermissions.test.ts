import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getPermissionsQueryOptions } from './getPermissions.js'

test('default', () => {
  expect(getPermissionsQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "permissions",
        {},
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getPermissionsQueryOptions(config, { chainId: chain.mainnet.id }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "permissions",
        {
          "chainId": 1,
        },
      ],
    }
  `)
})
