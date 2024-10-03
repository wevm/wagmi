import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/solid'
import { expect, test } from 'vitest'

import { useAccount } from './useAccount.js'

test('default', async () => {
  const { result } = renderHook(() => useAccount())

  expect(result.address).not.toBeDefined()
  expect(result.status).toEqual('disconnected')

  await connect(config, { connector: config.connectors[0]! })

  expect(result.address).toBeDefined()
  expect(result.status).toEqual('connected')

  await disconnect(config)
})

test('parameters: config', () => {
  const { result } = renderHook(() => useAccount({ config }), {
    wrapper: undefined,
  })
  expect(result).toBeDefined()
})
