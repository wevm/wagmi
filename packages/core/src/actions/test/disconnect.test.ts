import { accounts, config, testConnector } from '@wagmi/test'
import { describe, expect, test } from 'vitest'

import { connect } from '../connect.js'
import { disconnect, disconnectMutationOptions } from '../disconnect.js'

const connector = config._internal.setup(testConnector({ accounts }))

describe('disconnect', () => {
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

      Version: @wagmi/core@1.0.2]
    `,
    )
  })

  test('behavior: connector passed not connected', async () => {
    await connect(config, { connector })
    const connector_ = config._internal.setup(testConnector({ accounts }))
    await expect(
      disconnect(config, { connector: connector_ }),
    ).rejects.toMatchInlineSnapshot(`
      [ConnectorNotFoundError: Connector not found.

      Version: @wagmi/core@1.0.2]
    `)
  })

  test('behavior: uses next connector on disconnect', async () => {
    const connector_ = config._internal.setup(testConnector({ accounts }))
    await connect(config, { connector: connector_ })
    await connect(config, { connector })

    expect(config.state.status).toEqual('connected')
    await disconnect(config, { connector })
    expect(config.state.status).toEqual('connected')
    await disconnect(config, { connector: connector_ })
  })
})

describe('disconnectMutationOptions', () => {
  test('default', () => {
    expect(disconnectMutationOptions(config)).toMatchInlineSnapshot(`
      {
        "mutationFn": [Function],
        "mutationKey": [
          "disconnect",
          {
            "connector": undefined,
          },
        ],
      }
    `)
  })

  test('parameters: connector', () => {
    expect(disconnectMutationOptions(config, { connector })).toMatchObject(
      expect.objectContaining({
        mutationFn: expect.any(Function),
        mutationKey: [
          'disconnect',
          expect.objectContaining({
            connector: expect.any(Object),
          }),
        ],
      }),
    )
  })
})
