import {
  BigNumber,
  CallOverrides,
  Contract,
  PopulatedTransaction,
} from 'ethers/lib/ethers'

import { ConnectorNotFoundError } from '../../errors'
import { fetchSigner } from '../accounts'
import { buildTransactionRequest } from '../transactions'
import { GetContractArgs, getContract } from './getContract'

export type BuildContractTransactionConfig = Omit<
  GetContractArgs,
  'signerOrProvider'
> & {
  /** Method to call on contract */
  functionName: string
  /** Arguments to pass contract method */
  args?: any | any[]
  overrides?: CallOverrides
}

export type BuildContractTransactionResult = PopulatedTransaction

export async function buildContractTransaction<
  TContract extends Contract = Contract,
>({
  addressOrName,
  args,
  contractInterface,
  functionName,
  overrides,
}: BuildContractTransactionConfig): Promise<BuildContractTransactionResult> {
  const signer = await fetchSigner()
  if (!signer) throw new ConnectorNotFoundError()

  const contract = getContract<TContract>({
    addressOrName,
    contractInterface,
    signerOrProvider: signer,
  })

  const populateTransactionFn = contract.populateTransaction[functionName]
  if (!populateTransactionFn) throw new Error('TODO')

  const params = [
    ...(Array.isArray(args) ? args : args ? [args] : []),
    ...(overrides ? [overrides] : []),
  ]
  const unsignedTransaction = await populateTransactionFn(...params)
  const { gasLimit } = await buildTransactionRequest({
    request: unsignedTransaction,
    signerOrProvider: signer,
  })

  return {
    ...unsignedTransaction,
    gasLimit: gasLimit ? BigNumber.from(gasLimit) : undefined,
  }
}
