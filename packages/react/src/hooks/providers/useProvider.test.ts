import { renderHook } from '../../../test'
import { useProvider } from './useProvider'

describe('useProvider', () => {
  it('inits', async () => {
    const { result } = renderHook(() => useProvider())
    expect(result.current).toMatchInlineSnapshot(
      `"<Provider network={31337} />"`,
    )
  })

  it('chainId', async () => {
    const { result } = renderHook(() => useProvider({ chainId: 1 }))
    expect(result.current).toMatchInlineSnapshot(`"<Provider network={1} />"`)
  })
})
