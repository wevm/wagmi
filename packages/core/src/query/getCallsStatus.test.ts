import { QueryClient } from '@tanstack/query-core'
import { accounts, config, testClient } from '@wagmi/test'
import { parseEther } from 'viem'
import { afterEach, expect, test } from 'vitest'

import { connect } from '../actions/connect.js'
import { disconnect } from '../actions/disconnect.js'
import { sendCalls } from '../actions/sendCalls.js'
import { getCallsStatusQueryOptions } from './getCallsStatus.js'

const queryClient = new QueryClient()

afterEach(() => queryClient.clear())

test('default', () => {
  expect(
    getCallsStatusQueryOptions(config, {
      id: '0x0000000000000000000000000000000000000000',
    }),
  ).toMatchInlineSnapshot(`
    {
      "enabled": false,
      "queryFn": [Function],
      "queryKey": [
        "callsStatus",
        {
          "id": "0x0000000000000000000000000000000000000000",
        },
      ],
    }
  `)
})

test('behavior: connector', async () => {
  const connector = config.connectors[0]!
  const connector2 = config.connectors[1]!
  await connect(config, { connector })
  const { id } = await sendCalls(config, {
    calls: [{ to: accounts[1], value: parseEther('1') }],
  })
  await testClient.mainnet.mine({ blocks: 1 })

  // calls were sent with `connector`, make a different connector current
  await connect(config, { connector: connector2 })
  expect(config.state.current).toBe(connector2.uid)

  const options = getCallsStatusQueryOptions(config, { connector, id })
  const { status } = await queryClient.fetchQuery(options)
  expect(status).toBe('success')

  await disconnect(config, { connector })
  await disconnect(config, { connector: connector2 })
})
