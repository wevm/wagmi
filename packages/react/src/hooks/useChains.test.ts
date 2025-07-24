import { config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { createElement, Fragment } from 'react'
import { expect, test } from 'vitest'

import { useChains } from './useChains.js'

test('default', async () => {
  const { result } = await renderHook(() => useChains())

  expect(result.current.map((x) => x.id)).toMatchInlineSnapshot(`
    [
      1,
      456,
      10,
    ]
  `)
})

test('parameters: config', async () => {
  const { result } = await renderHook(() => useChains({ config }), {
    wrapper: ({ children }) => createElement(Fragment, { children }),
  })
  expect(result.current.map((x) => x.id)).toMatchInlineSnapshot(`
    [
      1,
      456,
      10,
    ]
  `)
})
