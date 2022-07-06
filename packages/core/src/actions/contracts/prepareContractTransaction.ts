import {
  BigNumber,
  CallOverrides,
  Contract,
  PopulatedTransaction,
} from 'ethers/lib/ethers'

import {
  ConnectorNotFoundError,
  ContractMethodDoesNotExistError,
} from '../../errors'
import { fetchSigner } from '../accounts'
import { prepareTransaction } from '../transactions'
import { GetContractArgs, getContract } from './getContract'

export type PrepareContractTransactionConfig = Omit<
  GetContractArgs,
  'signerOrProvider'
> & {
  /** Method to call on contract */
  functionName: string
  /** Arguments to pass contract method */
  args?: any | any[]
  overrides?: CallOverrides
}

export type PrepareContractTransactionResult = PopulatedTransaction & {
  to: NonNullable<PopulatedTransaction['to']>
  gasLimit: NonNullable<PopulatedTransaction['gasLimit']>
}

export async function prepareContractTransaction<
  TContract extends Contract = Contract,
>({
  addressOrName,
  args,
  contractInterface,
  functionName,
  overrides,
}: PrepareContractTransactionConfig): Promise<PrepareContractTransactionResult> {
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
  const { gasLimit } = await prepareTransaction({
    request: unsignedTransaction,
    signerOrProvider: signer,
  })

  console.log('test', gasLimit)

  return {
    ...unsignedTransaction,
    gasLimit: BigNumber.from(gasLimit),
  }
}
