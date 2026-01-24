import { config } from '@wagmi/test'
import type { Address } from 'viem'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { watchConnection } from './watchConnection.js'

test('default', async () => {
  const connections: { address: Address | undefined; status: string }[] = []
  const unwatch = watchConnection(config, {
    onChange(data) {
      connections.push({ address: data.address, status: data.status })
    },
  })

  await connect(config, { connector: config.connectors[0]! })
  await disconnect(config)

  expect(connections).toMatchInlineSnapshot(`
      [
        {
          "address": undefined,
          "status": "connecting",
        },
        {
          "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
          "status": "connected",
        },
        {
          "address": undefined,
          "status": "disconnected",
        },
      ]
    `)

  unwatch()
})
