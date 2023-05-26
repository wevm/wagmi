import { connect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { renderHook } from '../../test-utils.js'
import { useAccount } from './useAccount.js'

test('default', async () => {
  const { result, rerender } = renderHook(() => useAccount())

  expect(result.current.address).not.toBeDefined()
  expect(result.current.status).toEqual('disconnected')

  await connect(config, { connector: config.connectors[0]! })
  rerender()

  expect(result.current.address).toBeDefined()
  expect(result.current.status).toEqual('connected')
})
