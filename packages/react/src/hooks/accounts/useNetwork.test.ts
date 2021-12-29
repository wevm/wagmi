import { renderHook } from '../../../test'
import { useNetwork } from './useNetwork'

describe('useConnect', () => {
  describe('on mount', () => {
    it('not connected', async () => {
      const { result } = renderHook(() => useNetwork())
      expect(result.current[0]).toMatchInlineSnapshot(`
        {
          "data": {
            "chain": undefined,
            "chains": [],
          },
          "error": undefined,
          "loading": false,
        }
      `)
    })
  })
})
