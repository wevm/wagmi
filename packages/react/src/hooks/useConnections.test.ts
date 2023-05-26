import { connect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { renderHook } from '../../test-utils.js'
import { useConnections } from './useConnections.js'

test('default', async () => {
  const { result, rerender } = renderHook(() => useConnections())

  expect(result.current).toEqual([])

  await connect(config, { connector: config.connectors[0]! })
  rerender()

  expect(result.current.length).toBe(1)
})
