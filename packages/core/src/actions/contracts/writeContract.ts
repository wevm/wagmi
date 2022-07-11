import { CallOverrides, PopulatedTransaction } from 'ethers'

import { ChainMismatchError } from '../../errors'
import { getNetwork } from '../accounts'
import {
  SendTransactionPreparedRequest,
  SendTransactionResult,
  sendTransaction,
} from '../transactions'
import { GetContractArgs } from './getContract'
import { prepareWriteContract } from './prepareWriteContract'

export type WriteContractPreparedArgs = {
  type: 'prepared'
  request: PopulatedTransaction & {
    to: NonNullable<PopulatedTransaction['to']>
    gasLimit: NonNullable<PopulatedTransaction['gasLimit']>
  }
}
export type WriteContractUnpreparedArgs = {
  type: 'dangerouslyUnprepared'
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
  overrides,
  request: request_,
  type,
}: WriteContractArgs): Promise<WriteContractResult> {
  const { chain: activeChain, chains } = getNetwork()
  const activeChainId = activeChain?.id
  if (chainId && chainId !== activeChain?.id) {
    throw new ChainMismatchError({
      activeChain:
        chains.find((x) => x.id === activeChainId)?.name ??
        `Chain ${activeChainId}`,
      targetChain:
        chains.find((x) => x.id === chainId)?.name ?? `Chain ${chainId}`,
    })
  }

  if (type === 'prepared') {
    if (!request_) throw new Error('`request` is required')
  }

  const request =
    type === 'dangerouslyUnprepared'
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
    request: request as SendTransactionPreparedRequest,
    type: 'prepared',
  })
}
