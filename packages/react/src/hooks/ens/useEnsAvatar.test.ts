import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { chain } from '@wagmi/core'

import { renderHook } from '../../../test'
import { useEnsAvatar } from './useEnsAvatar'

const handlers = [
  // nick.eth
  rest.get(
    'https://api.opensea.io/api/v1/metadata/0x495f947276749Ce646f68AC8c248420045cb7b5e/0x11ef687cfeb2e353670479f2dcc76af2bc6b3935000000000002c40000000001',
    (_req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          name: 'Nick Johnson',
          description: null,
          external_link: null,
          image:
            'https://lh3.googleusercontent.com/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE',
          animation_url: null,
        }),
      ),
  ),
]

const server = setupServer(...handlers)

describe('useEnsAvatar', () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest(req) {
        if (req.url.origin !== chain.hardhat.rpcUrls.default.toString())
          console.warn(
            `Found an unhandled ${req.method} request to ${req.url.href}`,
          )
      },
    }),
  )

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  describe('addressOrName', () => {
    it('has avatar', async () => {
      const { result, waitFor } = renderHook(() =>
        useEnsAvatar({
          addressOrName: 'nick.eth',
        }),
      )
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "fetching",
          "internal": {
            "dataUpdatedAt": 0,
            "errorUpdatedAt": 0,
            "failureCount": 0,
            "isFetchedAfterMount": false,
            "isLoadingError": false,
            "isPaused": false,
            "isPlaceholderData": false,
            "isPreviousData": false,
            "isRefetchError": false,
            "isStale": true,
            "remove": [Function],
          },
          "isError": false,
          "isFetched": false,
          "isFetching": true,
          "isIdle": false,
          "isLoading": true,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "loading",
        }
      `)

      await waitFor(() => result.current.isSuccess, { timeout: 5_000 })

      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": "https://lh3.googleusercontent.com/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE",
          "error": null,
          "fetchStatus": "idle",
          "internal": {
            "dataUpdatedAt": 1643673600000,
            "errorUpdatedAt": 0,
            "failureCount": 0,
            "isFetchedAfterMount": true,
            "isLoadingError": false,
            "isPaused": false,
            "isPlaceholderData": false,
            "isPreviousData": false,
            "isRefetchError": false,
            "isStale": false,
            "remove": [Function],
          },
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

    it('does not have avatar', async () => {
      const { result, waitFor } = renderHook(() =>
        useEnsAvatar({
          addressOrName: '0x5FE6C3F8d12D5Ad1480F6DC01D8c7864Aa58C523',
        }),
      )
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "fetching",
          "internal": {
            "dataUpdatedAt": 0,
            "errorUpdatedAt": 0,
            "failureCount": 0,
            "isFetchedAfterMount": false,
            "isLoadingError": false,
            "isPaused": false,
            "isPlaceholderData": false,
            "isPreviousData": false,
            "isRefetchError": false,
            "isStale": true,
            "remove": [Function],
          },
          "isError": false,
          "isFetched": false,
          "isFetching": true,
          "isIdle": false,
          "isLoading": true,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "loading",
        }
      `)

      await waitFor(() => result.current.isSuccess)

      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": null,
          "error": null,
          "fetchStatus": "idle",
          "internal": {
            "dataUpdatedAt": 1643673600000,
            "errorUpdatedAt": 0,
            "failureCount": 0,
            "isFetchedAfterMount": true,
            "isLoadingError": false,
            "isPaused": false,
            "isPlaceholderData": false,
            "isPreviousData": false,
            "isRefetchError": false,
            "isStale": false,
            "remove": [Function],
          },
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
  })

  describe('enabled', () => {
    it('is false', () => {
      const { result } = renderHook(() =>
        useEnsAvatar({
          addressOrName: 'meagher.eth',
          enabled: false,
        }),
      )
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "idle",
          "internal": {
            "dataUpdatedAt": 0,
            "errorUpdatedAt": 0,
            "failureCount": 0,
            "isFetchedAfterMount": false,
            "isLoadingError": false,
            "isPaused": false,
            "isPlaceholderData": false,
            "isPreviousData": false,
            "isRefetchError": false,
            "isStale": true,
            "remove": [Function],
          },
          "isError": false,
          "isFetched": false,
          "isFetching": false,
          "isIdle": true,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "loading",
        }
      `)
    })

    it('missing addressOrName', () => {
      const { result } = renderHook(() => useEnsAvatar())
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "fetchStatus": "idle",
          "internal": {
            "dataUpdatedAt": 0,
            "errorUpdatedAt": 0,
            "failureCount": 0,
            "isFetchedAfterMount": false,
            "isLoadingError": false,
            "isPaused": false,
            "isPlaceholderData": false,
            "isPreviousData": false,
            "isRefetchError": false,
            "isStale": true,
            "remove": [Function],
          },
          "isError": false,
          "isFetched": false,
          "isFetching": false,
          "isIdle": true,
          "isLoading": false,
          "isRefetching": false,
          "isSuccess": false,
          "refetch": [Function],
          "status": "loading",
        }
      `)
    })
  })
})
