import { accounts, chain, config } from '@wagmi/test'
import { beforeEach, expect, test } from 'vitest'

import { mock } from '../connectors/mock.js'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'

const connector = config._internal.connectors.setup(mock({ accounts }))

beforeEach(async () => {
  if (config.state.current === connector.uid)
    await disconnect(config, { connector })
})

test('default', async () => {
  await expect(connect(config, { connector })).resolves.toMatchObject(
    expect.objectContaining({
      accounts: expect.arrayContaining([expect.any(String)]),
      chainId: expect.any(Number),
    }),
  )
})

test('parameters: chainId', async () => {
  const chainId = chain.mainnet2.id
  await expect(connect(config, { connector, chainId })).resolves.toMatchObject(
    expect.objectContaining({
      accounts: expect.arrayContaining([expect.any(String)]),
      chainId,
    }),
  )
})

test('parameters: connector', async () => {
  const connector_ = config._internal.connectors.setup(mock({ accounts }))
  await expect(
    connect(config, { connector: connector_ }),
  ).resolves.toMatchObject(
    expect.objectContaining({
      accounts: expect.arrayContaining([expect.any(String)]),
      chainId: expect.any(Number),
    }),
  )
  await disconnect(config, { connector: connector_ })
})

test('parameters: withCapabilities', async () => {
  await expect(
    connect(config, { connector, withCapabilities: true }),
  ).resolves.toMatchObject(
    expect.objectContaining({
      accounts: expect.arrayContaining([
        expect.objectContaining({
          address: expect.any(String),
          capabilities: expect.objectContaining({
            foo: expect.objectContaining({ bar: expect.any(String) }),
          }),
        }),
      ]),
    }),
  )
})

test('behavior: user rejected request', async () => {
  const connector_ = config._internal.connectors.setup(
    mock({
      accounts,
      features: { connectError: true },
    }),
  )
  await expect(
    connect(config, { connector: connector_ }),
  ).rejects.toMatchInlineSnapshot(`
    [UserRejectedRequestError: User rejected the request.

    Details: Failed to connect.
    Version: viem@2.31.7]
  `)
})

test('behavior: already connected', async () => {
  await connect(config, { connector })
  await expect(connect(config, { connector })).rejects.toMatchInlineSnapshot(`
    [ConnectorAlreadyConnectedError: Connector already connected.

    Version: @wagmi/core@x.y.z]
  `)
})
