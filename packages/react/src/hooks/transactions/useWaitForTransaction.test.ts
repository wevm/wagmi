import { BigNumber } from 'ethers'

import { actHook, actHookConnect, renderHook } from '../../../test'
import { useConnect } from '../accounts'
import { useSendTransaction } from './useSendTransaction'
import {
  UseWaitForTransactionArgs,
  UseWaitForTransactionConfig,
  useWaitForTransaction,
} from './useWaitForTransaction'

const useWaitForTransactionWithSendTransactionAndConnect = (
  config: UseWaitForTransactionArgs & UseWaitForTransactionConfig = {},
) => {
  const connect = useConnect()
  const sendTransaction = useSendTransaction()
  const waitForTransaction = useWaitForTransaction(config)
  return { connect, sendTransaction, waitForTransaction } as const
}

describe('useWaitForTransaction', () => {
  it('mounts', () => {
    const { result } = renderHook(() => useWaitForTransaction())
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
        "status": "loading",
      }
    `)
  })

  describe('configuration', () => {
    it('chainId,', async () => {
      let hash: string | undefined = undefined
      const utils = renderHook(() =>
        useWaitForTransactionWithSendTransactionAndConnect({
          chainId: 1,
          hash,
        }),
      )
      const { rerender, result, waitFor } = utils
      await actHookConnect({ utils })

      await actHook(async () => {
        result.current.sendTransaction.sendTransaction({
          request: {
            to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            value: BigNumber.from('1000000000000000000'), // 1 ETH
          },
        })
      })

      await waitFor(() => result.current.sendTransaction.isSuccess)
      hash = result.current.sendTransaction.data?.hash
      rerender()

      await waitFor(() => result.current.waitForTransaction.isSuccess)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, internal, ...res } = result.current.waitForTransaction
      expect(data).toBeDefined()
      expect(data?.transactionHash).toEqual(hash)
      expect(res).toMatchInlineSnapshot(`
        {
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

    it('hash', async () => {
      let hash: string | undefined = undefined
      const utils = renderHook(() =>
        useWaitForTransactionWithSendTransactionAndConnect({ hash }),
      )
      const { rerender, result, waitFor } = utils
      await actHookConnect({ utils })

      await actHook(async () => {
        result.current.sendTransaction.sendTransaction({
          request: {
            to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            value: BigNumber.from('1000000000000000000'), // 1 ETH
          },
        })
      })

      await waitFor(() => result.current.sendTransaction.isSuccess)
      hash = result.current.sendTransaction.data?.hash
      rerender()

      await waitFor(() => result.current.waitForTransaction.isSuccess)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, internal, ...res } = result.current.waitForTransaction
      expect(data).toBeDefined()
      expect(data?.transactionHash).toEqual(hash)
      expect(res).toMatchInlineSnapshot(`
        {
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
