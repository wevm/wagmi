import { describe, expect, it } from 'vitest'

import { act, renderHook } from '../../../test'
import { useTransaction } from './useTransaction'

describe('useTransaction', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      useTransaction({
        hash: '0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b',
      }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, internal, ...res } = result.current
    expect(data?.hash).toMatchInlineSnapshot(
      '"0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b"',
    )
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
          transaction: useTransaction({
            hash: '0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b',
          }),
          transactionwithoutScopeKey: useTransaction({
            hash: '0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b',
            enabled: false,
          }),
          transactionwithScopeKey: useTransaction({
            hash: '0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b',
            scopeKey: 'wagmi',
            enabled: false,
          }),
        }
      })

      await waitFor(() =>
        expect(result.current.transaction.isSuccess).toBeTruthy(),
      )
      await waitFor(() =>
        expect(
          result.current.transactionwithoutScopeKey.isSuccess,
        ).toBeTruthy(),
      )
      await waitFor(() =>
        expect(result.current.transactionwithScopeKey.isIdle).toBeTruthy(),
      )
    })

    it('chainId', async () => {
      const { result, waitFor } = renderHook(() =>
        useTransaction({
          chainId: 1,
          hash: '0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b',
        }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, internal, ...res } = result.current
      expect(data?.hash).toMatchInlineSnapshot(
        '"0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b"',
      )
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
        useTransaction({
          enabled: false,
          hash: '0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b',
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
    it('refetch', async () => {
      const { result } = renderHook(() =>
        useTransaction({
          enabled: false,
          hash: '0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b',
        }),
      )

      await act(async () => {
        const { data } = await result.current.refetch()
        expect(data?.hash).toMatchInlineSnapshot(
          '"0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b"',
        )
      })
    })
  })
})
