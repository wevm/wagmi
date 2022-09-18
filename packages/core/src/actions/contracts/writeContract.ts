import { CallOverrides, PopulatedTransaction, providers } from 'ethers'

import { ConnectorNotFoundError } from '../../errors'
import { Address } from '../../types'
import { assertActiveChain } from '../../utils'
import { fetchSigner } from '../accounts'
import { SendTransactionResult, sendTransaction } from '../transactions'
import { GetContractArgs } from './getContract'
import { prepareWriteContract } from './prepareWriteContract'

export type WriteContractPreparedArgs = {
  /**
   * `recklesslyUnprepared`: Allow to pass through unprepared config. Note: This has
   * [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks),
   * it is highly recommended to not use this and instead prepare the request upfront
   * using the {@link prepareWriteContract} function.
   *
   * `prepared`: The request has been prepared with parameters required for sending a transaction
   * via the {@link prepareWriteContract} function
   * */
  mode: 'prepared'
  /** The prepared request. */
  request: PopulatedTransaction & {
    to: Address
    gasLimit: NonNullable<PopulatedTransaction['gasLimit']>
  }
}
export type WriteContractUnpreparedArgs = {
  mode: 'recklesslyUnprepared'
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

/**
 * @description Function to call a contract write method.
 *
 * It is recommended to pair this with the {@link prepareWriteContract} function
 * to avoid [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks).
 *
 * @example
 * import { prepareWriteContract, writeContract } from '@wagmi/core'
 *
 * const config = await prepareWriteContract({
 *   addressOrName: '0x...',
 *   contractInterface: wagmiAbi,
 *   functionName: 'mint',
 * })
 * const result = await writeContract(config)
 */
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
  /********************************************************************/
  /** START: iOS App Link cautious code.                              */
  /** Do not perform any async operations in this block.              */
  /** Ref: wagmi.sh/docs/prepare-hooks/intro#ios-app-link-constraints */
  /********************************************************************/

  const signer = await fetchSigner<providers.JsonRpcSigner>()
  if (!signer) throw new ConnectorNotFoundError()

  if (chainId) assertActiveChain({ chainId })

  if (mode === 'prepared') {
    if (!request_) throw new Error('`request` is required')
  }

  const request =
    mode === 'recklesslyUnprepared'
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

  const transaction = await sendTransaction({
    request,
    mode: 'prepared',
  })

  /********************************************************************/
  /** END: iOS App Link cautious code.                                */
  /** Go nuts!                                                        */
  /********************************************************************/

  return transaction
}
