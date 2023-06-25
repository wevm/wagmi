import { accounts, config, testConnector } from '@wagmi/test'
import { afterEach, describe, expect, test } from 'vitest'

import { connect } from '../connect.js'
import { disconnect } from '../disconnect.js'
import { reconnect, reconnectMutationOptions } from '../reconnect.js'

const connector = config._internal.setup(
  testConnector({
    accounts,
    features: { reconnect: true },
  }),
)

describe('reconnect', () => {
  afterEach(async () => {
    if (config.state.current === connector.uid)
      await disconnect(config, { connector })
    else if (config.state.current) await disconnect(config)
  })

  test('default', async () => {
    await expect(
      reconnect(config, { connectors: [connector] }),
    ).resolves.toStrictEqual([])
    expect(config.state.status).toEqual('disconnected')
  })

  test('parameters: connectors (Connector)', async () => {
    await connect(config, { connector })
    await expect(
      reconnect(config, { connectors: [connector] }),
    ).resolves.toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          accounts: expect.any(Array),
          chainId: expect.any(Number),
        }),
      ]),
    )
    expect(config.state.status).toEqual('connected')
  })

  test('parameters: connectors (CreateConnectorFn)', async () => {
    const connector = testConnector({
      accounts,
      features: { reconnect: true },
    })
    await connect(config, { connector })
    await expect(
      reconnect(config, { connectors: [connector] }),
    ).resolves.toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          accounts: expect.any(Array),
          chainId: expect.any(Number),
        }),
      ]),
    )
    expect(config.state.status).toEqual('connected')
  })

  test("behavior: doesn't reconnect if already reconnecting", async () => {
    const previousStatus = config.state.status
    config.setState((x) => ({ ...x, status: 'reconnecting' }))
    await expect(
      reconnect(config, { connectors: [connector] }),
    ).resolves.toStrictEqual([])
    config.setState((x) => ({ ...x, status: previousStatus }))
  })
})

describe('reconnectMutationOptions', () => {
  test('default', () => {
    expect(reconnectMutationOptions(config)).toMatchInlineSnapshot(`
      {
        "mutationFn": [Function],
        "mutationKey": [
          "reconnect",
          {
            "connectors": undefined,
          },
        ],
      }
    `)
  })

  test('parameters: connectors', () => {
    expect(
      reconnectMutationOptions(config, { connectors: [connector] }),
    ).toMatchObject(
      expect.objectContaining({
        mutationFn: expect.any(Function),
        mutationKey: [
          'reconnect',
          expect.objectContaining({
            connectors: expect.arrayContaining([expect.any(Object)]),
          }),
        ],
      }),
    )
  })
})
