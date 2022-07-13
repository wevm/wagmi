import {
  getSigners,
  getTotalSupply,
  getUnclaimedTokenId,
  wagmiContractConfig,
} from '../../../../core/test'
import { act, actConnect, mlootContractConfig, renderHook } from '../../../test'
import { useConnect } from '../accounts'
import {
  UsePrepareContractWriteArgs,
  UsePrepareContractWriteConfig,
  usePrepareContractWrite,
} from './usePrepareContractWrite'
import {
  UseContractWriteArgs,
  UseContractWriteConfig,
  useContractWrite,
} from './useContractWrite'

function useContractWriteWithConnect(
  config: UseContractWriteArgs & UseContractWriteConfig,
) {
  return {
    connect: useConnect(),
    contractWrite: useContractWrite(config),
  }
}

function usePrepareContractWritedWithConnect(
  config: UsePrepareContractWriteArgs &
    UsePrepareContractWriteConfig & { chainId?: number },
) {
  const prepareContractWrite = usePrepareContractWrite(config)
  return {
    connect: useConnect(),
    prepareContractWrite,
    contractWrite: useContractWrite({
      chainId: config?.chainId,
      ...prepareContractWrite.config,
    }),
  }
}

const timeout = 15_000

describe('useContractWrite', () => {
  jest.setTimeout(timeout)
  it('mounts', async () => {
    const tokenId = await getUnclaimedTokenId(
      '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
    )
    if (!tokenId) return

    const { result } = renderHook(() =>
      usePrepareContractWritedWithConnect({
        ...mlootContractConfig,
        functionName: 'claim',
        args: [tokenId],
      }),
    )

    expect(result.current.contractWrite).toMatchInlineSnapshot(`
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

  describe('configuration', () => {
    describe('chainId', () => {
      it('unable to switch', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return

        const utils = renderHook(() =>
          usePrepareContractWritedWithConnect({
            ...mlootContractConfig,
            chainId: 69,
            functionName: 'claim',
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
          expect(result.current.contractWrite.isError).toBeTruthy(),
        )

        expect(result.current.contractWrite.error).toMatchInlineSnapshot(
          `[ChainMismatchError: Chain mismatch: Expected "Chain 69", received "Ethereum.]`,
        )
      })
    })
  })

  describe('return value', () => {
    describe('write', () => {
      it('prepared', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return

        const utils = renderHook(() =>
          usePrepareContractWritedWithConnect({
            ...mlootContractConfig,
            functionName: 'claim',
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
      })

      it('prepared with deferred args', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return

        const utils = renderHook(() =>
          usePrepareContractWritedWithConnect({
            ...mlootContractConfig,
            functionName: 'claim',
            args: [tokenId],
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await waitFor(() =>
          expect(result.current.contractWrite.write).toBeDefined(),
        )

        await act(async () =>
          result.current.contractWrite.write?.({
            dangerouslySetArgs: await getUnclaimedTokenId(
              '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
            ),
          }),
        )
        await waitFor(
          () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          { timeout },
        )

        expect(result.current.contractWrite.data?.hash).toBeDefined()
      })

      it('dangerouslyUnprepared', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return

        const utils = renderHook(() =>
          useContractWriteWithConnect({
            mode: 'dangerouslyUnprepared',
            ...mlootContractConfig,
            functionName: 'claim',
            args: [tokenId],
          }),
        )

        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          result.current.contractWrite.write?.()
        })

        await waitFor(
          () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          { timeout },
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

      it('dangerouslyUnprepared with deferred args', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return

        const utils = renderHook(() =>
          useContractWriteWithConnect({
            mode: 'dangerouslyUnprepared',
            ...mlootContractConfig,
            functionName: 'claim',
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () =>
          result.current.contractWrite.write?.({
            dangerouslySetArgs: tokenId,
          }),
        )
        await waitFor(
          () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          { timeout },
        )

        expect(result.current.contractWrite.data?.hash).toBeDefined()
      })

      it('throws error', async () => {
        const utils = renderHook(() =>
          useContractWriteWithConnect({
            mode: 'dangerouslyUnprepared',
            ...mlootContractConfig,
            functionName: 'claim',
            args: [1],
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
            "error": [Error: processing response error (body="{\\"jsonrpc\\":\\"2.0\\",\\"id\\":42,\\"error\\":{\\"code\\":-32603,\\"message\\":\\"Error: VM Exception while processing transaction: reverted with reason string 'Token ID invalid'\\",\\"data\\":{\\"message\\":\\"Error: VM Exception while processing transaction: reverted with reason string 'Token ID invalid'\\",\\"data\\":\\"0x08c379a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010546f6b656e20494420696e76616c696400000000000000000000000000000000\\"}}}", error={"code":-32603,"data":{"message":"Error: VM Exception while processing transaction: reverted with reason string 'Token ID invalid'","data":"0x08c379a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010546f6b656e20494420696e76616c696400000000000000000000000000000000"}}, requestBody="{\\"method\\":\\"eth_estimateGas\\",\\"params\\":[{\\"from\\":\\"0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266\\",\\"to\\":\\"0x1dfe7ca09e99d10835bf73044a23b73fc20623df\\",\\"data\\":\\"0x379607f50000000000000000000000000000000000000000000000000000000000000001\\"}],\\"id\\":42,\\"jsonrpc\\":\\"2.0\\"}", requestMethod="POST", url="http://127.0.0.1:8545", code=SERVER_ERROR, version=web/5.6.0)],
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
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return

        const utils = renderHook(() =>
          usePrepareContractWritedWithConnect({
            ...mlootContractConfig,
            functionName: 'claim',
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
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return

        const utils = renderHook(() =>
          usePrepareContractWritedWithConnect({
            ...mlootContractConfig,
            functionName: 'claim',
            args: [tokenId],
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await waitFor(() =>
          expect(result.current.contractWrite.writeAsync).toBeDefined(),
        )

        await act(async () => {
          const res = await result.current.contractWrite.writeAsync?.({
            dangerouslySetArgs: await getUnclaimedTokenId(
              '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
            ),
          })
          expect(res?.hash).toBeDefined()
        })
        await waitFor(
          () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          { timeout },
        )

        expect(result.current.contractWrite.data?.hash).toBeDefined()
      })

      it('dangerouslyUnprepared', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return

        const utils = renderHook(() =>
          useContractWriteWithConnect({
            mode: 'dangerouslyUnprepared',
            ...mlootContractConfig,
            functionName: 'claim',
            args: [tokenId],
          }),
        )

        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          const res = await result.current.contractWrite.writeAsync?.()
          expect(res?.hash).toBeDefined()
        })

        await waitFor(
          () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          { timeout },
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

      it('dangerouslyUnprepared with deferred args', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return

        const utils = renderHook(() =>
          useContractWriteWithConnect({
            mode: 'dangerouslyUnprepared',
            ...mlootContractConfig,
            functionName: 'claim',
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          const res = await result.current.contractWrite.writeAsync?.({
            dangerouslySetArgs: tokenId,
          })
          expect(res?.hash).toBeDefined()
        })
        await waitFor(
          () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          { timeout },
        )

        expect(result.current.contractWrite.data?.hash).toBeDefined()
      })

      it('throws error', async () => {
        const utils = renderHook(() =>
          useContractWriteWithConnect({
            mode: 'dangerouslyUnprepared',
            ...mlootContractConfig,
            functionName: 'claim',
            args: [1],
          }),
        )

        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          await expect(
            result.current.contractWrite.writeAsync?.({
              dangerouslySetArgs: 1,
            }),
          ).rejects.toThrowErrorMatchingInlineSnapshot(
            `"processing response error (body=\\"{\\\\\\"jsonrpc\\\\\\":\\\\\\"2.0\\\\\\",\\\\\\"id\\\\\\":42,\\\\\\"error\\\\\\":{\\\\\\"code\\\\\\":-32603,\\\\\\"message\\\\\\":\\\\\\"Error: VM Exception while processing transaction: reverted with reason string 'Token ID invalid'\\\\\\",\\\\\\"data\\\\\\":{\\\\\\"message\\\\\\":\\\\\\"Error: VM Exception while processing transaction: reverted with reason string 'Token ID invalid'\\\\\\",\\\\\\"data\\\\\\":\\\\\\"0x08c379a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010546f6b656e20494420696e76616c696400000000000000000000000000000000\\\\\\"}}}\\", error={\\"code\\":-32603,\\"data\\":{\\"message\\":\\"Error: VM Exception while processing transaction: reverted with reason string 'Token ID invalid'\\",\\"data\\":\\"0x08c379a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010546f6b656e20494420696e76616c696400000000000000000000000000000000\\"}}, requestBody=\\"{\\\\\\"method\\\\\\":\\\\\\"eth_estimateGas\\\\\\",\\\\\\"params\\\\\\":[{\\\\\\"from\\\\\\":\\\\\\"0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266\\\\\\",\\\\\\"to\\\\\\":\\\\\\"0x1dfe7ca09e99d10835bf73044a23b73fc20623df\\\\\\",\\\\\\"data\\\\\\":\\\\\\"0x379607f50000000000000000000000000000000000000000000000000000000000000001\\\\\\"}],\\\\\\"id\\\\\\":42,\\\\\\"jsonrpc\\\\\\":\\\\\\"2.0\\\\\\"}\\", requestMethod=\\"POST\\", url=\\"http://127.0.0.1:8545\\", code=SERVER_ERROR, version=web/5.6.0)"`,
          )
        })
        await waitFor(
          () => expect(result.current.contractWrite.isError).toBeTruthy(),
          { timeout },
        )
      })
    })
  })

  describe('behavior', () => {
    jest.setTimeout(timeout)

    it('multiple writes', async () => {
      let args: any[] | any = []
      let functionName = 'mint'
      const utils = renderHook(() =>
        usePrepareContractWritedWithConnect({
          ...wagmiContractConfig,
          functionName,
          args,
        }),
      )
      const { result, rerender, waitFor } = utils
      await actConnect({ utils })

      await waitFor(
        () => expect(result.current.contractWrite.write).toBeDefined(),
        { timeout },
      )
      await act(async () => result.current.contractWrite.write?.())
      await waitFor(
        () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
        { timeout },
      )

      expect(result.current.contractWrite.data?.hash).toBeDefined()

      const from = await getSigners()[0]?.getAddress()
      const to = await getSigners()[1]?.getAddress()
      const tokenId = await getTotalSupply(wagmiContractConfig.addressOrName)
      functionName = 'transferFrom'
      args = [from, to, tokenId]
      rerender()

      await actConnect({ utils })

      await waitFor(() =>
        expect(result.current.contractWrite.write).toBeDefined(),
      )
      await act(async () => result.current.contractWrite.write?.())
      await waitFor(
        () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
        { timeout },
      )

      expect(result.current.contractWrite.data?.hash).toBeDefined()
    })
  })
})
