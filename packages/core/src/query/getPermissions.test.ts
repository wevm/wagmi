import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from '../actions/connect.js'
import { disconnect } from '../actions/disconnect.js'
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
      "structuralSharing": [Function],
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
      "structuralSharing": [Function],
    }
  `)
})

test('queryFn', async () => {
  const connector = config.connectors[0]!
  await connect(config, { connector })
  try {
    const options = getPermissionsQueryOptions(config, {
      chainId: chain.mainnet.id,
      connector,
      scopeKey: 'foo',
    })
    await expect(
      options.queryFn({ queryKey: options.queryKey } as never),
    ).resolves.toHaveLength(1)
    expect(options.queryKey).toEqual([
      'permissions',
      { chainId: 1, connectorUid: connector.uid, scopeKey: 'foo' },
    ])
  } finally {
    await disconnect(config, { connector })
  }
})

test('queryFn: connector is required', async () => {
  const options = getPermissionsQueryOptions(config)
  await expect(
    options.queryFn({ queryKey: options.queryKey } as never),
  ).rejects.toThrowError('connector is required')
})
