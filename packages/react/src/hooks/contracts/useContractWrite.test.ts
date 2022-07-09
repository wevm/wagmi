import { getUnclaimedTokenId } from '../../../../core/test'
import { act, actConnect, mlootContractConfig, renderHook } from '../../../test'
import { useConnect } from '../accounts'
import {
  UseContractWritePrepareArgs,
  UseContractWritePrepareConfig,
  useContractWritePrepare,
} from './useContractWritePrepare'
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

function useContractWritePreparedWithConnect(
  config: UseContractWritePrepareArgs &
    UseContractWritePrepareConfig & { chainId?: number },
) {
  const contractWritePrepare = useContractWritePrepare(config)
  return {
    connect: useConnect(),
    contractWritePrepare,
    contractWrite: useContractWrite({
      chainId: config?.chainId,
      request: contractWritePrepare.data,
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
      useContractWritePreparedWithConnect({
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
          useContractWritePreparedWithConnect({
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
          useContractWritePreparedWithConnect({
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

      it('unprepared', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return

        const utils = renderHook(() =>
          useContractWriteWithConnect({
            request: {
              type: 'dangerouslyUnprepared',
              payload: {
                ...mlootContractConfig,
                functionName: 'claim',
                args: [tokenId],
              },
            },
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

      it('deferred args', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return

        const utils = renderHook(() =>
          useContractWriteWithConnect({
            request: {
              type: 'dangerouslyUnprepared',
              payload: {
                ...mlootContractConfig,
                functionName: 'claim',
              },
            },
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () =>
          result.current.contractWrite.write?.({
            args: tokenId,
          }),
        )
        await waitFor(
          () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          { timeout },
        )

        expect(result.current.contractWrite.data?.hash).toBeDefined()
      })

      it.todo('throws error')
    })

    describe('writeAsync', () => {
      it('prepared', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return

        const utils = renderHook(() =>
          useContractWritePreparedWithConnect({
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

      it('unprepared', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return

        const utils = renderHook(() =>
          useContractWriteWithConnect({
            request: {
              type: 'dangerouslyUnprepared',
              payload: {
                ...mlootContractConfig,
                functionName: 'claim',
                args: [tokenId],
              },
            },
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

      it('deferred args', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return

        const utils = renderHook(() =>
          useContractWriteWithConnect({
            request: {
              type: 'dangerouslyUnprepared',
              payload: {
                ...mlootContractConfig,
                functionName: 'claim',
              },
            },
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          const res = await result.current.contractWrite.writeAsync?.({
            args: tokenId,
          })
          expect(res?.hash).toBeDefined()
        })
        await waitFor(
          () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          { timeout },
        )

        expect(result.current.contractWrite.data?.hash).toBeDefined()
      })

      it.todo('throws error')
    })
  })

  describe('behavior', () => {
    it.todo('multiple writes')
  })
})
