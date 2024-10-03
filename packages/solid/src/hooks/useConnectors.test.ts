import { mock } from '@wagmi/connectors'
import { accounts, config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/solid'
import { expect, test } from 'vitest'

import { useConnectors } from './useConnectors.js'

test('default', async () => {
  const { result } = renderHook(() => useConnectors())

  const count = config.connectors.length
  expect(result.length).toBe(count)
  expect(result).toEqual(config.connectors)

  config._internal.connectors.setState(() => [
    ...config.connectors,
    config._internal.connectors.setup(mock({ accounts })),
  ])

  expect(result.length).toBe(count + 1)
})

test('parameters: config', () => {
  const { result } = renderHook(() => useConnectors({ config }), {
    wrapper: undefined,
  })
  expect(result).toBeDefined()
})
