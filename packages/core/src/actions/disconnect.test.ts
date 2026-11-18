import { accounts, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { mock } from '../connectors/mock.js'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'

const connector = config._internal.connectors.setup(mock({ accounts }))

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

test('behavior: uses next connector on disconnect', async () => {
  const connector_ = config._internal.connectors.setup(mock({ accounts }))
  await connect(config, { connector: connector_ })
  await connect(config, { connector })

  expect(config.state.status).toEqual('connected')
  await disconnect(config, { connector })
  expect(config.state.status).toEqual('connected')
  expect(config.state.current).toBe(connector_.uid)
  await disconnect(config, { connector: connector_ })
})

test('behavior: keeps current connector when disconnecting another connector', async () => {
  const connector1 = config._internal.connectors.setup(mock({ accounts }))
  const connector2 = config._internal.connectors.setup(mock({ accounts }))
  const connector3 = config._internal.connectors.setup(mock({ accounts }))
  await connect(config, { connector: connector1 })
  await connect(config, { connector: connector2 })
  await connect(config, { connector: connector3 })

  await disconnect(config, { connector: connector1 })

  expect(config.state.current).toBe(connector3.uid)
  expect(config.state.connections.has(connector1.uid)).toBe(false)

  await disconnect(config, { connector: connector2 })
  await disconnect(config, { connector: connector3 })
})
