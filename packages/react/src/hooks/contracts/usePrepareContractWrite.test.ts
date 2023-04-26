import type { Abi } from 'abitype'
import { describe, expect, it } from 'vitest'

import {
  act,
  actConnect,
  getRandomTokenId,
  mlootContractConfig,
  renderHook,
  wagmiContractConfig,
} from '../../../test'
import { useConnect } from '../accounts'
import { useSwitchNetwork } from '../accounts/useSwitchNetwork'
import type { UsePrepareContractWriteConfig } from './usePrepareContractWrite'
import { usePrepareContractWrite } from './usePrepareContractWrite'

function usePrepareContractWriteWithConnect<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>(config: UsePrepareContractWriteConfig<TAbi, TFunctionName>) {
  const { ...prepareContractWrite } = usePrepareContractWrite(config)
  return {
    connect: useConnect(),
    network: useSwitchNetwork(),
    prepareContractWrite,
  }
}

describe('usePrepareContractWrite', () => {
  it('mounts', async () => {
    const tokenId = getRandomTokenId()
    const { result } = renderHook(() =>
      usePrepareContractWriteWithConnect({
        ...wagmiContractConfig,
        functionName: 'mint',
        args: [tokenId],
      }),
    )

    const { config, ...rest } = result.current.prepareContractWrite
    expect(config).toBeDefined()
    expect(rest).toMatchInlineSnapshot(`
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

  it('connect', async () => {
    const tokenId = getRandomTokenId()
    const utils = renderHook(() =>
      usePrepareContractWriteWithConnect({
        ...wagmiContractConfig,
        functionName: 'mint',
        args: [tokenId],
      }),
    )
    const { result, waitFor } = utils

    await actConnect({ utils })

    await waitFor(() =>
      expect(result.current.prepareContractWrite.isSuccess).toBeTruthy(),
    )

    const { config, data: res, ...rest } = result.current.prepareContractWrite
    expect(res).toBeDefined()
    expect(config).toBeDefined()
    expect(rest).toMatchInlineSnapshot(`
      {
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
          "isStale": true,
          "remove": [Function],
        },
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

  describe('errors', () => {
    it('should throw an error on the wrong chain', async () => {
      const tokenId = getRandomTokenId()
      const utils = renderHook(() =>
        usePrepareContractWriteWithConnect({
          ...wagmiContractConfig,
          chainId: 1,
          functionName: 'mint',
          args: [tokenId],
        }),
      )

      const { result, waitFor } = utils
      await actConnect({ chainId: 5, utils })

      await waitFor(() =>
        expect(result.current.prepareContractWrite.isError).toBeTruthy(),
      )
      expect(result.current.prepareContractWrite.error).toMatchInlineSnapshot(
        '[ChainMismatchError: Chain mismatch: Expected "Ethereum", received "Goerli".]',
      )

      await act(async () => result.current.network.switchNetwork?.(1))
      await waitFor(() => expect(result.current.network.isSuccess).toBeTruthy())

      await waitFor(() =>
        expect(result.current.prepareContractWrite.isSuccess).toBeTruthy(),
      )
    })

    it('should throw an error if chainId is not configured', async () => {
      const tokenId = getRandomTokenId()
      const utils = renderHook(() =>
        usePrepareContractWriteWithConnect({
          ...wagmiContractConfig,
          chainId: 69_420,
          functionName: 'mint',
          args: [tokenId],
        }),
      )

      const { result, waitFor } = utils
      await actConnect({ chainId: 69_420, utils })

      await waitFor(() =>
        expect(result.current.prepareContractWrite.isError).toBeTruthy(),
      )
      expect(result.current.prepareContractWrite.error).toMatchInlineSnapshot(
        '[ChainNotConfigured: Chain "69420" not configured for connector "mock".]',
      )
    })

    it('contract method error', async () => {
      const utils = renderHook(() =>
        usePrepareContractWriteWithConnect({
          ...mlootContractConfig,
          functionName: 'claim',
          args: [1n],
        }),
      )
      const { result, waitFor } = utils

      await actConnect({ utils })

      await waitFor(() =>
        expect(result.current.prepareContractWrite.isError).toBeTruthy(),
      )

      const { config, data, ...rest } = result.current.prepareContractWrite
      expect(config).toBeDefined()
      expect(data).toBeUndefined()
      expect(rest).toMatchInlineSnapshot(`
        {
          "error": [ContractFunctionExecutionError: The contract function "claim" reverted with the following reason:
        Token ID invalid

        Contract Call:
          address:   0x1dfe7ca09e99d10835bf73044a23b73fc20623df
          function:  claim(uint256 tokenId)
          args:           (1)
          sender:    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

        Docs: https://viem.sh/docs/contract/simulateContract.html
        Version: viem@0.3.12],
          "fetchStatus": "idle",
          "internal": {
            "dataUpdatedAt": 0,
            "errorUpdatedAt": 1643673600000,
            "failureCount": 1,
            "isFetchedAfterMount": true,
            "isLoadingError": true,
            "isPaused": false,
            "isPlaceholderData": false,
            "isPreviousData": false,
            "isRefetchError": false,
            "isStale": true,
            "remove": [Function],
          },
          "isError": true,
          "isFetched": true,
          "isFetchedAfterMount": true,
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

    it('contract function not found', async () => {
      const utils = renderHook(() =>
        usePrepareContractWriteWithConnect({
          ...wagmiContractConfig,
          // @ts-expect-error function does not exist
          functionName: 'wagmi',
        }),
      )
      const { result, waitFor } = utils

      await actConnect({ utils })

      await waitFor(() =>
        expect(result.current.prepareContractWrite.isError).toBeTruthy(),
      )

      const { config, data, ...rest } = result.current.prepareContractWrite
      expect(config).toBeDefined()
      expect(data).toBeUndefined()
      expect(rest).toMatchInlineSnapshot(`
        {
          "error": [AbiFunctionNotFoundError: Function "wagmi" not found on ABI.
        Make sure you are using the correct ABI and that the function exists on it.

        Docs: https://viem.sh/docs/contract/encodeFunctionData.html
        Version: viem@0.3.12],
          "fetchStatus": "idle",
          "internal": {
            "dataUpdatedAt": 0,
            "errorUpdatedAt": 1643673600000,
            "failureCount": 1,
            "isFetchedAfterMount": true,
            "isLoadingError": true,
            "isPaused": false,
            "isPlaceholderData": false,
            "isPreviousData": false,
            "isRefetchError": false,
            "isStale": true,
            "remove": [Function],
          },
          "isError": true,
          "isFetched": true,
          "isFetchedAfterMount": true,
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

  describe('behavior', () => {
    it.each([
      { property: 'address' },
      { property: 'abi' },
      { property: 'functionName' },
    ])('does not run when $property is undefined', async ({ property }) => {
      const tokenId = getRandomTokenId()
      const baseConfig = {
        address: wagmiContractConfig.address,
        abi: wagmiContractConfig.abi,
        functionName: 'mint',
        args: [tokenId],
      } as const
      const config = {
        ...baseConfig,
        address: property === 'address' ? undefined : baseConfig.address,
        abi: property === 'abi' ? undefined : baseConfig.abi,
        functionName:
          property === 'functionName' ? undefined : baseConfig.functionName,
      } as const
      const utils = renderHook(() => usePrepareContractWriteWithConnect(config))
      const { rerender, result, waitFor } = utils

      await actConnect({ utils })
      await waitFor(() =>
        expect(result.current.prepareContractWrite.isIdle).toBeTruthy(),
      )
      expect(
        result.current.prepareContractWrite.config[
          property as keyof typeof result.current.prepareContractWrite.config
        ],
      ).toBe(config[property as keyof typeof config])

      // @ts-expect-error assigning to readonly object
      config[property as keyof typeof config] =
        baseConfig[property as keyof typeof baseConfig]
      rerender()

      await waitFor(() =>
        expect(result.current.prepareContractWrite.isSuccess).toBeTruthy(),
      )
    })
  })
})
