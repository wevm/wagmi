import { describe, expect, it } from 'vitest'

import { renderHook } from '../../../test'
import { useChainId } from './useChainId'

describe('useChainId', () => {
  it('mounts', async () => {
    const { result } = renderHook(() => useChainId())
    expect(result.current).toMatchInlineSnapshot(`31337`)
  })

  describe('args', () => {
    describe.each([
      { chainId: undefined, expected: 31337 },
      { chainId: 1, expected: 1 },
      { chainId: 4, expected: 4 },
      { chainId: 12345, expected: 31337 },
    ])('useChainId({ chainId: $chainId })', ({ chainId, expected }) => {
      it(`returns ${expected}`, () => {
        const { result } = renderHook(() => useChainId({ chainId }))
        expect(result.current).toEqual(expected)
      })
    })
  })
})
