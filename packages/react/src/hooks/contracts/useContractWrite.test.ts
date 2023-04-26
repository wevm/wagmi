import type { Abi, ExtractAbiFunctionNames } from 'abitype'
import { describe, expect, it } from 'vitest'

import {
  act,
  actConnect,
  getCrowdfundArgs,
  getRandomTokenId,
  getWalletClients,
  mirrorCrowdfundContractConfig,
  mlootContractConfig,
  renderHook,
  wagmiContractConfig,
} from '../../../test'
import { useConnect } from '../accounts'
import type { UseContractWriteConfig } from './useContractWrite'
import { useContractWrite } from './useContractWrite'
import type { UsePrepareContractWriteConfig } from './usePrepareContractWrite'
import { usePrepareContractWrite } from './usePrepareContractWrite'

function useContractWriteWithConnect<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>(config: UseContractWriteConfig<TAbi, TFunctionName>) {
  return {
    connect: useConnect(),
    contractWrite: useContractWrite<TAbi, TFunctionName>(config),
  }
}

function usePrepareContractWriteWithConnect<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>(config: UsePrepareContractWriteConfig<TAbi, TFunctionName>) {
  const prepareContractWrite = usePrepareContractWrite<
    TAbi,
    TFunctionName,
    number
  >(config)
  return {
    connect: useConnect(),
    prepareContractWrite,
    contractWrite: useContractWrite<TAbi, TFunctionName, 'prepared'>(
      prepareContractWrite.config,
    ),
  }
}

describe('useContractWrite', () => {
  describe('mounts', () => {
    it('prepared', async () => {
      const { result } = renderHook(() =>
        useContractWrite({
          mode: 'prepared',
          request: undefined,
        }),
      )

      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "isError": false,
          "isIdle": true,
          "isLoading": false,
          "isSuccess": false,
          "reset": [Function],
          "status": "idle",
          "variables": undefined,
          "write": undefined,
          "writeAsync": undefined,
        }
      `)
    })

    it('unprepared', async () => {
      const tokenId = getRandomTokenId()
      const { result } = renderHook(() =>
        useContractWrite({
          ...wagmiContractConfig,
          functionName: 'mint',
          args: [tokenId],
        }),
      )

      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": null,
          "isError": false,
          "isIdle": true,
          "isLoading": false,
          "isSuccess": false,
          "reset": [Function],
          "status": "idle",
          "variables": undefined,
          "write": [Function],
          "writeAsync": [Function],
        }
      `)
    })
  })

  describe('configuration', () => {
    describe('chainId', () => {
      it('unprepared - unable to switch', async () => {
        const tokenId = getRandomTokenId()
        const utils = renderHook(() =>
          useContractWriteWithConnect({
            ...wagmiContractConfig,
            chainId: 69,
            functionName: 'mint',
            args: [tokenId],
          }),
        )

        const { result, waitFor } = utils
        await actConnect({ utils })

        await waitFor(() =>
          expect(result.current.contractWrite.write).toBeDefined(),
        )

        await act(async () => {
          result.current.contractWrite.write()
        })

        await waitFor(() =>
          expect(result.current.contractWrite.isError).toBeTruthy(),
        )

        expect(result.current.contractWrite.error).toMatchInlineSnapshot(
          `[ChainMismatchError: Chain mismatch: Expected "Chain 69", received "Ethereum".]`,
        )
      })
    })
  })

  describe('return value', () => {
    describe('write', () => {
      it(
        'prepared',
        async () => {
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
            expect(result.current.contractWrite.write).toBeDefined(),
          )

          await act(async () => {
            result.current.contractWrite.write?.()
          })

          await waitFor(() =>
            expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          )

          const { data, variables, ...res } = result.current.contractWrite
          expect(data).toBeDefined()
          expect(data?.hash).toBeDefined()
          expect(variables).toBeDefined()
          expect(res).toMatchInlineSnapshot(`
          {
            "error": null,
            "isError": false,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": true,
            "reset": [Function],
            "status": "success",
            "write": [Function],
            "writeAsync": [Function],
          }
        `)
        },
        { retry: 3 },
      )

      it(
        'prepared with deferred args',
        async () => {
          const args = getCrowdfundArgs()
          const utils = renderHook(() =>
            usePrepareContractWriteWithConnect({
              ...mirrorCrowdfundContractConfig,
              functionName: 'createCrowdfund',
              args,
            }),
          )
          const { result, waitFor } = utils
          await actConnect({ utils })

          await waitFor(
            () => expect(result.current.contractWrite.write).toBeDefined(),
            { timeout: 10_000 },
          )

          await act(async () => {
            result.current.contractWrite.write?.()
          })
          await waitFor(() =>
            expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          )

          expect(result.current.contractWrite.data?.hash).toBeDefined()
        },
        { retry: 3, timeout: 10_000 },
      )

      it('unprepared', async () => {
        const tokenId = getRandomTokenId()
        const utils = renderHook(() =>
          useContractWriteWithConnect({
            ...wagmiContractConfig,
            functionName: 'mint',
            args: [tokenId],
          }),
        )

        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          result.current.contractWrite.write?.()
        })

        await waitFor(() =>
          expect(result.current.contractWrite.isSuccess).toBeTruthy(),
        )

        const { data, variables, ...res } = result.current.contractWrite
        expect(data).toBeDefined()
        expect(data?.hash).toBeDefined()
        expect(variables).toBeDefined()
        expect(res).toMatchInlineSnapshot(`
          {
            "error": null,
            "isError": false,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": true,
            "reset": [Function],
            "status": "success",
            "write": [Function],
            "writeAsync": [Function],
          }
        `)
      })

      it('unprepared with deferred args', async () => {
        const utils = renderHook(() =>
          useContractWriteWithConnect({
            ...mirrorCrowdfundContractConfig,
            functionName: 'createCrowdfund',
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () =>
          result.current.contractWrite.write?.({
            args: getCrowdfundArgs(),
          }),
        )
        await waitFor(() =>
          expect(result.current.contractWrite.isSuccess).toBeTruthy(),
        )

        expect(result.current.contractWrite.data?.hash).toBeDefined()
      })

      it('throws error', async () => {
        const utils = renderHook(() =>
          useContractWriteWithConnect({
            ...mlootContractConfig,
            functionName: 'claim',
            args: [1n],
          }),
        )

        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          result.current.contractWrite.write?.()
        })

        await waitFor(() =>
          expect(result.current.contractWrite.isError).toBeTruthy(),
        )

        const { variables, ...res } = result.current.contractWrite
        expect(variables).toBeDefined()
        expect(res).toMatchInlineSnapshot(`
          {
            "data": undefined,
            "error": [ContractFunctionExecutionError: The contract function "claim" reverted with the following reason:
          Token ID invalid

          Contract Call:
            address:   0x1dfe7ca09e99d10835bf73044a23b73fc20623df
            function:  claim(uint256 tokenId)
            args:           (1)
            sender:    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

          Docs: https://viem.sh/docs/contract/simulateContract.html
          Version: viem@0.3.12],
            "isError": true,
            "isIdle": false,
            "isLoading": false,
            "isSuccess": false,
            "reset": [Function],
            "status": "error",
            "write": [Function],
            "writeAsync": [Function],
          }
        `)
      })
    })

    describe('writeAsync', () => {
      it('prepared', async () => {
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
          expect(result.current.contractWrite.writeAsync).toBeDefined(),
        )

        await act(async () => {
          const res = await result.current.contractWrite.writeAsync?.()
          expect(res?.hash).toBeDefined()
        })

        await waitFor(() =>
          expect(result.current.contractWrite.isSuccess).toBeTruthy(),
        )

        const { data, variables, ...res } = result.current.contractWrite
        expect(data).toBeDefined()
        expect(data?.hash).toBeDefined()
        expect(variables).toBeDefined()
        expect(res).toMatchInlineSnapshot(`
            {
              "error": null,
              "isError": false,
              "isIdle": false,
              "isLoading": false,
              "isSuccess": true,
              "reset": [Function],
              "status": "success",
              "write": [Function],
              "writeAsync": [Function],
            }
          `)
      })

      it('prepared with deferred args', async () => {
        const args = getCrowdfundArgs()
        const utils = renderHook(() =>
          usePrepareContractWriteWithConnect({
            ...mirrorCrowdfundContractConfig,
            functionName: 'createCrowdfund',
            args,
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await waitFor(() =>
          expect(result.current.contractWrite.writeAsync).toBeDefined(),
        )

        await act(async () => {
          const res = await result.current.contractWrite.writeAsync?.()
          expect(res?.hash).toBeDefined()
        })
        await waitFor(() =>
          expect(result.current.contractWrite.isSuccess).toBeTruthy(),
        )

        expect(result.current.contractWrite.data?.hash).toBeDefined()
      })

      it('unprepared', async () => {
        const tokenId = getRandomTokenId()
        const utils = renderHook(() =>
          useContractWriteWithConnect({
            ...wagmiContractConfig,
            functionName: 'mint',
            args: [tokenId],
          }),
        )

        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          const res = await result.current.contractWrite.writeAsync?.()
          expect(res?.hash).toBeDefined()
        })

        await waitFor(() =>
          expect(result.current.contractWrite.isSuccess).toBeTruthy(),
        )

        const { data, variables, ...res } = result.current.contractWrite
        expect(data).toBeDefined()
        expect(data?.hash).toBeDefined()
        expect(variables).toBeDefined()
        expect(res).toMatchInlineSnapshot(`
            {
              "error": null,
              "isError": false,
              "isIdle": false,
              "isLoading": false,
              "isSuccess": true,
              "reset": [Function],
              "status": "success",
              "write": [Function],
              "writeAsync": [Function],
            }
          `)
      })

      it('unprepared with deferred args', async () => {
        const utils = renderHook(() =>
          useContractWriteWithConnect({
            ...mirrorCrowdfundContractConfig,
            functionName: 'createCrowdfund',
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          const res = await result.current.contractWrite.writeAsync?.({
            args: getCrowdfundArgs(),
          })
          expect(res?.hash).toBeDefined()
        })
        await waitFor(() =>
          expect(result.current.contractWrite.isSuccess).toBeTruthy(),
        )

        expect(result.current.contractWrite.data?.hash).toBeDefined()
      })

      it('throws error', async () => {
        const utils = renderHook(() =>
          useContractWriteWithConnect({
            ...mlootContractConfig,
            functionName: 'claim',
            args: [1n],
          }),
        )

        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          await expect(
            result.current.contractWrite.writeAsync?.({
              args: [1n],
            }),
          ).rejects.toThrowErrorMatchingInlineSnapshot(
            `
            "The contract function \\"claim\\" reverted with the following reason:
            Token ID invalid

            Contract Call:
              address:   0x1dfe7ca09e99d10835bf73044a23b73fc20623df
              function:  claim(uint256 tokenId)
              args:           (1)
              sender:    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

            Docs: https://viem.sh/docs/contract/simulateContract.html
            Version: viem@0.3.12"
          `,
          )
        })
        await waitFor(() =>
          expect(result.current.contractWrite.isError).toBeTruthy(),
        )
      })
    })
  })

  describe('behavior', () => {
    it(
      'multiple writes',
      async () => {
        const tokenId = getRandomTokenId()
        let args: any[] | any = [tokenId]
        let functionName: ExtractAbiFunctionNames<
          (typeof wagmiContractConfig)['abi'],
          'nonpayable' | 'payable'
        > = 'mint'
        const utils = renderHook(() =>
          usePrepareContractWriteWithConnect({
            ...wagmiContractConfig,
            functionName,
            args,
          }),
        )
        const { result, rerender, waitFor } = utils
        await actConnect({ utils })

        await waitFor(() =>
          expect(result.current.contractWrite.write).toBeDefined(),
        )
        await act(async () => result.current.contractWrite.write?.())
        await waitFor(() =>
          expect(result.current.contractWrite.isSuccess).toBeTruthy(),
        )

        expect(result.current.contractWrite.data?.hash).toBeDefined()

        const from = await getWalletClients()[0]?.account.address
        const to = await getWalletClients()[1]?.account.address
        functionName = 'transferFrom'
        args = [from, to, tokenId]
        rerender()

        await actConnect({ utils })

        await waitFor(() =>
          expect(result.current.contractWrite.write).toBeDefined(),
        )
        await act(async () => result.current.contractWrite.write?.())
        await waitFor(() =>
          expect(result.current.contractWrite.isSuccess).toBeTruthy(),
        )

        expect(result.current.contractWrite.data?.hash).toBeDefined()
      },
      { retry: 3 },
    )

    it.each([
      { property: 'address' },
      { property: 'abi' },
      { property: 'functionName' },
    ])('throws error when $property is undefined', async ({ property }) => {
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
      const utils = renderHook(() => useContractWrite(config))
      const { result, waitFor } = utils

      await act(async () => {
        result.current.write?.()
      })

      await waitFor(() => expect(result.current.isError).toBeTruthy())
      expect(result.current.error?.message).toBe(`${property} is required`)
    })
  })
})
