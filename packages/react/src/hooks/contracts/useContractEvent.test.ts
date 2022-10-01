import { Hash, erc20ABI } from '@wagmi/core'
import { Abi, ExtractAbiEventNames, ExtractAbiFunctionNames } from 'abitype'
import { describe, expect, it, vi } from 'vitest'

import {
  act,
  actConnect,
  getRandomTokenId,
  renderHook,
  wagmiContractConfig,
} from '../../../test'
import { useConnect } from '../accounts'
import {
  UseWaitForTransactionArgs,
  UseWaitForTransactionConfig,
  useWaitForTransaction,
} from '../transactions/useWaitForTransaction'
import { UseContractEventConfig, useContractEvent } from './useContractEvent'
import { UseContractWriteConfig, useContractWrite } from './useContractWrite'

const uniContractAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

function useContractEventsWithWrite<
  TAbi extends Abi | readonly unknown[],
  TEventName extends TAbi extends Abi ? ExtractAbiEventNames<TAbi> : string,
  TFunctionName extends TAbi extends Abi
    ? ExtractAbiFunctionNames<TAbi, 'payable' | 'nonpayable'>
    : string,
>(config: {
  contractEvent1: {
    config: UseContractEventConfig<TAbi, TEventName>
  }
  contractEvent2: {
    config: UseContractEventConfig<TAbi, TEventName>
  }
  contractEvent3: {
    config: UseContractEventConfig<TAbi, TEventName>
  }
  contractWrite: {
    config: UseContractWriteConfig<TAbi, TFunctionName>
  }
  waitForTransaction?: UseWaitForTransactionArgs & UseWaitForTransactionConfig
}) {
  return {
    connect: useConnect(),
    contractEvent1: useContractEvent(config.contractEvent1.config),
    contractEvent2: useContractEvent(config.contractEvent2.config),
    contractEvent3: useContractEvent(config.contractEvent3.config),
    contractWrite: useContractWrite(config.contractWrite.config),
    waitForTransaction: useWaitForTransaction(config.waitForTransaction),
  }
}

describe('useContractEvent', () => {
  it('mounts', () => {
    const listener = vi.fn()
    renderHook(() =>
      useContractEvent({
        addressOrName: uniContractAddress,
        contractInterface: erc20ABI,
        eventName: 'Transfer',
        listener,
      }),
    )
    expect(listener).toHaveBeenCalledTimes(0)
  })

  describe('configuration', () => {
    it('addressOrName', () => {
      const listener = vi.fn()
      renderHook(() =>
        useContractEvent({
          contractInterface: erc20ABI,
          eventName: 'Transfer',
          listener,
        }),
      )
      expect(listener).toHaveBeenCalledTimes(0)
    })

    describe('once', () => {
      it('listens', async () => {
        let hash: Hash | undefined = undefined

        const tokenId = getRandomTokenId()
        const listenerNoArgs = vi.fn()
        const listenerArgs = vi.fn()
        const listenerBadArgs = vi.fn()
        const utils = renderHook(() =>
          useContractEventsWithWrite({
            contractEvent1: {
              config: {
                ...wagmiContractConfig,
                eventName: 'Transfer',
                listener: listenerNoArgs,
              },
            },
            contractEvent2: {
              config: {
                ...wagmiContractConfig,
                eventName: 'Transfer',
                args: [null, null, tokenId],
                listener: listenerArgs,
              },
            },
            contractEvent3: {
              config: {
                ...wagmiContractConfig,
                eventName: 'Transfer',
                args: [null, null, getRandomTokenId()],
                listener: listenerBadArgs,
              },
            },
            contractWrite: {
              config: {
                mode: 'recklesslyUnprepared',
                ...wagmiContractConfig,
                functionName: 'mint',
                args: [tokenId],
              },
            },
            waitForTransaction: { hash },
          }),
        )
        const { result, rerender, waitFor } = utils
        await actConnect({ utils })

        await act(async () => result.current.contractWrite.write?.())
        await waitFor(() =>
          expect(result.current.contractWrite.isSuccess).toBeTruthy(),
        )
        hash = result.current.contractWrite.data?.hash
        rerender()
        await waitFor(() =>
          expect(result.current.waitForTransaction.isSuccess).toBeTruthy(),
        )

        await waitFor(() => expect(listenerNoArgs).toHaveBeenCalled())
        await waitFor(() => expect(listenerArgs).toHaveBeenCalled())
        await new Promise((res) => setTimeout(res, 200))
        await waitFor(() => expect(listenerBadArgs).not.toHaveBeenCalled())
      })
    })
  })
})
