import {
  CallOverrides,
  Contract,
  PopulatedTransaction,
} from 'ethers/lib/ethers'

import {
  ConnectorNotFoundError,
  ContractMethodDoesNotExistError,
} from '../../errors'
import { Address, Signer } from '../../types'
import { minimizeContractInterface } from '../../utils'
import { fetchSigner } from '../accounts'
import { GetContractArgs, getContract } from './getContract'

export type PrepareWriteContractConfig<TSigner extends Signer = Signer> = Omit<
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
  signer?: TSigner | null
}

export type PrepareWriteContractResult<TSigner extends Signer = Signer> =
  PrepareWriteContractConfig<TSigner> & {
    chainId?: number
    request: PopulatedTransaction & {
      to: Address
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
  TSigner extends Signer = Signer,
>({
  addressOrName,
  args,
  chainId,
  contractInterface: contractInterface_,
  functionName,
  overrides,
  signer: signer_,
}: PrepareWriteContractConfig): Promise<PrepareWriteContractResult<TSigner>> {
  const signer = signer_ ?? (await fetchSigner())
  if (!signer) throw new ConnectorNotFoundError()

  const contract = getContract<TContract>({
    addressOrName,
    contractInterface: contractInterface_,
    signerOrProvider: signer,
  })

  const populateTransactionFn = contract.populateTransaction[functionName]
  if (!populateTransactionFn) {
    throw new ContractMethodDoesNotExistError({
      addressOrName,
      functionName,
    })
  }

  const contractInterface = minimizeContractInterface({
    contractInterface: contract.interface,
    functionName,
  })

  const params = [
    ...(Array.isArray(args) ? args : args ? [args] : []),
    ...(overrides ? [overrides] : []),
  ]
  const unsignedTransaction = (await populateTransactionFn(
    ...params,
  )) as PopulatedTransaction & {
    to: Address
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
