import { mock } from '@wagmi/connectors'
import { connect, disconnect } from '@wagmi/core'
import { accounts, config } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { afterEach, expect, test, vi } from 'vitest'

import { useReconnect } from './useReconnect.js'

const connector = config._internal.connectors.setup(
  mock({
    accounts,
    features: { reconnect: true },
  }),
)

afterEach(async () => {
  if (config.state.current) await disconnect(config)
})

test('default', async () => {
  const { result } = renderPrimitive(() => useReconnect())

  result.mutate()
  await vi.waitUntil(() => result.isSuccess, { timeout: 10_000 })

  expect(result.data).toStrictEqual([])
})

test('parameters: connectors (Connector)', async () => {
  await connect(config, { connector })

  const { result } = renderPrimitive(() => useReconnect())

  result.mutate({ connectors: [connector] })
  await vi.waitUntil(() => result.isSuccess, { timeout: 10_000 })

  expect(result.data).toMatchObject(
    expect.arrayContaining([
      expect.objectContaining({
        accounts: expect.any(Array),
        chainId: expect.any(Number),
      }),
    ]),
  )
})

test('parameters: connectors (CreateConnectorFn)', async () => {
  const connector = mock({
    accounts,
    features: { reconnect: true },
  })
  await connect(config, { connector })

  const { result } = renderPrimitive(() => useReconnect())

  result.mutate({ connectors: [connector] })
  await vi.waitUntil(() => result.isSuccess, { timeout: 10_000 })

  expect(result.data).toMatchObject(
    expect.arrayContaining([
      expect.objectContaining({
        accounts: expect.any(Array),
        chainId: expect.any(Number),
      }),
    ]),
  )
})

test("behavior: doesn't reconnect if already reconnecting", async () => {
  const previousStatus = config.state.status
  config.setState((x) => ({ ...x, status: 'reconnecting' }))
  const { result } = renderPrimitive(() => useReconnect())
  await expect(
    result.mutateAsync({ connectors: [connector] }),
  ).resolves.toStrictEqual([])
  config.setState((x) => ({ ...x, status: previousStatus }))
})
