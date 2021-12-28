import { renderHook } from '../../../test'
import { useCacheBuster } from './useCacheBuster'

describe('useCacheBuster', () => {
  it('defaults', () => {
    const { result } = renderHook(() => useCacheBuster())
    expect(result.current).toEqual(1)
  })
})
