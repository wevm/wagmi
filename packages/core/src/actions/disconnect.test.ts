import { accounts, config, testConnector } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'

const connector = config._internal.connectors.setup(testConnector({ accounts }))

test('default', async () => {
  await connect(config, { connector })
  expect(config.state.status).toEqual('connected')
  await disconnect(config)
  expect(config.state.status).toEqual('disconnected')
})

test('parameters: connector', async () => {
  await connect(config, { connector })
  expect(config.state.status).toEqual('connected')
  await disconnect(config, { connector })
  expect(config.state.status).toEqual('disconnected')
})

test('behavior: not connected to connector', async () => {
  await expect(disconnect(config)).rejects.toMatchInlineSnapshot(
    `
    [ConnectorNotFoundError: Connector not found.

    Version: @wagmi/core@x.y.z]
  `,
  )
})

test('behavior: connector passed not connected', async () => {
  await connect(config, { connector })
  const connector_ = config._internal.connectors.setup(
    testConnector({ accounts }),
  )
  await expect(
    disconnect(config, { connector: connector_ }),
  ).rejects.toMatchInlineSnapshot(`
    [ConnectorNotConnectedError: Connector not connected.

    Version: @wagmi/core@x.y.z]
  `)
})

test('behavior: uses next connector on disconnect', async () => {
  const connector_ = config._internal.connectors.setup(
    testConnector({ accounts }),
  )
  await connect(config, { connector: connector_ })
  await connect(config, { connector })

  expect(config.state.status).toEqual('connected')
  await disconnect(config, { connector })
  expect(config.state.status).toEqual('connected')
  await disconnect(config, { connector: connector_ })
})
