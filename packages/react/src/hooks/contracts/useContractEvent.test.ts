import type { Hash, WriteContractMode } from '@wagmi/core'
import { erc20ABI } from '@wagmi/core'
import type {
  Abi,
  ExtractAbiEventNames,
  ExtractAbiFunctionNames,
  ResolvedConfig,
} from 'abitype'
import { assertType, describe, expect, it, vi } from 'vitest'

import {
  act,
  actConnect,
  getRandomTokenId,
  renderHook,
  wagmiContractConfig,
} from '../../../test'
import { useConnect } from '../accounts'
import type {
  UseWaitForTransactionArgs,
  UseWaitForTransactionConfig,
} from '../transactions/useWaitForTransaction'
import { useWaitForTransaction } from '../transactions/useWaitForTransaction'
import type { UseContractEventConfig } from './useContractEvent'
import { useContractEvent } from './useContractEvent'
import type { UseContractWriteConfig } from './useContractWrite'
import { useContractWrite } from './useContractWrite'

const uniContractAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

function useContractEventsWithWrite<
  TMode extends WriteContractMode,
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
    config: UseContractWriteConfig<TMode, TAbi, TFunctionName>
  }
  waitForTransaction?: UseWaitForTransactionArgs & UseWaitForTransactionConfig
}) {
  return {
    connect: useConnect(),
    contractEvent1: useContractEvent(config.contractEvent1.config),
    contractEvent2: useContractEvent(config.contractEvent2.config),
    contractEvent3: useContractEvent(config.contractEvent3.config),
    contractWrite: useContractWrite<TMode, TAbi, TFunctionName>(
      config.contractWrite.config,
    ),
    waitForTransaction: useWaitForTransaction(config.waitForTransaction),
  }
}

describe('useContractEvent', () => {
  it('mounts', () => {
    const listener = vi.fn()
    renderHook(() =>
      useContractEvent({
        address: uniContractAddress,
        abi: erc20ABI,
        eventName: 'Transfer',
        listener(from, to, value) {
          assertType<ResolvedConfig['AddressType']>(from)
          assertType<ResolvedConfig['AddressType']>(to)
          assertType<ResolvedConfig['BigIntType'] | null>(value)
          listener(from, to, value)
        },
      }),
    )
    expect(listener).toHaveBeenCalledTimes(0)
  })

  describe('configuration', () => {
    it('address', () => {
      const listener = vi.fn()
      renderHook(() =>
        useContractEvent({
          address: uniContractAddress,
          abi: erc20ABI,
          eventName: 'Transfer',
          listener(from, to, value) {
            assertType<ResolvedConfig['AddressType']>(from)
            assertType<ResolvedConfig['AddressType']>(to)
            assertType<ResolvedConfig['BigIntType'] | null>(value)
            listener(from, to, value)
          },
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
        await waitFor(() => expect(listenerBadArgs).not.toHaveBeenCalled())
      })
    })
  })

  describe('behavior', () => {
    it('does not run when property is undefined', async () => {
      const listener = vi.fn()
      const config = {
        abi: erc20ABI,
        eventName: 'Transfer',
        listener,
        once: true,
      } as const
      renderHook(() => useContractEvent(config))
      expect(listener).toHaveBeenCalledTimes(0)
    })
  })
})
