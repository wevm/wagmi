import { renderHook } from '../../../test'
import { useCancel } from './useCancel'

describe('useCancel', () => {
  it('defaults', () => {
    const { result } = renderHook(() => useCancel())
    expect(result.current).toBeDefined()
  })
})
