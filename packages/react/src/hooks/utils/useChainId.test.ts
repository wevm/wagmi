import { renderHook } from '../../../test'
import { useChainId } from './useChainId'

describe('useChainId', () => {
  it('mounts', async () => {
    const { result } = renderHook(() => useChainId())
    expect(result.current).toMatchInlineSnapshot(`31337`)
  })

  describe('args', () => {
    describe.each`
      chainId      | expected
      ${undefined} | ${31337}
      ${1}         | ${1}
      ${4}         | ${4}
      ${12345}     | ${31337}
    `('useChainId({ chainId: $chainId })', ({ chainId, expected }) => {
      it(`returns ${expected}`, () => {
        const { result } = renderHook(() => useChainId({ chainId }))
        expect(result.current).toEqual(expected)
      })
    })
  })
})
