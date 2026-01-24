import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import * as React from 'react'
import { expect, test } from 'vitest'

import { useConnection } from './useConnection.js'

test('default', async () => {
  const { result, rerender } = await renderHook(() => useConnection())

  expect(result.current.address).not.toBeDefined()
  expect(result.current.status).toEqual('disconnected')

  await connect(config, { connector: config.connectors[0]! })
  rerender()

  expect(result.current.address).toBeDefined()
  expect(result.current.status).toEqual('connected')

  await disconnect(config)
})

test('parameters: config', async () => {
  const { result } = await renderHook(() => useConnection({ config }), {
    wrapper: ({ children }) =>
      React.createElement(React.Fragment, { children }),
  })
  expect(result.current).toBeDefined()
})
