import { renderHook } from '../../../test'
import { useChainId } from './useChainId'

describe('useChainId', () => {
  it('inits', async () => {
    const { result } = renderHook(() => useChainId())
    expect(result.current).toMatchInlineSnapshot(`31337`)
  })
})
