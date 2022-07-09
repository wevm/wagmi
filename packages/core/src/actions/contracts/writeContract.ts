import { CallOverrides } from 'ethers'

import { ChainMismatchError } from '../../errors'
import { getNetwork } from '../accounts'
import { SendTransactionResult, sendTransaction } from '../transactions'
import { GetContractArgs } from './getContract'
import {
  PrepareWriteContractConfig,
  PrepareWriteContractResult,
  prepareWriteContract,
} from './prepareWriteContract'

export type WriteContractPreparedRequest = {
  type: 'prepared'
  /** The prepared request to use when sending the transaction */
  payload: PrepareWriteContractResult['payload']
}
export type WriteContractUnpreparedRequest = {
  type: 'dangerouslyUnprepared'
  /** A request that has not been "prepared" via `prepareWriteContract`.
   * Providing this may cause UX issues (iOS deep linking issues, delay to
   * open wallet, etc).
   */
  payload: PrepareWriteContractConfig
}

export type WriteContractArgs = Omit<GetContractArgs, 'signerOrProvider'> & {
  /** Chain ID used to validate if the signer is connected to the target chain */
  chainId?: number
  /** Method to call on contract */
  functionName: string
  /** Arguments to pass contract method */
  args?: any | any[]
  overrides?: CallOverrides
}
export type WriteContractResult = SendTransactionResult

export async function writeContract({
  chainId,
  request: request_,
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

  let request = request_
  if (request.type === 'dangerouslyUnprepared') {
    request = await prepareWriteContract(request.payload)
  }
  return await sendTransaction({ request })
}
