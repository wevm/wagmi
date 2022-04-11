import type { TransactionResponse } from '@ethersproject/providers'
import { CallOverrides, Contract as EthersContract } from 'ethers/lib/ethers'

import { getClient } from '../../client'
import { ConnectorNotFoundError, UserRejectedRequestError } from '../../errors'
import { GetContractArgs, getContract } from './getContract'

export type WriteContractArgs = GetContractArgs

export type WriteContractConfig = {
  /** Arguments to pass contract method */
  args?: any | any[]
  overrides?: CallOverrides
}

export type WriteContractResult = TransactionResponse

export async function writeContract<
  Contract extends EthersContract = EthersContract,
>(
  contractConfig: WriteContractArgs,
  functionName: string,
  { args, overrides }: WriteContractConfig = {},
): Promise<WriteContractResult> {
  const client = getClient()
  if (!client.connector) throw new ConnectorNotFoundError()

  const params = [
    ...(Array.isArray(args) ? args : args ? [args] : []),
    ...(overrides ? [overrides] : []),
  ]

  try {
    const signer = await client.connector.getSigner()
    const contract = getContract<Contract>(contractConfig)
    const contractWithSigner = contract.connect(signer)
    const contractFunction = contractWithSigner[functionName]
    if (!contractFunction)
      console.warn(
        `"${functionName}" does not in interface for contract "${contractConfig.addressOrName}"`,
      )
    const response = (await contractFunction(...params)) as TransactionResponse
    return response
  } catch (error_) {
    let error: Error = <Error>error_
    if ((<ProviderRpcError>error_).code === 4001)
      error = new UserRejectedRequestError()
    throw error
  }
}
