import { TransactionResponse } from '@ethersproject/providers'
import { CallOverrides, Contract as EthersContract } from 'ethers/lib/ethers'

import { wagmiClient } from '../../client'
import { ConnectorNotFoundError, UserRejectedRequestError } from '../../errors'

import { GetContractArgs, getContract } from './getContract'

type Config = {
  /** Arguments to pass contract method */
  args?: any | any[]
  overrides?: CallOverrides
}

export async function writeContract<
  Contract extends EthersContract = EthersContract,
>(
  contractConfig: GetContractArgs,
  functionName: string,
  { args, overrides }: Config = {},
): Promise<TransactionResponse> {
  const { connector } = wagmiClient
  const contract = getContract<Contract>(contractConfig)

  if (!connector) throw new ConnectorNotFoundError()
  const params = [
    ...(Array.isArray(args) ? args : args ? [args] : []),
    ...(overrides ? [overrides] : []),
  ]

  try {
    const signer = await connector.getSigner()
    const contract_ = contract.connect(signer)
    const response = (await contract_[functionName](
      ...params,
    )) as TransactionResponse
    return response
  } catch (error_) {
    let error: Error = <Error>error_
    if ((<ProviderRpcError>error_).code === 4001)
      error = new UserRejectedRequestError()
    throw error
  }
}
