import type { Hash } from '@wagmi/core'
import { parseEther } from 'ethers/lib/utils.js'
import { describe, expect, it } from 'vitest'

import { act, actConnect, renderHook } from '../../../test'
import { useConnect } from '../accounts'
import { useSendTransaction } from './useSendTransaction'
import type {
  UseWaitForTransactionArgs,
  UseWaitForTransactionConfig,
} from './useWaitForTransaction'
import { useWaitForTransaction } from './useWaitForTransaction'

function useWaitForTransactionWithSendTransactionAndConnect(
  config: UseWaitForTransactionArgs & UseWaitForTransactionConfig = {},
) {
  return {
    connect: useConnect(),
    sendTransaction: useSendTransaction({ mode: 'recklesslyUnprepared' }),
    waitForTransaction: useWaitForTransaction(config),
  }
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

  describe('configuration', () => {
    it('scopeKey', async () => {
      const { result, waitFor } = renderHook(() => {
        return {
          transaction: useWaitForTransaction({
            hash: '0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b',
          }),
          transactionwithoutScopeKey: useWaitForTransaction({
            hash: '0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b',
            enabled: false,
          }),
          transactionwithScopeKey: useWaitForTransaction({
            hash: '0x5a44238ce14eced257ca19146505cce273f8bb552d35fd1a68737e2f0f95ab4b',
            scopeKey: 'wagmi',
            enabled: false,
          }),
        }
      })

      await waitFor(() =>
        expect(result.current.transaction.isSuccess).toBeTruthy(),
      )
      await waitFor(() =>
        expect(
          result.current.transactionwithoutScopeKey.isSuccess,
        ).toBeTruthy(),
      )
      await waitFor(() =>
        expect(result.current.transactionwithScopeKey.isIdle).toBeTruthy(),
      )
    })

    it('chainId', async () => {
      let hash: Hash | undefined = undefined
      const utils = renderHook(() =>
        useWaitForTransactionWithSendTransactionAndConnect({
          chainId: 1,
          hash,
        }),
      )
      const { rerender, result, waitFor } = utils
      await actConnect({ utils })

      await act(async () => {
        result.current.sendTransaction.sendTransaction!({
          recklesslySetUnpreparedRequest: {
            to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            value: parseEther('1'),
          },
        })
      })

      await waitFor(() =>
        expect(result.current.sendTransaction.isSuccess).toBeTruthy(),
      )
      hash = result.current.sendTransaction.data?.hash
      rerender()

      await waitFor(() =>
        expect(result.current.waitForTransaction.isSuccess).toBeTruthy(),
      )

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

    it('hash', async () => {
      let hash: Hash | undefined = undefined
      const utils = renderHook(() =>
        useWaitForTransactionWithSendTransactionAndConnect({ hash }),
      )
      const { rerender, result, waitFor } = utils
      await actConnect({ utils })

      await act(async () => {
        result.current.sendTransaction.sendTransaction!({
          recklesslySetUnpreparedRequest: {
            to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            value: parseEther('1'),
          },
        })
      })

      await waitFor(() =>
        expect(result.current.sendTransaction.isSuccess).toBeTruthy(),
      )
      hash = result.current.sendTransaction.data?.hash
      rerender()

      await waitFor(() =>
        expect(result.current.waitForTransaction.isSuccess).toBeTruthy(),
      )

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
  })

  describe('behavior', () => {
    it('reverts', async () => {
      // https://etherscan.io/tx/0x227025716535219d4c3737172c9c1507475e7a3246c8efcdc050ac59ed40b68e
      const hash =
        '0x227025716535219d4c3737172c9c1507475e7a3246c8efcdc050ac59ed40b68e'
      const { result, waitFor } = renderHook(() =>
        useWaitForTransaction({ hash }),
      )

      await waitFor(() => expect(result.current.isError).toBeTruthy())

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { internal, ...res } = result.current
      expect(res).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "error": [Error: missing revert data in call exception; Transaction reverted without a reason string [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (data="0x", transaction={"from":"0xA0Cf798816D4b9b9866b5330EEa46a18382f251e","to":"0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5","type":0,"accessList":null}, error={"reason":"processing response error","code":"SERVER_ERROR","body":"{\\"jsonrpc\\":\\"2.0\\",\\"id\\":46,\\"error\\":{\\"code\\":-32603,\\"message\\":\\"Fork Error: JsonRpcClientError(JsonRpcError(JsonRpcError { code: -32000, message: \\\\\\"execution reverted\\\\\\", data: None }))\\"}}","error":{"code":-32603},"requestBody":"{\\"method\\":\\"eth_call\\",\\"params\\":[{\\"type\\":\\"0x0\\",\\"from\\":\\"0xa0cf798816d4b9b9866b5330eea46a18382f251e\\",\\"to\\":\\"0x283af0b28c62c092c9727f1ee09c02ca627eb7f5\\"},\\"0xbeea0b\\"],\\"id\\":46,\\"jsonrpc\\":\\"2.0\\"}","requestMethod":"POST","url":"http://127.0.0.1:8545"}, code=CALL_EXCEPTION, version=providers/5.7.1)],
          "fetchStatus": "idle",
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
})
