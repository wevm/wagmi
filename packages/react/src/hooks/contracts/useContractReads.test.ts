import {
  act,
  mlootContractConfig,
  renderHook,
  wagmigotchiContractConfig,
} from '../../../test'
import { UseContractReadsConfig, useContractReads } from './useContractReads'

const contracts: UseContractReadsConfig['contracts'] = [
  {
    ...wagmigotchiContractConfig,
    functionName: 'love',
    args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
  },
  {
    ...wagmigotchiContractConfig,
    functionName: 'love',
    args: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
  },
  { ...wagmigotchiContractConfig, functionName: 'getAlive' },
  {
    ...mlootContractConfig,
    functionName: 'tokenOfOwnerByIndex',
    args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0],
  },
]

describe('useContractRead', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      useContractReads({ contracts }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internal, ...res } = result.current
    expect(res).toMatchInlineSnapshot(`
      {
        "data": [
          {
            "hex": "0x02",
            "type": "BigNumber",
          },
          {
            "hex": "0x01",
            "type": "BigNumber",
          },
          false,
          {
            "hex": "0x05a6db",
            "type": "BigNumber",
          },
        ],
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
        useContractReads({
          contracts: contracts.map((contract) => ({ ...contract, chainId: 1 })),
        }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": [
            {
              "hex": "0x02",
              "type": "BigNumber",
            },
            {
              "hex": "0x01",
              "type": "BigNumber",
            },
            false,
            {
              "hex": "0x05a6db",
              "type": "BigNumber",
            },
          ],
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
        useContractReads({ contracts, enabled: false }),
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
        useContractReads({ contracts, enabled: false }),
      )

      await act(async () => {
        const { data } = await result.current.refetch()
        expect(data).toMatchInlineSnapshot(`
          [
            {
              "hex": "0x02",
              "type": "BigNumber",
            },
            {
              "hex": "0x01",
              "type": "BigNumber",
            },
            false,
            {
              "hex": "0x05a6db",
              "type": "BigNumber",
            },
          ]
        `)
      })
    })
  })
})
