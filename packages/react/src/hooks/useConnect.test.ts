import { disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
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
  const { result } = await renderHook(() => ({
    useConnection: useConnection(),
    useConnect: useConnect(),
    useConnectors: useConnectors(),
  }))

  expect(result.current.useConnection.address).not.toBeDefined()
  expect(result.current.useConnection.status).toEqual('disconnected')

  result.current.useConnect.mutate({
    connector: result.current.useConnectors[0]!,
  })

  await vi.waitFor(() =>
    expect(result.current.useConnection.isConnected).toBeTruthy(),
  )

  expect(result.current.useConnection.address).toBeDefined()
  expect(result.current.useConnection.status).toEqual('connected')
})
