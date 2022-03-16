import { renderHook } from '../../../test'
import { useCancel } from './useCancel'

describe.skip('useCancel', () => {
  it('defaults', () => {
    const { result } = renderHook(() => useCancel())
    expect(result.current).toBeDefined()
  })
})
