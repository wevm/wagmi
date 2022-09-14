import { erc20ABI } from '@wagmi/core'
import { Abi, ExtractAbiEventNames, ExtractAbiFunctionNames } from 'abitype'
import { describe, expect, it, vi } from 'vitest'

import { act, actConnect, renderHook, wagmiContractConfig } from '../../../test'
import { useConnect } from '../accounts'
import {
  UseWaitForTransactionArgs,
  UseWaitForTransactionConfig,
  useWaitForTransaction,
} from '../transactions/useWaitForTransaction'
import { UseContractEventConfig, useContractEvent } from './useContractEvent'
import { UseContractWriteConfig, useContractWrite } from './useContractWrite'

const uniContractAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

function useContractEventWithWrite<
  TAbi extends Abi | readonly unknown[],
  TEventName extends TAbi extends Abi ? ExtractAbiEventNames<TAbi> : string,
  TFunctionName extends TAbi extends Abi
    ? ExtractAbiFunctionNames<TAbi, 'payable' | 'nonpayable'>
    : string,
>(config: {
  contractEvent: {
    config: UseContractEventConfig<TAbi, TEventName>
  }
  contractWrite: {
    config: UseContractWriteConfig<TAbi, TFunctionName>
  }
  waitForTransaction?: UseWaitForTransactionArgs & UseWaitForTransactionConfig
}) {
  return {
    connect: useConnect(),
    contractEvent: useContractEvent(config.contractEvent.config),
    contractWrite: useContractWrite(config.contractWrite.config),
    waitForTransaction: useWaitForTransaction(config.waitForTransaction),
  }
}

describe('useContractEvent', () => {
  it('mounts', () => {
    const callback = vi.fn()
    renderHook(() =>
      useContractEvent({
        addressOrName: uniContractAddress,
        contractInterface: erc20ABI,
        eventName: 'Transfer',
        callback,
      }),
    )
    expect(callback).toHaveBeenCalledTimes(0)
  })

  describe('configuration', () => {
    describe('once', () => {
      it('listens', async () => {
        let hash: string | undefined = undefined

        const callback = vi.fn()
        const utils = renderHook(() =>
          useContractEventWithWrite({
            contractEvent: {
              config: {
                ...wagmiContractConfig,
                eventName: 'Transfer',
                callback,
              },
            },
            contractWrite: {
              config: {
                mode: 'recklesslyUnprepared',
                ...wagmiContractConfig,
                functionName: 'mint',
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
        await waitFor(() => expect(callback).toHaveBeenCalled())
      })
    })
  })
})
