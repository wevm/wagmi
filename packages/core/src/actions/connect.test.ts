import { accounts, config, testChains, testConnector } from '@wagmi/test'
import { beforeEach, describe, expect, test } from 'vitest'

import { connect, connectMutationOptions } from './connect.js'
import { disconnect } from './disconnect.js'

const connector = config._internal.setup(testConnector({ accounts }))

describe('connect', () => {
  beforeEach(async () => {
    if (config.state.current === connector.uid)
      await disconnect(config, { connector })
  })

  test('default', async () => {
    await expect(connect(config, { connector })).resolves.toMatchObject(
      expect.objectContaining({
        accounts: expect.any(Array),
        chainId: expect.any(Number),
      }),
    )
  })

  test('parameters: chainId', async () => {
    const chainId = testChains.anvilTwo.id
    await expect(
      connect(config, { connector, chainId }),
    ).resolves.toMatchObject(
      expect.objectContaining({
        accounts: expect.any(Array),
        chainId,
      }),
    )
  })

  test('parameters: connector', async () => {
    const connector_ = config._internal.setup(testConnector({ accounts }))
    await expect(
      connect(config, { connector: connector_ }),
    ).resolves.toMatchObject(
      expect.objectContaining({
        accounts: expect.any(Array),
        chainId: expect.any(Number),
      }),
    )
    await disconnect(config, { connector: connector_ })
  })

  test('behavior: user rejected connect request', async () => {
    const connector_ = config._internal.setup(
      testConnector({
        accounts,
        features: { failConnect: true },
      }),
    )
    await expect(
      connect(config, { connector: connector_ }),
    ).rejects.toMatchInlineSnapshot(`
      [UserRejectedRequestError: User rejected the request.

      Details: Failed to connect.
      Version: viem@1.0.1]
    `)
  })

  test('behavior: already connected', async () => {
    await connect(config, { connector })
    await expect(connect(config, { connector })).rejects.toMatchInlineSnapshot(`
      [ConnectorAlreadyConnectedError: Connector already connected.

      Version: @wagmi/core@1.0.2]
    `)
  })
})

describe('connectMutationOptions', () => {
  test('default', () => {
    expect(connectMutationOptions(config, { connector })).toMatchObject(
      expect.objectContaining({
        mutationFn: expect.any(Function),
        mutationKey: [
          'connect',
          expect.objectContaining({
            connector: expect.any(Object),
          }),
        ],
      }),
    )
  })

  test('parameters: chainId', () => {
    expect(
      connectMutationOptions(config, {
        connector,
        chainId: testChains.anvil.id,
      }),
    ).toMatchObject(
      expect.objectContaining({
        mutationFn: expect.any(Function),
        mutationKey: [
          'connect',
          expect.objectContaining({
            connector: expect.any(Object),
          }),
        ],
      }),
    )
  })
})
