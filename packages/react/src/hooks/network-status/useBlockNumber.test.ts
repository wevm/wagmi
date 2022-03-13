import { actHook, renderHook } from '../../../test'
import { useBlockNumber } from './useBlockNumber'

describe('useBlockNumber', () => {
  describe('on mount', () => {
    it('fetches', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useBlockNumber())
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "isError": false,
          "isIdle": false,
          "isLoading": true,
          "isSuccess": false,
          "refetch": [Function],
          "status": "loading",
        }
      `)
      await waitForNextUpdate()
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": 14297676,
          "error": null,
          "isError": false,
          "isIdle": false,
          "isLoading": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
    })
  })

  it('skip', async () => {
    const { result } = renderHook(() => useBlockNumber({ enabled: false }))
    expect(result.current).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "error": null,
        "isError": false,
        "isIdle": true,
        "isLoading": false,
        "isSuccess": false,
        "refetch": [Function],
        "status": "idle",
      }
    `)
  })

  it('getBlockNumber', async () => {
    const { result } = renderHook(() => useBlockNumber({ enabled: false }))

    await actHook(async () => {
      await result.current.refetch()
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": 14297676,
          "error": null,
          "isError": false,
          "isIdle": false,
          "isLoading": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
    })
  })
})
