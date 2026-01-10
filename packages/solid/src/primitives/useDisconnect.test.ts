import { connect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { beforeEach, expect, test, vi } from 'vitest'

import { useConnection } from './useConnection.js'
import { useDisconnect } from './useDisconnect.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  await connect(config, { connector })
})

test('default', async () => {
  const { result } = renderPrimitive(() => ({
    useConnection: useConnection(),
    useDisconnect: useDisconnect(),
  }))

  expect(result.useConnection().address).toBeDefined()
  expect(result.useConnection().status).toEqual('connected')

  result.useDisconnect.mutate()

  await vi.waitFor(() =>
    expect(result.useConnection().isDisconnected).toBeTruthy(),
  )

  expect(result.useConnection().address).not.toBeDefined()
  expect(result.useConnection().status).toEqual('disconnected')
})
