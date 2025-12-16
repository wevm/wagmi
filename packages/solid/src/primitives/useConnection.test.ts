import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { expect, test } from 'vitest'

import { useConnection } from './useConnection.js'

test('default', async () => {
  const { result } = renderPrimitive(() => useConnection())

  expect(result().address).not.toBeDefined()
  expect(result().status).toEqual('disconnected')

  await connect(config, { connector: config.connectors[0]! })

  expect(result().address).toBeDefined()
  expect(result().status).toEqual('connected')

  await disconnect(config)
})

test('parameters: config', async () => {
  const { result } = renderPrimitive(() => useConnection(() => ({ config })), {
    wrapper: ({ children }) => children,
  })
  expect(result()).toBeDefined()
})
