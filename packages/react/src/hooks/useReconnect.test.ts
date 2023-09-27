import { mock } from '@wagmi/connectors'
import { connect, disconnect } from '@wagmi/core'
import { accounts, config } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { afterEach, expect, test } from 'vitest'

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
  const { result } = renderHook(() => useReconnect())

  expect(result.current.connectors).toBeDefined()

  result.current.reconnect()
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current.data).toStrictEqual([])
})

test('parameters: connectors (Connector)', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => useReconnect())

  expect(result.current.connectors).toBeDefined()

  result.current.reconnect({ connectors: [connector] })
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current.data).toMatchObject(
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

  const { result } = renderHook(() => useReconnect())

  expect(result.current.connectors).toBeDefined()

  result.current.reconnect({ connectors: [connector] })
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current.data).toMatchObject(
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
  const { result } = renderHook(() => useReconnect())
  await expect(
    result.current.reconnectAsync({ connectors: [connector] }),
  ).resolves.toStrictEqual([])
  config.setState((x) => ({ ...x, status: previousStatus }))
})
