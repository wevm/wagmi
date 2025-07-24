import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getEnsTextQueryOptions } from './getEnsText.js'

test('default', () => {
  expect(
    getEnsTextQueryOptions(config, {
      name: 'wevm.eth',
      key: 'com.twitter',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "ensText",
        {
          "key": "com.twitter",
          "name": "wevm.eth",
        },
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getEnsTextQueryOptions(config, {
      chainId: chain.mainnet.id,
      name: 'wevm.eth',
      key: 'com.twitter',
    }),
  ).toMatchInlineSnapshot(`
    {
      "queryFn": [Function],
      "queryKey": [
        "ensText",
        {
          "chainId": 1,
          "key": "com.twitter",
          "name": "wevm.eth",
        },
      ],
    }
  `)
})
