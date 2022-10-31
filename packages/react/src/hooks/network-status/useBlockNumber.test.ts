import { describe, expect, it } from 'vitest'

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
          blockNumber: useBlockNumber(),
          blockNumberwithoutScopeKey: useBlockNumber({
            enabled: false,
          }),
          blockNumberwithScopeKey: useBlockNumber({
            scopeKey: 'wagmi',
            enabled: false,
          }),
        }
      })

      await waitFor(() =>
        expect(result.current.blockNumber.isSuccess).toBeTruthy(),
      )
      await waitFor(() =>
        expect(
          result.current.blockNumberwithoutScopeKey.isSuccess,
        ).toBeTruthy(),
      )
      await waitFor(() =>
        expect(result.current.blockNumberwithScopeKey.isIdle).toBeTruthy(),
      )
    })

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

    it.todo('onBlock')
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
