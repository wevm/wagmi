import { connect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { beforeEach, expect, test, vi } from 'vitest'

import { useConnection } from './useConnection.js'
import { useDisconnect } from './useDisconnect.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  await connect(config, { connector })
})

test('default', async () => {
  const { result } = await renderHook(() => ({
    useConnection: useConnection(),
    useDisconnect: useDisconnect(),
  }))

  expect(result.current.useConnection.address).toBeDefined()
  expect(result.current.useConnection.status).toEqual('connected')

  result.current.useDisconnect.disconnect()

  await vi.waitFor(() =>
    expect(result.current.useConnection.isDisconnected).toBeTruthy(),
  )

  expect(result.current.useConnection.address).not.toBeDefined()
  expect(result.current.useConnection.status).toEqual('disconnected')
})
