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
      accounts: expect.any(Array),
      chainId: expect.any(Number),
    }),
  )
})

test('parameters: chainId', async () => {
  const chainId = chain.mainnet2.id
  await expect(connect(config, { connector, chainId })).resolves.toMatchObject(
    expect.objectContaining({
      accounts: expect.any(Array),
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
      accounts: expect.any(Array),
      chainId: expect.any(Number),
    }),
  )
  await disconnect(config, { connector: connector_ })
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

test('behavior: connect already connected', async () => {
  await connect(config, { connector })
  await expect(connect(config, { connector })).rejects.toMatchInlineSnapshot(`
    [ConnectorAlreadyConnectedError: Connector already connected.

    Version: @wagmi/core@x.y.z]
  `)
  await disconnect(config, { connector })
})

test('parameters: siwe nonce', async () => {
  const nonce = 'test-nonce-123'
  const result = await connect(config, {
    connector,
    chainId: chain.mainnet.id,
    capabilities: {
      signInWithEthereum: {
        nonce,
        chainId: 1, // mainnet
      },
    },
  })

  expect(result).toMatchObject({
    accounts: expect.any(Array),
    chainId: expect.any(Number),
  })

  // If the connector supports SIWE, capabilities should be present
  if (result.capabilities?.signInWithEthereum) {
    expect(result.capabilities.signInWithEthereum).toMatchObject({
      signature: expect.any(String),
      message: expect.any(String),
    })
    expect(result.capabilities.signInWithEthereum.message).toContain(nonce)
  }

  await disconnect(config, { connector })
})

test('parameters: siwe with custom domain and uri', async () => {
  const nonce = 'test-nonce-456'
  const domain = 'example.com'
  const uri = 'https://example.com/auth'

  const result = await connect(config, {
    connector,
    chainId: chain.mainnet.id,
    capabilities: {
      signInWithEthereum: {
        nonce,
        chainId: 1, // mainnet
        domain,
        uri,
      },
    },
  })

  expect(result).toMatchObject({
    accounts: expect.any(Array),
    chainId: expect.any(Number),
  })

  // If the connector supports SIWE, capabilities should be present
  if (result.capabilities?.signInWithEthereum) {
    expect(result.capabilities.signInWithEthereum.message).toContain(domain)
    expect(result.capabilities.signInWithEthereum.message).toContain(uri)
  }

  await disconnect(config, { connector })
})
