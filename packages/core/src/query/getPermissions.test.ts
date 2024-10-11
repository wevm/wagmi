import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getPermissionsQueryOptions } from './getPermissions.js'

test('default', () => {
  expect(getPermissionsQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "getPermissions",
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
      "queryFn": [Function],
      "queryKey": [
        "getPermissions",
        {
          "chainId": 1,
        },
      ],
    }
  `)
})
