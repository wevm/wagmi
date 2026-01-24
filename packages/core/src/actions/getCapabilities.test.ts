import { accounts, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getCapabilities } from './getCapabilities.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  const capabilities = await getCapabilities(config)
  expect(capabilities).toMatchInlineSnapshot(`
    {
      "8453": {
        "paymasterService": {
          "supported": true,
        },
        "sessionKeys": {
          "supported": true,
        },
      },
      "84532": {
        "paymasterService": {
          "supported": true,
        },
      },
    }
  `)
  await disconnect(config, { connector })
})

test('args: account', async () => {
  await connect(config, { connector })
  const capabilities = await getCapabilities(config, {
    account: accounts[1],
  })
  expect(capabilities).toMatchInlineSnapshot(`
    {
      "8453": {
        "paymasterService": {
          "supported": false,
        },
        "sessionKeys": {
          "supported": true,
        },
      },
      "84532": {
        "paymasterService": {
          "supported": false,
        },
      },
    }
  `)
  await disconnect(config, { connector })
})

test('behavior: not connected', async () => {
  await expect(getCapabilities(config)).rejects.toMatchInlineSnapshot(`
    [ConnectorNotConnectedError: Connector not connected.

    Version: @wagmi/core@x.y.z]
  `)
})
