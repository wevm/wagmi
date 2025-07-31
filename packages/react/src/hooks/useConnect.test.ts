import { disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { afterEach, expect, test, vi } from 'vitest'

import { useAccount } from './useAccount.js'
import { useConnect } from './useConnect.js'

const connector = config.connectors[0]!

afterEach(async () => {
  if (config.state.current === connector.uid)
    await disconnect(config, { connector })
})

test('default', async () => {
  const { result } = await renderHook(() => ({
    useAccount: useAccount(),
    useConnect: useConnect(),
  }))

  expect(result.current.useAccount.address).not.toBeDefined()
  expect(result.current.useAccount.status).toEqual('disconnected')

  result.current.useConnect.connect({
    connector: result.current.useConnect.connectors[0]!,
  })

  await vi.waitFor(() =>
    expect(result.current.useAccount.isConnected).toBeTruthy(),
  )

  expect(result.current.useAccount.address).toBeDefined()
  expect(result.current.useAccount.status).toEqual('connected')
})
