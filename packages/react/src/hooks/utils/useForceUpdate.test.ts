import { renderHook } from '../../../test'
import { useForceUpdate } from './useForceUpdate'

describe('useForceUpdate', () => {
  it('inits', () => {
    const { result } = renderHook(() => useForceUpdate())
    expect(result.current).toMatchInlineSnapshot(`[Function]`)
  })
})
