import { renderHook } from '../../../test'
import { useAccount } from './useAccount'

describe('useAccount', () => {
  it('initial values', async () => {
    const { result } = renderHook(() => useAccount())
    const state = result.current[0]
    const disconnect = result.current[1]
    expect(state).toEqual({
      address: undefined,
      data: undefined,
      loading: false,
      connector: undefined,
    })
    expect(disconnect).toBeDefined()
  })
})
