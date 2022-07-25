import * as React from 'react'
import { describe, expect, it } from 'vitest'

import { act, renderHook } from '../../../test'
import { useForceUpdate } from './useForceUpdate'

function useForceUpdateWithCounter() {
  const counter = React.useRef(0)
  const forceUpdate = useForceUpdate()
  counter.current = counter.current + 1
  return { counter: counter.current, forceUpdate } as const
}

describe('useForceUpdate', () => {
  it('mounts', () => {
    const { result } = renderHook(() => useForceUpdate())
    expect(result.current).toMatchInlineSnapshot(`[Function]`)
  })

  describe('behavior', () => {
    it('forces update', () => {
      const { result } = renderHook(() => useForceUpdateWithCounter())
      expect(result.current.counter).toMatchInlineSnapshot(`1`)

      act(() => {
        result.current.forceUpdate()
      })

      expect(result.current.counter).toMatchInlineSnapshot(`2`)
    })
  })
})
