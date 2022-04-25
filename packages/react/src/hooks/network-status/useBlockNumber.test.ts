import { act, renderHook } from '../../../test'
import { useBlockNumber } from './useBlockNumber'

describe('useBlockNumber', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() => useBlockNumber())

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, internal, ...res } = result.current
    expect(typeof data === 'number').toBeTruthy()
    expect(res).toMatchInlineSnapshot(`
      {
        "error": null,
        "fetchStatus": "idle",
        "isError": false,
        "isFetched": true,
        "isFetching": false,
        "isIdle": false,
        "isLoading": false,
        "isRefetching": false,
        "isSuccess": true,
        "refetch": [Function],
        "status": "success",
      }
    `)
  })

  describe('configuration', () => {
    it('chainId', async () => {
      const { result, waitFor } = renderHook(() =>
        useBlockNumber({ chainId: 1 }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, internal, ...res } = result.current
      expect(typeof data === 'number').toBeTruthy()
      expect(res).toMatchInlineSnapshot(`
        {
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": true,
          "isFetching": false,
          "isIdle": false,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": true,
          "refetch": [Function],
          "status": "success",
        }
      `)
    })

    it('enabled', async () => {
      const { result, waitFor } = renderHook(() =>
        useBlockNumber({ enabled: false }),
      )

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": false,
          "isFetching": false,
          "isIdle": true,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "idle",
        }
      `)
    })
  })

  describe('return value', () => {
    it('refetch', async () => {
      const { result } = renderHook(() => useBlockNumber({ enabled: false }))

      await act(async () => {
        const { data } = await result.current.refetch()
        expect(typeof data === 'number').toBeTruthy()
      })
    })
  })
})
