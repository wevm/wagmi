import { act, renderHook } from '../../../test'
import { useToken } from './useToken'

const ensTokenAddress = '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72'
const uniTokenAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

describe('useToken', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      useToken({
        address: ensTokenAddress,
      }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internal, ...res } = result.current
    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "address": "0xc18360217d8f7ab5e7c516566761ea12ce7f9d72",
          "decimals": 18,
          "symbol": "ENS",
          "totalSupply": {
            "formatted": "100000000.0",
            "value": {
              "hex": "0x52b7d2dcc80cd2e4000000",
              "type": "BigNumber",
            },
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
    describe('address', () => {
      it('has token', async () => {
        const { result, waitFor } = renderHook(() =>
          useToken({
            address: uniTokenAddress,
          }),
        )

        await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { internal, ...res } = result.current
        expect(res).toMatchInlineSnapshot(`
          {
            "data": {
              "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
              "decimals": 18,
              "symbol": "UNI",
              "totalSupply": {
                "formatted": "1000000000.0",
                "value": {
                  "hex": "0x033b2e3c9fd0803ce8000000",
                  "type": "BigNumber",
                },
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

      it('bogus token', async () => {
        const { result, waitFor } = renderHook(() =>
          useToken({
            address: '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
          }),
        )

        await waitFor(() => expect(result.current.isError).toBeTruthy())

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { internal, ...res } = result.current
        expect(res).toMatchInlineSnapshot(`
          {
            "data": undefined,
            "error": [Error: call revert exception [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method="symbol()", data="0x", errorArgs=null, errorName=null, errorSignature=null, reason=null, code=CALL_EXCEPTION, version=abi/5.6.1)],
            "fetchStatus": "idle",
            "isError": true,
            "isFetched": true,
            "isFetching": false,
            "isIdle": false,
            "isLoading": false,
            "isRefetching": false,
            "isSuccess": false,
            "refetch": [Function],
            "status": "error",
          }
        `)
      })
    })

    it('chainId', async () => {
      const { result, waitFor } = renderHook(() =>
        useToken({ address: ensTokenAddress, chainId: 1 }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": {
            "address": "0xc18360217d8f7ab5e7c516566761ea12ce7f9d72",
            "decimals": 18,
            "symbol": "ENS",
            "totalSupply": {
              "formatted": "100000000.0",
              "value": {
                "hex": "0x52b7d2dcc80cd2e4000000",
                "type": "BigNumber",
              },
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
      const { result, waitFor } = renderHook(() => useToken({ enabled: false }))

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
        useToken({ address: ensTokenAddress, formatUnits: 'wei' }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": {
            "address": "0xc18360217d8f7ab5e7c516566761ea12ce7f9d72",
            "decimals": 18,
            "symbol": "ENS",
            "totalSupply": {
              "formatted": "100000000000000000000000000",
              "value": {
                "hex": "0x52b7d2dcc80cd2e4000000",
                "type": "BigNumber",
              },
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
        useToken({ address: uniTokenAddress, enabled: false }),
      )

      await act(async () => {
        const { data } = await result.current.refetch()
        expect(data).toMatchInlineSnapshot(`
          {
            "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            "decimals": 18,
            "symbol": "UNI",
            "totalSupply": {
              "formatted": "1000000000.0",
              "value": {
                "hex": "0x033b2e3c9fd0803ce8000000",
                "type": "BigNumber",
              },
            },
          }
        `)
      })
    })
  })

  describe('behavior', () => {
    it('does nothing when `address` is missing', async () => {
      const { result, waitFor } = renderHook(() => useToken())

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
