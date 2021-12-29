import { renderHook } from '../../../test'
import { useBalance } from './useBalance'

describe('useBalance', () => {
  it('skip', async () => {
    const { result } = renderHook(() => useBalance({ skip: true }))
    expect(result.current[0]).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": undefined,
        "loading": false,
      }
    `)
  })
})
