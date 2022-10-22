import { describe, expect, it } from 'vitest'

import { renderHook } from '../../../test'
import { useAllowance } from './useAllowance'

describe('useAllowance', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      useAllowance({
        ownerAddressOrName: '0x26C9De483aEE4Cf32f96DDD42f2fa64EF3CBfe54',
        spenderAddressOrName: '0xe892089198409Fe72DAB959Abe75Fa68292Efd2B',
        token: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
        formatUnits: 'mwei',
      }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout: 5_000,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internal, ...res } = result.current
    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "decimals": 6,
          "formatted": "10000.0",
          "symbol": "USDC",
          "value": {
            "type": "BigNumber",
            "hex": "0x02540be400"
          }
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
    describe('addressOrName', () => {
      it('address', async () => {
        const { result, waitFor } = renderHook(() =>
          useAllowance({
            ownerAddressOrName: '0x26C9De483aEE4Cf32f96DDD42f2fa64EF3CBfe54',
            spenderAddressOrName: '0xe892089198409Fe72DAB959Abe75Fa68292Efd2B',
            token: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
            formatUnits: 'mwei',
          }),
        )

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { internal, ...res } = result.current
        expect(res).toMatchInlineSnapshot(`
          {
            "data": {
              "decimals": 6,
              "formatted": "10000.0",
              "symbol": "USDC",
              "value": {
                "type": "BigNumber",
                "hex": "0x02540be400"
              }
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

      it('name', async () => {
        const { result, waitFor } = renderHook(() =>
          useAllowance({
            ownerAddressOrName: '0x26C9De483aEE4Cf32f96DDD42f2fa64EF3CBfe54',
            spenderAddressOrName: 'smakosh.eth',
            token: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
            formatUnits: 'mwei',
          }),
        )

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { internal, ...res } = result.current
        expect(res).toMatchInlineSnapshot(`
          {
            "data": {
              "decimals": 6,
              "formatted": "10000.0",
              "symbol": "USDC",
              "value": {
                "type": "BigNumber",
                "hex": "0x02540be400"
              }
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
    })

    it('enabled', async () => {
      const { result, waitFor } = renderHook(() =>
        useAllowance({
          ownerAddressOrName: '0x26C9De483aEE4Cf32f96DDD42f2fa64EF3CBfe54',
          spenderAddressOrName: 'smakosh.eth',
          token: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
          formatUnits: 'mwei',
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
})
