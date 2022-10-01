import { BigNumber } from 'ethers'
import { describe, expect, it } from 'vitest'

import { act, renderHook, wagmigotchiContractConfig } from '../../../test'
import { useQueryFilter } from './useQueryFilter'

const eventsDataArgsSnapshot = `[
  {
    "args": [
      "0x27a69FfBa1E939DDcFEcC8c7e0f967b872BaC65C",
      {
        "hex": "0x01",
        "type": "BigNumber",
      },
    ],
  },
  {
    "args": [
      "0x27a69FfBa1E939DDcFEcC8c7e0f967b872BaC65C",
      {
        "hex": "0x01",
        "type": "BigNumber",
      },
    ],
  },
]`

const eventQuerySnapshot = `{
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
}`

describe('useQueryFilter', () => {
  it('mounts', async () => {
    const { result, waitFor } = renderHook(() =>
      useQueryFilter({
        ...wagmigotchiContractConfig,
        eventName: 'CaretakerLoved',
        args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
      }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout: 2000,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internal, data, ...res } = result.current
    expect(res).toMatchInlineSnapshot(eventQuerySnapshot)
    expect(data?.map(({ args }) => ({ args }))).toMatchInlineSnapshot(
      eventsDataArgsSnapshot,
    )
  })

  describe('configuration', () => {
    it('chainId', async () => {
      const { result, waitFor } = renderHook(() =>
        useQueryFilter({
          ...wagmigotchiContractConfig,
          eventName: 'CaretakerLoved',
          args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
          chainId: 1,
        }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
        timeout: 2000,
      })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, data, ...res } = result.current
      expect(res).toMatchInlineSnapshot(eventQuerySnapshot)
      expect(data?.map(({ args }) => ({ args }))).toMatchInlineSnapshot(
        eventsDataArgsSnapshot,
      )
    })

    it('block limits', async () => {
      const { result, waitFor } = renderHook(() =>
        useQueryFilter({
          ...wagmigotchiContractConfig,
          eventName: 'CaretakerLoved',
          args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
          fromBlockOrBlockhash: 13326489,
          toBlock: 13326489,
        }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
        timeout: 2000,
      })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, data, ...res } = result.current
      expect(res).toMatchInlineSnapshot(eventQuerySnapshot)
      expect(data?.map(({ args }) => ({ args }))).toMatchInlineSnapshot(`
        [
          {
            "args": [
              "0x27a69FfBa1E939DDcFEcC8c7e0f967b872BaC65C",
              {
                "hex": "0x01",
                "type": "BigNumber",
              },
            ],
          },
        ]
      `)
    })

    it('enabled', async () => {
      const { result, waitFor } = renderHook(() =>
        useQueryFilter({
          ...wagmigotchiContractConfig,
          eventName: 'CaretakerLoved',
          enabled: false,
          args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
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
        useQueryFilter({
          ...wagmigotchiContractConfig,
          eventName: 'CaretakerLoved',
          args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
          enabled: false,
        }),
      )

      await act(async () => {
        const { data } = await result.current.refetch()
        expect(data?.map(({ args }) => ({ args }))).toMatchInlineSnapshot(
          eventsDataArgsSnapshot,
        )
      })
    })
  })

  describe('behavior', () => {
    it('can use multiple args and block limits', async () => {
      const { result, waitFor } = renderHook(() =>
        useQueryFilter({
          ...wagmigotchiContractConfig,
          eventName: 'CaretakerLoved',
          args: [
            '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
            BigNumber.from(1),
          ],
          fromBlockOrBlockhash: 13209266,
          toBlock: 13326489,
        }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
        timeout: 2000,
      })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, data, ...res } = result.current
      expect(res).toMatchInlineSnapshot(eventQuerySnapshot)
      expect(data?.map(({ args }) => ({ args }))).toMatchInlineSnapshot(
        eventsDataArgsSnapshot,
      )
    })
  })
})
