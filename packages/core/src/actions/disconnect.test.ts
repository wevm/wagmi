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
  await disconnect(config, { connector: connector_ })
})
