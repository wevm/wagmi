import { switchChain } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { createElement, Fragment } from 'react'
import { expect, test } from 'vitest'

import { usePublicClient } from './usePublicClient.js'

test('default', async () => {
  const { result, rerender } = await renderHook(() => usePublicClient())

  expect(result.current?.chain.id).toEqual(1)

  await switchChain(config, { chainId: 456 })
  rerender()

  expect(result.current?.chain.id).toEqual(456)
})

test('parameters: config', async () => {
  const { result } = await renderHook(() => usePublicClient({ config }), {
    wrapper: ({ children }) => createElement(Fragment, { children }),
  })
  expect(result.current).toBeDefined()
})

test('behavior: unconfigured chain', async () => {
  const { result } = await renderHook(() =>
    usePublicClient({ chainId: 123456 }),
  )
  expect(result.current).toBeUndefined()
})
