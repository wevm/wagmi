import { config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { createElement, Fragment } from 'react'
import { expect, test } from 'vitest'

import { useChainId } from './useChainId.js'

test('default', async () => {
  const { result, rerender } = await renderHook(() => useChainId())

  expect(result.current).toMatchInlineSnapshot('1')

  config.setState((x) => ({ ...x, chainId: 456 }))
  rerender()

  expect(result.current).toMatchInlineSnapshot('456')
})

test('parameters: config', async () => {
  const { result } = await renderHook(() => useChainId({ config }), {
    wrapper: ({ children }) => createElement(Fragment, { children }),
  })
  expect(result.current).toBeDefined()
})
