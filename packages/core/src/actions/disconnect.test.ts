import { accounts, config, testConnector } from '@wagmi/test'
import { beforeEach, describe, expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'

const connector = config._internal.setup(testConnector({ accounts }))

describe('disconnect', () => {
  beforeEach(async () => {
    await connect(config, { connector })
  })

  test('default', async () => {
    expect(config.state.status).toEqual('connected')
    await disconnect(config)
    expect(config.state.status).toEqual('disconnected')
  })

  test('parameters: connector', async () => {
    expect(config.state.status).toEqual('connected')
    await disconnect(config, { connector })
    expect(config.state.status).toEqual('disconnected')
  })

  test('behavior: not connected to connector', async () => {
    await disconnect(config)
    await expect(disconnect(config)).rejects.toMatchInlineSnapshot(
      '[Error: No connector found.]',
    )
  })

  test('behavior: connector passed not connected', async () => {
    const connector_ = config._internal.setup(testConnector({ accounts }))
    await expect(
      disconnect(config, { connector: connector_ }),
    ).rejects.toMatchInlineSnapshot('[Error: Connector not connected.]')
  })
})
