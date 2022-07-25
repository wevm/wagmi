import { MockConnector } from '@wagmi/core/connectors/mock'
import { describe, expect, it } from 'vitest'

import {
  act,
  actConnect,
  getSigners,
  getTotalSupply,
  renderHook,
  wagmiContractConfig,
} from '../../../test'
import { useConnect } from '../accounts'
import {
  UseDeprecatedContractWriteArgs,
  UseDeprecatedContractWriteConfig,
  useDeprecatedContractWrite,
} from './useDeprecatedContractWrite'

function useDeprecatedContractWriteWithConnect(
  config: UseDeprecatedContractWriteArgs & UseDeprecatedContractWriteConfig,
) {
  return {
    connect: useConnect(),
    contractWrite: useDeprecatedContractWrite(config),
  }
}

const timeout = 15_000

describe('useDeprecatedContractWrite', () => {
  it('mounts', () => {
    const { result } = renderHook(() =>
      useDeprecatedContractWrite({
        ...wagmiContractConfig,
        functionName: 'mint',
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
          useDeprecatedContractWriteWithConnect({
            ...wagmiContractConfig,
            chainId: 1,
            functionName: 'mint',
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
          `[ChainMismatchError: Chain mismatch: Expected "Ethereum", received "Rinkeby".]`,
        )
      })
    })
  })

  describe('return value', () => {
    describe('write', () => {
      it('uses configuration', async () => {
        const utils = renderHook(() =>
          useDeprecatedContractWriteWithConnect({
            ...wagmiContractConfig,
            functionName: 'mint',
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
    })
  })

  describe('behavior', () => {
    it('can call multiple writes', async () => {
      let args: any[] | any = []
      let functionName = 'mint'
      const utils = renderHook(() =>
        useDeprecatedContractWriteWithConnect({
          ...wagmiContractConfig,
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
      const tokenId = await getTotalSupply(wagmiContractConfig.addressOrName)
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
