import { MockConnector } from '@wagmi/core/connectors/mock'

import {
  act,
  actConnect,
  getSigners,
  getUnclaimedTokenId,
  mlootContractConfig,
  renderHook,
} from '../../../test'
import { useConnect } from '../accounts'
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

const timeout = 15_000

describe('useContractWrite', () => {
  it('mounts', () => {
    const { result } = renderHook(() =>
      useContractWrite({ ...mlootContractConfig, functionName: 'claim' }),
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

  describe('configuration', () => {
    describe('chainId', () => {
      it('unable to switch', async () => {
        const connector = new MockConnector({
          options: {
            flags: { noSwitchChain: true },
            signer: getSigners()[0]!,
          },
        })
        const utils = renderHook(() =>
          useContractWriteWithConnect({
            ...mlootContractConfig,
            chainId: 1,
            functionName: 'claim',
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ chainId: 4, connector, utils })

        await act(async () => {
          result.current.contractWrite.write()
        })

        await waitFor(() =>
          expect(result.current.contractWrite.isError).toBeTruthy(),
        )

        expect(result.current.contractWrite.error).toMatchInlineSnapshot(
          `[ChainMismatchError: Chain mismatch: Expected "Ethereum", received "Rinkeby.]`,
        )
      })
    })
  })

  describe('return value', () => {
    describe('write', () => {
      jest.setTimeout(timeout)
      it('uses configuration', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return
        const utils = renderHook(() =>
          useContractWriteWithConnect({
            ...mlootContractConfig,
            functionName: 'claim',
            args: tokenId,
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => result.current.contractWrite.write())
        await waitFor(
          () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          { timeout },
        )

        expect(result.current.contractWrite.data?.hash).toBeDefined()
      })

      it('uses deferred args', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return
        const utils = renderHook(() =>
          useContractWriteWithConnect({
            ...mlootContractConfig,
            functionName: 'claim',
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () =>
          result.current.contractWrite.write({ args: tokenId }),
        )
        await waitFor(
          () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          { timeout },
        )

        expect(result.current.contractWrite.data?.hash).toBeDefined()
      })

      it('fails', async () => {
        const utils = renderHook(() =>
          useContractWriteWithConnect({
            ...mlootContractConfig,
            functionName: 'claim',
            args: 1,
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => result.current.contractWrite.write())
        await waitFor(() =>
          expect(result.current.contractWrite.isError).toBeTruthy(),
        )

        expect(result.current.contractWrite.error?.message).toContain(
          'Token ID invalid',
        )
      })
    })

    describe('writeAsync', () => {
      jest.setTimeout(timeout)
      it('uses configuration', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return
        const utils = renderHook(() =>
          useContractWriteWithConnect({
            ...mlootContractConfig,
            functionName: 'claim',
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          const res = await result.current.contractWrite.writeAsync({
            args: tokenId,
          })
          expect(res.hash).toBeDefined()
        })
        await waitFor(
          () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          { timeout },
        )
      })

      it('throws error', async () => {
        const utils = renderHook(() =>
          useContractWriteWithConnect({
            ...mlootContractConfig,
            functionName: 'claim',
          }),
        )
        const { result, waitFor } = utils
        await actConnect({ utils })

        await act(async () => {
          await expect(
            result.current.contractWrite.writeAsync({
              args: 1,
            }),
          ).rejects.toThrowErrorMatchingInlineSnapshot(
            `"processing response error (body=\\"{\\\\\\"jsonrpc\\\\\\":\\\\\\"2.0\\\\\\",\\\\\\"id\\\\\\":43,\\\\\\"error\\\\\\":{\\\\\\"code\\\\\\":-32603,\\\\\\"message\\\\\\":\\\\\\"Error: VM Exception while processing transaction: reverted with reason string 'Token ID invalid'\\\\\\",\\\\\\"data\\\\\\":{\\\\\\"message\\\\\\":\\\\\\"Error: VM Exception while processing transaction: reverted with reason string 'Token ID invalid'\\\\\\",\\\\\\"data\\\\\\":\\\\\\"0x08c379a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010546f6b656e20494420696e76616c696400000000000000000000000000000000\\\\\\"}}}\\", error={\\"code\\":-32603,\\"data\\":{\\"message\\":\\"Error: VM Exception while processing transaction: reverted with reason string 'Token ID invalid'\\",\\"data\\":\\"0x08c379a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010546f6b656e20494420696e76616c696400000000000000000000000000000000\\"}}, requestBody=\\"{\\\\\\"method\\\\\\":\\\\\\"eth_estimateGas\\\\\\",\\\\\\"params\\\\\\":[{\\\\\\"from\\\\\\":\\\\\\"0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266\\\\\\",\\\\\\"to\\\\\\":\\\\\\"0x1dfe7ca09e99d10835bf73044a23b73fc20623df\\\\\\",\\\\\\"data\\\\\\":\\\\\\"0x379607f50000000000000000000000000000000000000000000000000000000000000001\\\\\\"}],\\\\\\"id\\\\\\":43,\\\\\\"jsonrpc\\\\\\":\\\\\\"2.0\\\\\\"}\\", requestMethod=\\"POST\\", url=\\"http://127.0.0.1:8545\\", code=SERVER_ERROR, version=web/5.6.0)"`,
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
    it('can call multiple writes', async () => {
      const tokenId = await getUnclaimedTokenId(
        '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
      )
      if (!tokenId) return
      let functionName = 'claim'
      let args: any | any[] = tokenId
      const utils = renderHook(() =>
        useContractWriteWithConnect({
          ...mlootContractConfig,
          functionName,
          args,
        }),
      )
      const { result, rerender, waitFor } = utils
      await actConnect({ utils })

      await act(async () => result.current.contractWrite.write())
      await waitFor(
        () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
        { timeout },
      )

      expect(result.current.contractWrite.data?.hash).toBeDefined()

      const from = await getSigners()[0]?.getAddress()
      const to = await getSigners()[1]?.getAddress()
      functionName = 'transferFrom'
      args = [from, to, tokenId]
      rerender()

      await actConnect({ utils })
      await act(async () => result.current.contractWrite.write())
      await waitFor(
        () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
        { timeout },
      )

      expect(result.current.contractWrite.data?.hash).toBeDefined()
    })
  })
})
