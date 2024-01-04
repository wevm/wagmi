import { connect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { beforeEach, expect, test } from 'vitest'

import { useAccount } from './useAccount.js'
import { useDisconnect } from './useDisconnect.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  await connect(config, { connector })
})

test('default', async () => {
  const { result } = renderHook(() => ({
    useAccount: useAccount(),
    useDisconnect: useDisconnect(),
  }))

  expect(result.current.useAccount.address).toBeDefined()
  expect(result.current.useAccount.status).toEqual('connected')

  result.current.useDisconnect.disconnect()

  await waitFor(() =>
    expect(result.current.useAccount.isDisconnected).toBeTruthy(),
  )

  expect(result.current.useAccount.address).not.toBeDefined()
  expect(result.current.useAccount.status).toEqual('disconnected')
})
