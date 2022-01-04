import { actHook, renderHook } from '../../../test'
import { useBlockNumber } from './useBlockNumber'

describe('useBlockNumber', () => {
  describe('on mount', () => {
    it('fetches', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useBlockNumber())
      expect(result.current[0]).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": undefined,
          "loading": true,
        }
      `)
      await waitForNextUpdate()
      expect(result.current[0]).toMatchInlineSnapshot(`
        {
          "data": 13897897,
          "error": undefined,
          "loading": false,
        }
      `)
    })
  })

  it('skip', async () => {
    const { result } = renderHook(() => useBlockNumber({ skip: true }))
    expect(result.current[0]).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": undefined,
        "loading": false,
      }
    `)
  })

  it('getBlockNumber', async () => {
    const { result } = renderHook(() => useBlockNumber({ skip: true }))

    await actHook(async () => {
      const res = await result.current[1]()
      expect(res).toMatchInlineSnapshot(`
        {
          "data": 13897897,
          "error": undefined,
        }
      `)
    })
  })
})
