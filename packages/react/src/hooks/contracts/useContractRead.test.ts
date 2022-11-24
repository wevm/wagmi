import type { ResolvedConfig } from 'abitype'
import { BigNumber } from 'ethers'
import { assertType, describe, expect, it } from 'vitest'

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
        args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
      }),
    )

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { internal, ...res } = result.current
    assertType<ResolvedConfig['BigIntType'] | undefined>(res.data)
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
    it('chainId', async () => {
      const { result, waitFor } = renderHook(() =>
        useContractRead({
          ...wagmigotchiContractConfig,
          functionName: 'love',
          args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
          chainId: 1,
        }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      assertType<ResolvedConfig['BigIntType'] | undefined>(res.data)
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

    it('scopeKey', async () => {
      const { result, waitFor } = renderHook(() => {
        return {
          contractRead: useContractRead({
            ...wagmigotchiContractConfig,
            functionName: 'love',
            args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
            chainId: 1,
          }),
          contractReadwithoutScopeKey: useContractRead({
            ...wagmigotchiContractConfig,
            functionName: 'love',
            args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
            chainId: 1,
            enabled: false,
          }),
          contractReadwithScopeKey: useContractRead({
            ...wagmigotchiContractConfig,
            functionName: 'love',
            args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
            chainId: 1,
            scopeKey: 'wagmi',
            enabled: false,
          }),
        }
      })

      await waitFor(() =>
        expect(result.current.contractRead.isSuccess).toBeTruthy(),
      )
      await waitFor(() =>
        expect(
          result.current.contractReadwithoutScopeKey.isSuccess,
        ).toBeTruthy(),
      )
      await waitFor(() =>
        expect(result.current.contractReadwithScopeKey.isIdle).toBeTruthy(),
      )
    })

    it('enabled', async () => {
      const { result, waitFor } = renderHook(() =>
        useContractRead({
          ...wagmigotchiContractConfig,
          functionName: 'love',
          enabled: false,
          args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
        }),
      )

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      assertType<ResolvedConfig['BigIntType'] | undefined>(res.data)
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
        useContractRead({
          ...wagmigotchiContractConfig,
          functionName: 'love',
          args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
          enabled: false,
        }),
      )

      await act(async () => {
        const { data } = await result.current.refetch()
        assertType<ResolvedConfig['BigIntType'] | undefined>(data)
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
          args: [
            '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
            BigNumber.from('0'),
          ],
        }),
      )

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      assertType<ResolvedConfig['BigIntType'] | undefined>(res.data)
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

    it.each([
      { property: 'address' },
      { property: 'abi' },
      { property: 'functionName' },
    ])('does not run when $property is undefined', async ({ property }) => {
      const baseConfig = {
        address: wagmigotchiContractConfig.address,
        abi: wagmigotchiContractConfig.abi,
        functionName: 'love',
        args: ['0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c'],
      } as const
      const config = {
        ...baseConfig,
        address: property === 'address' ? undefined : baseConfig.address,
        abi: property === 'abi' ? undefined : baseConfig.abi,
        functionName:
          property === 'functionName' ? undefined : baseConfig.functionName,
      } as const
      const utils = renderHook(() => useContractRead(config))
      const { rerender, result, waitFor } = utils

      await waitFor(() => expect(result.current.isIdle).toBeTruthy())

      // @ts-expect-error assigning to readonly object
      config[property as keyof typeof config] =
        baseConfig[property as keyof typeof baseConfig]
      rerender()

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
    })
  })
})
