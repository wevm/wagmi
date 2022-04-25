import { act, renderHook } from '../../../test'
import { useBalance } from './useBalance'

describe('useBalance', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      useBalance({ addressOrName: 'awkweb.eth' }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout: 5_000,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internal, ...res } = result.current
    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "decimals": 18,
          "formatted": "1.622080339908136684",
          "symbol": "ETH",
          "unit": "ether",
          "value": {
            "hex": "0x1682c979995e8eec",
            "type": "BigNumber",
          },
        },
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
      it('address', async () => {
        const { result, waitFor } = renderHook(() =>
          useBalance({
            addressOrName: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          }),
        )

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { internal, ...res } = result.current
        expect(res).toMatchInlineSnapshot(`
          {
            "data": {
              "decimals": 18,
              "formatted": "1.622080339908136684",
              "symbol": "ETH",
              "unit": "ether",
              "value": {
                "hex": "0x1682c979995e8eec",
                "type": "BigNumber",
              },
            },
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

      it('name', async () => {
        const { result, waitFor } = renderHook(() =>
          useBalance({
            addressOrName: 'medha.eth',
          }),
        )

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { internal, ...res } = result.current
        expect(res).toMatchInlineSnapshot(`
          {
            "data": {
              "decimals": 18,
              "formatted": "0.063903008095677776",
              "symbol": "ETH",
              "unit": "ether",
              "value": {
                "hex": "0xe30772819f2d50",
                "type": "BigNumber",
              },
            },
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
        useBalance({ chainId: 1, addressOrName: 'awkweb.eth' }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": {
            "decimals": 18,
            "formatted": "1.622080339908136684",
            "symbol": "ETH",
            "unit": "ether",
            "value": {
              "hex": "0x1682c979995e8eec",
              "type": "BigNumber",
            },
          },
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
        useBalance({
          addressOrName: 'moxey.eth',
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

    it('formatUnits', async () => {
      const { result, waitFor } = renderHook(() =>
        useBalance({ addressOrName: 'awkweb.eth', formatUnits: 'gwei' }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": {
            "decimals": 18,
            "formatted": "1622080339.908136684",
            "symbol": "ETH",
            "unit": "gwei",
            "value": {
              "hex": "0x1682c979995e8eec",
              "type": "BigNumber",
            },
          },
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

    it('token', async () => {
      const ensTokenAddress = '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72'
      const { result, waitFor } = renderHook(() =>
        useBalance({ addressOrName: 'awkweb.eth', token: ensTokenAddress }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": {
            "decimals": 18,
            "formatted": "445.85124391824564224",
            "symbol": "ENS",
            "unit": "ether",
            "value": {
              "hex": "0x182b6dd01f5d124000",
              "type": "BigNumber",
            },
          },
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

  describe('return value', () => {
    it('refetch', async () => {
      const { result } = renderHook(() =>
        useBalance({ enabled: false, addressOrName: 'worm.eth' }),
      )

      await act(async () => {
        const { data } = await result.current.refetch()
        expect(data).toMatchInlineSnapshot(`
          {
            "decimals": 18,
            "formatted": "2.540437289581808169",
            "symbol": "ETH",
            "unit": "ether",
            "value": {
              "hex": "0x234172414bae0a29",
              "type": "BigNumber",
            },
          }
        `)
      })
    })
  })

  describe('behavior', () => {
    it('does nothing when `addressOrName` is missing', async () => {
      const { result, waitFor } = renderHook(() => useBalance())

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
