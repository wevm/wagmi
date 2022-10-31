import { describe, expect, it } from 'vitest'

import { act, renderHook } from '../../../test'
import { useFeeData } from './useFeeData'

describe('useFeeData', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() => useFeeData())

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, internal, ...res } = result.current
    expect(data).toBeDefined()
    expect(res).toMatchInlineSnapshot(`
      {
        "error": null,
        "fetchStatus": "idle",
        "isError": false,
        "isFetched": true,
        "isFetchedAfterMount": true,
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
    it('scopeKey', async () => {
      const { result, waitFor } = renderHook(() => {
        return {
          feeData: useFeeData(),
          feeDatawithoutScopeKey: useFeeData({
            enabled: false,
          }),
          feeDatawithScopeKey: useFeeData({
            scopeKey: 'wagmi',
            enabled: false,
          }),
        }
      })

      await waitFor(() => expect(result.current.feeData.isSuccess).toBeTruthy())
      await waitFor(() =>
        expect(result.current.feeDatawithoutScopeKey.isSuccess).toBeTruthy(),
      )
      await waitFor(() =>
        expect(result.current.feeDatawithScopeKey.isIdle).toBeTruthy(),
      )
    })

    it('chainId', async () => {
      const { result, waitFor } = renderHook(() => useFeeData({ chainId: 1 }))

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, internal, ...res } = result.current
      expect(data).toBeDefined()
      expect(res).toMatchInlineSnapshot(`
        {
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
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
        useFeeData({
          // set chainId to force new query key and skip cache
          chainId: 69,
          enabled: false,
        }),
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
          "isFetchedAfterMount": false,
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

    it('formatUnits', async () => {
      const { result, waitFor } = renderHook(() =>
        useFeeData({ formatUnits: 'kwei' }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, internal, ...res } = result.current
      expect(data).toBeDefined()
      expect(res).toMatchInlineSnapshot(`
        {
          "error": null,
          "fetchStatus": "idle",
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
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
  })

  describe('return value', () => {
    it('refetch', async () => {
      const { result } = renderHook(() => useFeeData({ enabled: false }))

      await act(async () => {
        const { data } = await result.current.refetch()
        expect(data).toBeDefined()
      })
    })
  })
})
