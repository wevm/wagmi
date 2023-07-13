import { describe, expect, it } from 'vitest'

import { act, renderHook } from '../../../test'
import { useEnsText } from './useEnsText'

describe('useEnsText', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      useEnsText({ name: 'ens.eth', key: 'com.twitter' }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout: 5_000,
    })

    const { internal: _, ...res } = result.current
    expect(res).toMatchInlineSnapshot(`
      {
        "data": "ensdomains",
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
    describe('textRecord', () => {
      it('has record', async () => {
        const { result, waitFor } = renderHook(() =>
          useEnsText({ name: 'ens.eth', key: 'com.twitter' }),
        )

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        const { internal: _, ...res } = result.current
        expect(res).toMatchInlineSnapshot(`
          {
            "data": "ensdomains",
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

      it('no result', async () => {
        const { result, waitFor } = renderHook(() =>
          useEnsText({ name: 'ens.eth', key: 'emptykey' }),
        )

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        const { internal: _, ...res } = result.current
        expect(res.data).toMatchInlineSnapshot('null')
      })
    })

    it('scopeKey', async () => {
      const { result, waitFor } = renderHook(() => {
        return {
          ensName: useEnsText({
            name: 'ens.eth',
            key: 'com.twitter',
          }),
          ensNamewithoutScopeKey: useEnsText({
            name: 'ens.eth',
            key: 'com.twitter',
            enabled: false,
          }),
          ensNamewithScopeKey: useEnsText({
            name: 'ens.eth',
            key: 'com.twitter',
            scopeKey: 'wagmi',
            enabled: false,
          }),
        }
      })

      await waitFor(() => expect(result.current.ensName.isSuccess).toBeTruthy())
      await waitFor(() =>
        expect(result.current.ensNamewithoutScopeKey.isSuccess).toBeTruthy(),
      )
      await waitFor(() =>
        expect(result.current.ensNamewithScopeKey.isIdle).toBeTruthy(),
      )
    })

    it('chainId', async () => {
      const { result, waitFor } = renderHook(() =>
        useEnsText({
          name: 'ens.eth',
          key: 'com.twitter',
          chainId: 1,
        }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      const { internal: _, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": "ensdomains",
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
        useEnsText({
          name: 'ens.eth',
          enabled: false,
        }),
      )

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      const { internal: _, ...res } = result.current
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
  })

  describe('return value', () => {
    it('refetch', async () => {
      const { result } = renderHook(() =>
        useEnsText({
          name: 'ens.eth',
          key: 'com.twitter',
          enabled: false,
        }),
      )

      await act(async () => {
        const { data } = await result.current.refetch()
        expect(data).toMatchInlineSnapshot('"ensdomains"')
      })
    })
  })

  describe('behavior', () => {
    it('does nothing when all params missing', async () => {
      const { result, waitFor } = renderHook(() => useEnsText())

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      const { internal: _, ...res } = result.current
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

    it('does nothing when `name` is missing', async () => {
      const { result, waitFor } = renderHook(() =>
        useEnsText({ key: 'com.twitter' }),
      )

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      const { internal: _, ...res } = result.current
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

    it('does nothing when `key` is missing', async () => {
      const { result, waitFor } = renderHook(() =>
        useEnsText({ name: 'ens.eth' }),
      )

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      const { internal: _, ...res } = result.current
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
  })
})
