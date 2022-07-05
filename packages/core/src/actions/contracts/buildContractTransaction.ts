import { ConnectorNotFoundError } from '@wagmi/core'
import {
  BigNumber,
  CallOverrides,
  Contract,
  PopulatedTransaction,
  providers,
} from 'ethers/lib/ethers'
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
  signer: providers.JsonRpcSigner
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
  signer,
  overrides,
}: BuildContractTransactionConfig): Promise<BuildContractTransactionResult> {
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
  console.log('test222', unsignedTransaction)
  // let gasLimit
  // if (typeof window !== 'undefined') {
  //   const res = await buildTransactionRequest({
  //     request: unsignedTransaction,
  //     signerOrProvider: signer,
  //   })
  //   console.log(res)
  // }
  // console.log('fk2', unsignedTransaction, gasLimit)
  return {
    ...unsignedTransaction,
    // gasLimit: gasLimit ? BigNumber.from(gasLimit) : undefined,
  }
}
