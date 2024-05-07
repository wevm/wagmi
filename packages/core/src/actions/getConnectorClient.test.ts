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

test('behavior: account address is checksummed', async () => {
  await connect(config, { connector })
  const account = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
  const client = await getConnectorClient(config, { account })
  expect(client.account.address).toMatchInlineSnapshot(
    '"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"',
  )
  expect(client.account.address).not.toBe(account)
  await disconnect(config, { connector })
})

test('behavior: not connected', async () => {
  await expect(
    getConnectorClient(config),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ConnectorNotConnectedError: Connector not connected.

    Version: @wagmi/core@x.y.z]
  `)
})

test('behavior: account does not exist on connector', async () => {
  await connect(config, { connector })
  await expect(
    getConnectorClient(config, { account: address.usdcHolder }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ConnectorAccountNotFoundError: Account "0x5414d89a8bF7E99d732BC52f3e6A3Ef461c0C078" not found for connector "Mock Connector".

    Version: @wagmi/core@x.y.z]
  `)
  await disconnect(config, { connector })
})
