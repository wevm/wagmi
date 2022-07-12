import {
  CallOverrides,
  Contract,
  PopulatedTransaction,
} from 'ethers/lib/ethers'

import {
  ConnectorNotFoundError,
  ContractMethodDoesNotExistError,
} from '../../errors'
import { fetchSigner } from '../accounts'
import { GetContractArgs, getContract } from './getContract'

export type PrepareWriteContractConfig = Omit<
  GetContractArgs,
  'signerOrProvider'
> & {
  /** Chain ID used to validate if the signer is connected to the target chain */
  chainId?: number
  /** Method to call on contract */
  functionName: string
  /** Arguments to pass contract method */
  args?: any | any[]
  overrides?: CallOverrides
}

export type PrepareWriteContractResult = PrepareWriteContractConfig & {
  chainId?: number
  request: PopulatedTransaction & {
    to: NonNullable<PopulatedTransaction['to']>
    gasLimit: NonNullable<PopulatedTransaction['gasLimit']>
  }
  mode: 'prepared'
}

/**
 * @description Prepares the parameters required for a contract write transaction.
 *
 * Returns config to be passed through to `writeContract`.
 *
 * @example
 * import { prepareWriteContract, writeContract } from '@wagmi/core'
 *
 * const config = await prepareWriteContract({
 *  addressOrName: '0x...',
 *  contractInterface: wagmiAbi,
 *  functionName: 'mint',
 * })
 * const result = await writeContract(config)
 */
export async function prepareWriteContract<
  TContract extends Contract = Contract,
>({
  addressOrName,
  args,
  chainId,
  contractInterface,
  functionName,
  overrides,
}: PrepareWriteContractConfig): Promise<PrepareWriteContractResult> {
  const signer = await fetchSigner()
  if (!signer) throw new ConnectorNotFoundError()

  const contract = getContract<TContract>({
    addressOrName,
    contractInterface,
    signerOrProvider: signer,
  })

  const populateTransactionFn = contract.populateTransaction[functionName]
  if (!populateTransactionFn) {
    throw new ContractMethodDoesNotExistError({
      addressOrName,
      functionName,
    })
  }

  const params = [
    ...(Array.isArray(args) ? args : args ? [args] : []),
    ...(overrides ? [overrides] : []),
  ]
  const unsignedTransaction = (await populateTransactionFn(
    ...params,
  )) as PopulatedTransaction & {
    to: string
  }
  const gasLimit =
    unsignedTransaction.gasLimit ||
    (await signer.estimateGas(unsignedTransaction))

  return {
    addressOrName,
    args,
    ...(chainId ? { chainId } : {}),
    contractInterface,
    functionName,
    overrides,
    request: {
      ...unsignedTransaction,
      gasLimit,
    },
    mode: 'prepared',
  }
}
