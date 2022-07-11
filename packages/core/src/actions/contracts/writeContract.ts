import { CallOverrides, PopulatedTransaction } from 'ethers'

import { ChainMismatchError } from '../../errors'
import { getNetwork } from '../accounts'
import { SendTransactionResult, sendTransaction } from '../transactions'
import { GetContractArgs } from './getContract'
import { prepareWriteContract } from './prepareWriteContract'

export type WriteContractPreparedArgs = {
  /**
   * `dangerouslyUnprepared`: Allow to pass through unprepared config. Note: This has harmful
   * UX side-effects, it is highly recommended to not use this and instead prepare the request upfront
   * using the `prepareWriteContract` function.
   *
   * `prepared`: The request has been prepared with parameters required for sending a transaction
   * via the `prepareWriteContract` function
   * */
  mode: 'prepared'
  /** The prepared request. */
  request: PopulatedTransaction & {
    to: NonNullable<PopulatedTransaction['to']>
    gasLimit: NonNullable<PopulatedTransaction['gasLimit']>
  }
}
export type WriteContractUnpreparedArgs = {
  mode: 'dangerouslyUnprepared'
  request?: undefined
}

export type WriteContractArgs = Omit<GetContractArgs, 'signerOrProvider'> & {
  /** Chain ID used to validate if the signer is connected to the target chain */
  chainId?: number
  /** Method to call on contract */
  functionName: string
  /** Arguments to pass contract method */
  args?: any | any[]
  overrides?: CallOverrides
} & (WriteContractUnpreparedArgs | WriteContractPreparedArgs)
export type WriteContractResult = SendTransactionResult

export async function writeContract({
  addressOrName,
  args,
  chainId,
  contractInterface,
  functionName,
  mode,
  overrides,
  request: request_,
}: WriteContractArgs): Promise<WriteContractResult> {
  const { chain: activeChain, chains } = getNetwork()
  const activeChainId = activeChain?.id
  if (chainId && chainId !== activeChainId) {
    throw new ChainMismatchError({
      activeChain:
        chains.find((x) => x.id === activeChainId)?.name ??
        `Chain ${activeChainId}`,
      targetChain:
        chains.find((x) => x.id === chainId)?.name ?? `Chain ${chainId}`,
    })
  }

  if (mode === 'prepared') {
    if (!request_) throw new Error('`request` is required')
  }

  const request =
    mode === 'dangerouslyUnprepared'
      ? (
          await prepareWriteContract({
            addressOrName,
            args,
            contractInterface,
            functionName,
            overrides,
          })
        ).request
      : request_

  return sendTransaction({
    request,
    mode: 'prepared',
  })
}
