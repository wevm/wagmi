import { mock } from '@wagmi/connectors'
import { accounts, config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { createElement, Fragment } from 'react'
import { expect, test } from 'vitest'

import { useConnectors } from './useConnectors.js'

test('default', async () => {
  const { result, rerender } = await renderHook(() => useConnectors())

  const count = config.connectors.length
  expect(result.current.length).toBe(count)
  expect(result.current).toEqual(config.connectors)

  config._internal.connectors.setState(() => [
    ...config.connectors,
    config._internal.connectors.setup(mock({ accounts })),
  ])
  rerender()

  expect(result.current.length).toBe(count + 1)
})

test('parameters: config', async () => {
  const { result } = await renderHook(() => useConnectors({ config }), {
    wrapper: ({ children }) => createElement(Fragment, { children }),
  })
  expect(result.current).toBeDefined()
})
