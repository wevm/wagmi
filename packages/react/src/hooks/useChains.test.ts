import { config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { Fragment, createElement } from 'react'
import { expect, test } from 'vitest'

import { useChains } from './useChains.js'

test('default', async () => {
  const { result } = renderHook(() => useChains())

  expect(result.current.map((x) => x.id)).toMatchInlineSnapshot(`
    [
      1,
      456,
      10,
    ]
  `)
})

test('parameters: config', () => {
  const { result } = renderHook(() => useChains({ config }), {
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
