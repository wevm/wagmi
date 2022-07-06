import { getUnclaimedTokenId } from '../../../../core/test'
import { act, actConnect, mlootContractConfig, renderHook } from '../../../test'
import { useConnect } from '../accounts'
import {
  UsePrepareContractTransactionArgs,
  UsePrepareContractTransactionConfig,
  usePrepareContractTransaction,
} from './usePrepareContractTransaction'
import { useContractWritePrepared } from './useContractWritePrepared'

function useContractWritePreparedWithConnect(
  config: UsePrepareContractTransactionArgs &
    UsePrepareContractTransactionConfig,
) {
  const prepareContractTransaction = usePrepareContractTransaction(config)
  return {
    prepareContractTransaction,
    connect: useConnect(),
    contractWritePrepared: useContractWritePrepared({
      request: prepareContractTransaction.data,
    }),
  }
}

describe('useContractWritePrepared', () => {
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

    expect(result.current.contractWritePrepared).toMatchInlineSnapshot(`
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

  describe('return value', () => {
    describe('write', () => {
      it('uses configuration', async () => {
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
          expect(result.current.contractWritePrepared.write).toBeDefined(),
        )

        await act(async () => {
          result.current.contractWritePrepared.write?.()
        })

        await waitFor(() =>
          expect(result.current.contractWritePrepared.isSuccess).toBeTruthy(),
        )

        const { data, variables, ...res } = result.current.contractWritePrepared
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
    })

    describe('writeAsync', () => {
      it('uses configuration', async () => {
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
          expect(result.current.contractWritePrepared.write).toBeDefined(),
        )

        await act(async () => {
          const res = await result.current.contractWritePrepared.writeAsync?.()
          expect(res?.data).toBeDefined()
        })

        await waitFor(() =>
          expect(result.current.contractWritePrepared.isSuccess).toBeTruthy(),
        )

        const { data, variables, ...res } = result.current.contractWritePrepared
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
    })
  })
})
