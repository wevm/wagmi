import { CallOverrides, Contract as EthersContract, providers } from 'ethers'

import { getClient } from '../../client'
import {
  ConnectorNotFoundError,
  ProviderRpcError,
  UserRejectedRequestError,
} from '../../errors'
import { GetContractArgs, getContract } from './getContract'

export type WriteContractArgs = GetContractArgs

export type WriteContractConfig = {
  /** Arguments to pass contract method */
  args?: any | any[]
  overrides?: CallOverrides
}

export type WriteContractResult = providers.TransactionResponse

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
        `"${functionName}" does not exist in interface for contract "${contractConfig.addressOrName}"`,
      )
    const response = (await contractFunction(
      ...params,
    )) as providers.TransactionResponse
    return response
  } catch (error) {
    if ((<ProviderRpcError>error).code === 4001)
      throw new UserRejectedRequestError(error)
    throw error
  }
}
