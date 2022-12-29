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

function useContractEventWithWrite<
  TMode extends WriteContractMode,
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
    config: UseContractWriteConfig<TMode, TAbi, TFunctionName>
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
        const listener = vi.fn()
        const utils = renderHook(() =>
          useContractEventWithWrite({
            contractEvent: {
              config: {
                ...wagmiContractConfig,
                eventName: 'Transfer',
                listener(from, to, value) {
                  assertType<ResolvedConfig['AddressType']>(from)
                  assertType<ResolvedConfig['AddressType']>(to)
                  assertType<ResolvedConfig['BigIntType']>(value)
                  listener(from, to, value)
                },
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
        await waitFor(() => expect(listener).toHaveBeenCalled())
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
