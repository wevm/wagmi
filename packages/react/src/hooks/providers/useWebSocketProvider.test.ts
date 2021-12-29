import { renderHook } from '../../../test'
import { useWebSocketProvider } from './useWebSocketProvider'

describe('useWebSocketProvider', () => {
  it('inits', async () => {
    const { result } = renderHook(() => useWebSocketProvider())
    expect(result.current).toBeUndefined()
  })
})
