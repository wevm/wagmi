import {
  act,
  mlootContractConfig,
  renderHook,
  wagmigotchiContractConfig,
} from '../../../test'
import { useContractRead } from './useContractRead'

describe('useContractRead', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      useContractRead({
        ...wagmigotchiContractConfig,
        functionName: 'love',
        args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
      }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internal, ...res } = result.current
    expect(res).toMatchInlineSnapshot(`
      {
        "data": {
          "hex": "0x02",
          "type": "BigNumber",
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
    it('chainId', async () => {
      const { result, waitFor } = renderHook(() =>
        useContractRead({
          ...wagmigotchiContractConfig,
          functionName: 'love',
          args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
          chainId: 1,
        }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": {
            "hex": "0x02",
            "type": "BigNumber",
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
        useContractRead({
          ...wagmigotchiContractConfig,
          functionName: 'love',
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
        useContractRead({
          ...wagmigotchiContractConfig,
          functionName: 'love',
          args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
          enabled: false,
        }),
      )

      await act(async () => {
        const { data } = await result.current.refetch()
        expect(data).toMatchInlineSnapshot(`
          {
            "hex": "0x02",
            "type": "BigNumber",
          }
        `)
      })
    })
  })

  describe('behavior', () => {
    it('can use multiple args', async () => {
      const { result, waitFor } = renderHook(() =>
        useContractRead({
          ...mlootContractConfig,
          functionName: 'tokenOfOwnerByIndex',
          args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0],
        }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": {
            "hex": "0x05a6db",
            "type": "BigNumber",
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
})
