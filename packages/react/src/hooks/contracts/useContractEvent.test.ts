import { erc20ABI } from '@wagmi/core'

import {
  act,
  actConnect,
  getSigners,
  getTotalSupply,
  mlootContractConfig,
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
import {
  UseContractWriteArgs,
  UseContractWriteConfig,
  useContractWrite,
} from './useContractWrite'

const uniContractAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

function useContractEventWithWrite(config: {
  contractEvent: {
    config: UseContractEventConfig
  }
  contractWrite: {
    config: UseContractWriteArgs & UseContractWriteConfig
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

const timeout = 15_000

describe('useContractEvent', () => {
  it('mounts', () => {
    const listener = jest.fn()
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
    describe('once', () => {
      jest.setTimeout(timeout)
      it('listens', async () => {
        let hash: string | undefined = undefined
        let functionName = 'mint'

        const listener = jest.fn()
        const utils = renderHook(() =>
          useContractEventWithWrite({
            contractEvent: {
              config: {
                ...mlootContractConfig,
                eventName: 'Approval',
                listener,
              },
            },
            contractWrite: {
              config: {
                mode: 'dangerouslyUnprepared',
                ...wagmiContractConfig,
                functionName,
              },
            },
            waitForTransaction: { hash },
          }),
        )
        const { result, rerender, waitFor } = utils
        await actConnect({ utils })

        await act(async () => result.current.contractWrite.write?.())
        await waitFor(
          () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          { timeout },
        )
        hash = result.current.contractWrite.data?.hash
        rerender()
        await waitFor(() =>
          expect(result.current.waitForTransaction.isSuccess).toBeTruthy(),
        )

        const from = await getSigners()[0]?.getAddress()
        const to = await getSigners()[1]?.getAddress()
        const tokenId = await getTotalSupply(wagmiContractConfig.addressOrName)
        functionName = 'approve'
        args = [from, to, tokenId]
        rerender()

        await actConnect({ utils })
        await act(async () => result.current.contractWrite.write?.())
        await waitFor(
          () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          { timeout },
        )
        hash = result.current.contractWrite.data?.hash
        rerender()
        await waitFor(() =>
          expect(result.current.waitForTransaction.isSuccess).toBeTruthy(),
        )

        expect(listener).toHaveBeenCalled()
      })
    })
  })
})
