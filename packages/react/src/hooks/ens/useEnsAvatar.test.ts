import { describe, expect, it } from 'vitest'

import { act, renderHook } from '../../../test'

import { useEnsAvatar } from './useEnsAvatar'

const timeout = 10_000

describe('useEnsAvatar', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      useEnsAvatar({ name: 'jxom.eth' }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internal, ...res } = result.current
    expect(res).toMatchInlineSnapshot(`
      {
        "data": "https://ipfs.io/ipfs/QmeZGc1CL3eb9QJatKXTGT7ekgLMq9FyZUWckQ4oWdc53a/2257.jpg",
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
    describe('address', () => {
      it('has avatar', async () => {
        const { result, waitFor } = renderHook(() =>
          useEnsAvatar({
            name: 'jxom.eth',
          }),
        )

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
          timeout,
        })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { internal, ...res } = result.current
        expect(res).toMatchInlineSnapshot(`
          {
            "data": "https://ipfs.io/ipfs/QmeZGc1CL3eb9QJatKXTGT7ekgLMq9FyZUWckQ4oWdc53a/2257.jpg",
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

      it('does not have avatar', async () => {
        const { result, waitFor } = renderHook(() =>
          useEnsAvatar({
            name: 'awkweb.eth',
          }),
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

    it('scopeKey', async () => {
      const { result, waitFor } = renderHook(() => {
        return {
          ensAvatar: useEnsAvatar({
            name: 'jxom.eth',
          }),
          ensAvatarwithoutScopeKey: useEnsAvatar({
            name: 'jxom.eth',
            enabled: false,
          }),
          ensAvatarwithScopeKey: useEnsAvatar({
            name: 'jxom.eth',
            scopeKey: 'wagmi',
            enabled: false,
          }),
        }
      })

      await waitFor(() =>
        expect(result.current.ensAvatar.isSuccess).toBeTruthy(),
      )
      await waitFor(() =>
        expect(result.current.ensAvatarwithoutScopeKey.isSuccess).toBeTruthy(),
      )
      await waitFor(() =>
        expect(result.current.ensAvatarwithScopeKey.isIdle).toBeTruthy(),
      )
    })

    it('chainId', async () => {
      const { result, waitFor } = renderHook(() =>
        useEnsAvatar({
          name: 'jxom.eth',
          chainId: 1,
        }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": "https://ipfs.io/ipfs/QmeZGc1CL3eb9QJatKXTGT7ekgLMq9FyZUWckQ4oWdc53a/2257.jpg",
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
        useEnsAvatar({
          name: 'jxom.eth',
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
  })

  describe('return value', () => {
    it(
      'refetch',
      async () => {
        const { result } = renderHook(() =>
          useEnsAvatar({
            name: 'jxom.eth',
            enabled: false,
          }),
        )

        await act(async () => {
          const { data } = await result.current.refetch()
          expect(data).toMatchInlineSnapshot(
            '"https://ipfs.io/ipfs/QmeZGc1CL3eb9QJatKXTGT7ekgLMq9FyZUWckQ4oWdc53a/2257.jpg"',
          )
        })
      },
      { retry: 3 },
    )
  })

  describe('behavior', () => {
    it(
      'does nothing when `address` is missing',
      async () => {
        const { result, waitFor } = renderHook(() => useEnsAvatar())

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
      },
      { retry: 3 },
    )
  })
})
