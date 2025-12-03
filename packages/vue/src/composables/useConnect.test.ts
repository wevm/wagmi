import { disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { afterEach, expect, test } from 'vitest'
import { useConnect } from './useConnect.js'
import { useConnection } from './useConnection.js'
import { useConnectors } from './useConnectors.js'

const connector = config.connectors[0]!

afterEach(async () => {
  if (config.state.current === connector.uid)
    await disconnect(config, { connector })
})

test('default', async () => {
  const [connection] = renderComposable(() => useConnection())
  const [connect] = renderComposable(() => useConnect())
  const [connectors] = renderComposable(() => useConnectors())

  expect(connection.address.value).not.toBeDefined()
  expect(connection.status.value).toEqual('disconnected')

  connect.mutate({
    connector: connectors.value[0]!,
  })

  await waitFor(connection.isConnected, (isConnected) => Boolean(isConnected))

  expect(connection.address.value).toBeDefined()
  expect(connection.status.value).toEqual('connected')
})
