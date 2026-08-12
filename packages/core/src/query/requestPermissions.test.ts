import { accounts, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from '../actions/connect.js'
import { disconnect } from '../actions/disconnect.js'
import { requestPermissionsMutationOptions } from './requestPermissions.js'

const connector = config.connectors[0]!

test('default', () => {
  expect(requestPermissionsMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "requestPermissions",
      ],
    }
  `)
})

test('behavior: mutationFn', async () => {
  await connect(config, { connector })
  try {
    const options = requestPermissionsMutationOptions(config)
    await expect(
      options.mutationFn?.({
        connector,
        eth_accounts: {},
      }),
    ).resolves.toEqual([
      {
        caveats: [
          {
            type: 'filterResponse',
            value: accounts,
          },
        ],
        invoker: 'https://example.com',
        parentCapability: 'eth_accounts',
      },
    ])
  } finally {
    await disconnect(config, { connector })
  }
})
