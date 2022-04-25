import { WriteContractArgs, erc20ABI } from '@wagmi/core'

import {
  act,
  actConnect,
  getSigners,
  getUnclaimedTokenId,
  renderHook,
} from '../../../test'
import { useConnect } from '../accounts'
import {
  UseWaitForTransactionArgs,
  UseWaitForTransactionConfig,
  useWaitForTransaction,
} from '../transactions/useWaitForTransaction'
import { UseContractConfig } from './useContract'
import { UseContractEventConfig, useContractEvent } from './useContractEvent'
import {
  UseContractWriteArgs,
  UseContractWriteConfig,
  useContractWrite,
} from './useContractWrite'

const uniContractAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
const mlootContractConfig = {
  addressOrName: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
  contractInterface: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'approved',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
      name: 'claim',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
}

function useContractEventWithWrite(config: {
  contractEvent: {
    contractConfig: UseContractConfig
    eventName: string
    listener: (...event: Array<any>) => void
    config?: UseContractEventConfig
  }
  contractWrite: {
    contractConfig: WriteContractArgs
    functionName: string
    config?: UseContractWriteArgs & UseContractWriteConfig
  }
  waitForTransaction?: UseWaitForTransactionArgs & UseWaitForTransactionConfig
}) {
  return {
    connect: useConnect(),
    contractEvent: useContractEvent(
      config.contractEvent.contractConfig,
      config.contractEvent.eventName,
      config.contractEvent.listener,
      config.contractEvent.config,
    ),
    contractWrite: useContractWrite(
      config.contractWrite.contractConfig,
      config.contractWrite.functionName,
      config.contractWrite.config,
    ),
    waitForTransaction: useWaitForTransaction(config.waitForTransaction),
  }
}

const timeout = 15_000

describe('useContractEvent', () => {
  it('mounts', () => {
    const listener = jest.fn()
    renderHook(() =>
      useContractEvent(
        {
          addressOrName: uniContractAddress,
          contractInterface: erc20ABI,
        },
        'Transfer',
        listener,
      ),
    )
    expect(listener).toHaveBeenCalledTimes(0)
  })

  describe('configuration', () => {
    describe('once', () => {
      jest.setTimeout(timeout)
      it('listens', async () => {
        const tokenId = await getUnclaimedTokenId(
          '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
        )
        if (!tokenId) return

        let hash: string | undefined = undefined
        let functionName = 'claim'
        let args: any | any[] = tokenId

        const listener = jest.fn()
        const utils = renderHook(() =>
          useContractEventWithWrite({
            contractEvent: {
              contractConfig: mlootContractConfig,
              eventName: 'Approval',
              listener,
            },
            contractWrite: {
              contractConfig: mlootContractConfig,
              functionName,
              config: { args },
            },
            waitForTransaction: { hash },
          }),
        )
        const { result, rerender, waitFor } = utils
        await actConnect({ utils })

        await act(async () => result.current.contractWrite.write())
        await waitFor(
          () => expect(result.current.contractWrite.isSuccess).toBeTruthy(),
          { timeout },
        )
        hash = result.current.contractWrite.data?.hash
        rerender()
        await waitFor(() =>
          expect(result.current.waitForTransaction.isSuccess).toBeTruthy(),
        )

        const to = await getSigners()[1].getAddress()
        functionName = 'approve'
        args = [to, tokenId]
        rerender()

        await actConnect({ utils })
        await act(async () => result.current.contractWrite.write())
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
