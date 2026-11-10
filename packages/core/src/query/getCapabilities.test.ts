import { QueryClient } from '@tanstack/query-core'
import { config } from '@wagmi/test'
import { afterEach, expect, test } from 'vitest'

import { connect } from '../actions/connect.js'
import { disconnect } from '../actions/disconnect.js'
import { getCapabilitiesQueryOptions } from './getCapabilities.js'

const queryClient = new QueryClient()

afterEach(() => queryClient.clear())

test('default', () => {
  expect(getCapabilitiesQueryOptions(config)).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "capabilities",
        {},
      ],
    }
  `)
})

test('parameters: chainId', () => {
  expect(
    getCapabilitiesQueryOptions(config, {
      account: '0x0000000000000000000000000000000000000000',
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "capabilities",
        {
          "account": "0x0000000000000000000000000000000000000000",
        },
      ],
    }
  `)
})

test('behavior: connector', async () => {
  const connector = config.connectors[0]!
  const connector2 = config.connectors[1]!
  await connect(config, { connector })
  await connect(config, { connector: connector2 })
  expect(config.state.current).toBe(connector2.uid)

  const options = getCapabilitiesQueryOptions(config, { connector })
  expect(options.queryKey[1].connectorUid).toBe(connector.uid)

  // mock connector only reports `paymasterService` support for its first
  // account, which differs between `connector` and `connector2`
  const capabilities = await queryClient.fetchQuery(options)
  expect(capabilities[8453]?.paymasterService).toEqual({ supported: true })

  await disconnect(config, { connector })
  await disconnect(config, { connector: connector2 })
})
