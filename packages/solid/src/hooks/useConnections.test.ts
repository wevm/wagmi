import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/solid'
import { expect, test } from 'vitest'

import { useConnections } from './useConnections.js'

test('default', async () => {
  const { result } = renderHook(useConnections)

  expect(result).toEqual([])

  const connector = config.connectors[0]!
  await connect(config, { connector })

  expect(result.length).toBe(1)
  await disconnect(config, { connector })
})

test('parameters: config', () => {
  const { result } = renderHook(() => useConnections({ config }), {
    wrapper: undefined,
  })
  expect(result).toBeDefined()
})
