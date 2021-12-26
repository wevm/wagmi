import { renderHook } from '../../../test'
import { useProvider } from './useProvider'

describe('useProvider', () => {
  it('inits', async () => {
    const { result } = renderHook(() => useProvider())
    expect(result.current).toBeDefined()
  })
})
