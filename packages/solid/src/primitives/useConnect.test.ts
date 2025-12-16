import { disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { afterEach, expect, test, vi } from 'vitest'
import { useConnect } from './useConnect.js'
import { useConnection } from './useConnection.js'
import { useConnectors } from './useConnectors.js'

const connector = config.connectors[0]!

afterEach(async () => {
  if (config.state.current === connector.uid)
    await disconnect(config, { connector })
})

test('default', async () => {
  const { result } = renderPrimitive(() => ({
    useConnection: useConnection(),
    useConnect: useConnect(),
    useConnectors: useConnectors(),
  }))

  expect(result.useConnection().address).not.toBeDefined()
  expect(result.useConnection().status).toEqual('disconnected')

  result.useConnect.mutate({
    connector: result.useConnectors()[0]!,
  })

  await vi.waitFor(() =>
    expect(result.useConnection().isConnected).toBeTruthy(),
  )

  expect(result.useConnection().address).toBeDefined()
  expect(result.useConnection().status).toEqual('connected')
})
