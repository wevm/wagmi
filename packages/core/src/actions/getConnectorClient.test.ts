import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getConnectorClient } from './getConnectorClient.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  await expect(getConnectorClient(config)).resolves.toBeDefined()
  await disconnect(config, { connector })
})

test('parameters: connector', async () => {
  const connector2 = config.connectors[1]!
  await connect(config, { connector })
  await connect(config, { connector: connector2 })
  await expect(getConnectorClient(config, { connector })).resolves.toBeDefined()
  await disconnect(config, { connector })
  await disconnect(config, { connector: connector2 })
})

test.todo('custom connector client')

test('behavior: not connected', async () => {
  await expect(
    getConnectorClient(config),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
      "Connector not found.

      Version: @wagmi/core@x.y.z"
    `)
})
