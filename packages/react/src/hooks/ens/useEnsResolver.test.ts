import { describe, expect, it } from 'vitest'

import { act, renderHook } from '../../../test'
import { useEnsResolver } from './useEnsResolver'

describe('useEnsResolver', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      useEnsResolver({ name: 'imhiring.eth' }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internal, ...res } = result.current
    expect(res).toMatchInlineSnapshot(`
      {
        "data": Resolver {
          "_resolvedAddress": undefined,
          "address": "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41",
          "name": "imhiring.eth",
          "provider": "<Provider network={1} />",
        },
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
          ensResolver: useEnsResolver({
            name: 'imhiring.eth',
          }),
          ensResolverwithoutScopeKey: useEnsResolver({
            name: 'imhiring.eth',
            enabled: false,
          }),
          ensResolverwithScopeKey: useEnsResolver({
            name: 'imhiring.eth',
            scopeKey: 'wagmi',
            enabled: false,
          }),
        }
      })

      await waitFor(() =>
        expect(result.current.ensResolver.isSuccess).toBeTruthy(),
      )
      await waitFor(() =>
        expect(
          result.current.ensResolverwithoutScopeKey.isSuccess,
        ).toBeTruthy(),
      )
      await waitFor(() =>
        expect(result.current.ensResolverwithScopeKey.isIdle).toBeTruthy(),
      )
    })

    it('chainId', async () => {
      const { result, waitFor } = renderHook(() =>
        useEnsResolver({ chainId: 1, name: 'awkweb.eth' }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": Resolver {
            "_resolvedAddress": undefined,
            "address": "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41",
            "name": "awkweb.eth",
            "provider": "<Provider network={1} />",
          },
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
        useEnsResolver({
          name: 'moxey.eth',
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

    describe('name', () => {
      it('has address', async () => {
        const { result, waitFor } = renderHook(() =>
          useEnsResolver({ name: 'awkweb.eth' }),
        )

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { internal, ...res } = result.current
        expect(res).toMatchInlineSnapshot(`
          {
            "data": Resolver {
              "_resolvedAddress": undefined,
              "address": "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41",
              "name": "awkweb.eth",
              "provider": "<Provider network={1} />",
            },
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

      it('does not have address', async () => {
        const { result, waitFor } = renderHook(() =>
          useEnsResolver({ name: 'awkweb123.eth' }),
        )

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { internal, ...res } = result.current
        expect(res).toMatchInlineSnapshot(`
          {
            "data": null,
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
  })

  describe('return value', () => {
    it('refetch', async () => {
      const { result } = renderHook(() =>
        useEnsResolver({ enabled: false, name: 'worm.eth' }),
      )

      await act(async () => {
        const { data } = await result.current.refetch()
        expect(data).toMatchInlineSnapshot(`
          Resolver {
            "_resolvedAddress": undefined,
            "address": "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41",
            "name": "worm.eth",
            "provider": "<Provider network={1} />",
          }
        `)
      })
    })
  })

  describe('behavior', () => {
    it('does nothing when `name` is missing', async () => {
      const { result, waitFor } = renderHook(() => useEnsResolver())

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
  })
})
