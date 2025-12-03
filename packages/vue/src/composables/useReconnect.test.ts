import { mock } from '@wagmi/connectors'
import { connect, disconnect } from '@wagmi/core'
import { accounts, config } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
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
  await connect(config, { connector })

  const [reconnect] = renderComposable(() => useReconnect())

  reconnect.mutate()
  await waitFor(reconnect.isSuccess)

  expect(reconnect.data.value).toStrictEqual([])
})

test('parameters: connectors (Connector)', async () => {
  await connect(config, { connector })

  const [reconnect] = renderComposable(() => useReconnect())

  reconnect.mutate({ connectors: [connector] })
  await waitFor(reconnect.isSuccess)

  expect(reconnect.data.value).toMatchObject(
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

  const [reconnect] = renderComposable(() => useReconnect())

  reconnect.mutate({ connectors: [connector] })
  await waitFor(reconnect.isSuccess)

  expect(reconnect.data.value).toMatchObject(
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

  const [reconnect] = renderComposable(() => useReconnect())

  await expect(
    reconnect.mutateAsync({ connectors: [connector] }),
  ).resolves.toStrictEqual([])
  config.setState((x) => ({ ...x, status: previousStatus }))
})
