import { address, config } from '@wagmi/test'
import type { Address } from 'viem'
import { expect, test } from 'vitest'
import type { Connector } from '../createConfig.js'
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
  const account =
    '0x95132632579b073D12a6673e18Ab05777a6B86f8'.toLowerCase() as Address
  const client = await getConnectorClient(config, { account })
  expect(client.account.address).toMatchInlineSnapshot(
    '"0x95132632579b073D12a6673e18Ab05777a6B86f8"',
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

test('behavior: connector is on different chain', async () => {
  await connect(config, { chainId: 1, connector })
  config.setState((state) => {
    const uid = state.current!
    const connection = state.connections.get(uid)!
    return {
      ...state,
      connections: new Map(state.connections).set(uid, {
        ...connection,
        chainId: 456,
      }),
    }
  })
  await expect(
    getConnectorClient(config, { account: address.usdcHolder }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ConnectorChainMismatchError: The current chain of the connector (id: 1) does not match the connection's chain (id: 456).

    Current Chain ID:  1
    Expected Chain ID: 456

    Version: @wagmi/core@x.y.z]
  `)
  await disconnect(config, { connector })
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

test('behavior: reconnecting', async () => {
  config.setState((state) => ({ ...state, status: 'reconnecting' }))
  const { id, name, type, uid } = connector
  await expect(
    getConnectorClient(config, {
      connector: {
        id,
        name,
        type,
        uid,
      } as unknown as Connector,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ConnectorUnavailableReconnectingError: Connector "Mock Connector" unavailable while reconnecting.

    Details: During the reconnection step, the only connector methods guaranteed to be available are: \`id\`, \`name\`, \`type\`, \`uid\`. All other methods are not guaranteed to be available until reconnection completes and connectors are fully restored. This error commonly occurs for connectors that asynchronously inject after reconnection has already started.
    Version: @wagmi/core@x.y.z]
  `)
  config.setState((state) => ({ ...state, status: 'disconnected' }))
})
