import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getPermissions } from './getPermissions.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  await expect(getPermissions(config)).resolves.toMatchInlineSnapshot(`
    [
      {
        "caveats": [
          {
            "type": "filterResponse",
            "value": [
              "0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb",
            ],
          },
        ],
        "invoker": "https://example.com",
        "parentCapability": "eth_accounts",
      },
    ]
  `)
  await disconnect(config, { connector })
})

test('parameters: connector', async () => {
  await connect(config, { connector })
  await expect(getPermissions(config, { connector })).resolves.toHaveLength(1)
  await disconnect(config, { connector })
})

test('behavior: not connected', async () => {
  await expect(getPermissions(config)).rejects.toMatchInlineSnapshot(`
    [ConnectorNotConnectedError: Connector not connected.

    Version: @wagmi/core@x.y.z]
  `)
})
