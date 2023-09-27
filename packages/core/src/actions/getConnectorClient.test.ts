import { address, config } from '@wagmi/test'
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
    "Connector not connected.

    Version: @wagmi/core@x.y.z"
  `)
})

test('behavior: account does not exist on connector', async () => {
  await connect(config, { connector })
  await expect(
    getConnectorClient(config, { account: address.usdcHolder }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    "Account \\"0x5414d89a8bf7e99d732bc52f3e6a3ef461c0c078\\" not found for connector \\"Mock Connector\\".

    Version: @wagmi/core@x.y.z"
  `)
  await disconnect(config, { connector })
})
