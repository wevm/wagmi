import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { act, renderHook } from '../../../test'
import { foundry } from '../../chains'

import { useEnsAvatar } from './useEnsAvatar'

const handlers = [
  // brantly.eth
  // 0x983110309620d911731ac0932219af06091b6744
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
  // 0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5
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
        if (req.url.origin !== foundry.rpcUrls.default.http[0])
          console.warn(
            `Found an unhandled ${req.method} request to ${req.url.href}`,
          )
      },
    }),
  )

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      useEnsAvatar({ address: '0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5' }),
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
            address: '0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5',
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
            address: '0x5FE6C3F8d12D5Ad1480F6DC01D8c7864Aa58C523',
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
            address: '0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5',
          }),
          ensAvatarwithoutScopeKey: useEnsAvatar({
            address: '0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5',
            enabled: false,
          }),
          ensAvatarwithScopeKey: useEnsAvatar({
            address: '0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5',
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
          address: '0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5',
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
          address: '0x983110309620d911731ac0932219af06091b6744',
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
    it('refetch', async () => {
      const { result } = renderHook(() =>
        useEnsAvatar({
          address: '0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5',
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
    it('does nothing when `address` is missing', async () => {
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
    })
  })
})
