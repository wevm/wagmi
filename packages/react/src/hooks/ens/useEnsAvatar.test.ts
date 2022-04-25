import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { chain } from '@wagmi/core'

import { act, renderHook } from '../../../test'
import { useEnsAvatar } from './useEnsAvatar'

const handlers = [
  // brantly.eth
  rest.get(
    'https://wrappedpunks.com:3000/api/punks/metadata/2430',
    (_req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          title: 'W#2430',
          name: 'W#2430',
          description:
            'This Punk was wrapped using Wrapped Punks contract, accessible from https://wrappedpunks.com',
          image: 'https://api.wrappedpunks.com/images/punks/2430.png',
          external_url: 'https://wrappedpunks.com',
        }),
      ),
  ),
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

const timeout = 10_000

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

  jest.setTimeout(timeout)
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      useEnsAvatar({ addressOrName: 'nick.eth' }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internal, ...res } = result.current
    expect(res).toMatchInlineSnapshot(`
      {
        "data": "https://lh3.googleusercontent.com/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE",
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
    describe('addressOrName', () => {
      it('has avatar', async () => {
        const { result, waitFor } = renderHook(() =>
          useEnsAvatar({
            addressOrName: 'nick.eth',
          }),
        )

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
          timeout,
        })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { internal, ...res } = result.current
        expect(res).toMatchInlineSnapshot(`
          {
            "data": "https://lh3.googleusercontent.com/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE",
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

      it('does not have avatar', async () => {
        const { result, waitFor } = renderHook(() =>
          useEnsAvatar({
            addressOrName: '0x5FE6C3F8d12D5Ad1480F6DC01D8c7864Aa58C523',
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

    it('chainId', async () => {
      const { result, waitFor } = renderHook(() =>
        useEnsAvatar({
          addressOrName: 'nick.eth',
          chainId: 1,
        }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": "https://lh3.googleusercontent.com/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE",
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
        useEnsAvatar({
          addressOrName: 'brantly.eth',
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
        useEnsAvatar({
          addressOrName: 'nick.eth',
          enabled: false,
        }),
      )

      await act(async () => {
        const { data } = await result.current.refetch()
        expect(data).toMatchInlineSnapshot(
          `"https://lh3.googleusercontent.com/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE"`,
        )
      })
    })
  })

  describe('behavior', () => {
    it('does nothing when `addressOrName` is missing', async () => {
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
