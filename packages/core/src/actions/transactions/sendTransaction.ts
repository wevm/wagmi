import { TransactionRequest } from '@ethersproject/providers'

import { wagmiClient } from '../../client'
import { ConnectorNotFoundError, UserRejectedRequestError } from '../../errors'

export type SendTransactionArgs = {
  /** Object to use when creating transaction */
  request: TransactionRequest
}

export async function sendTransaction(args: SendTransactionArgs) {
  const { connector } = wagmiClient

  if (!connector) throw new ConnectorNotFoundError()

  try {
    const signer = await connector.getSigner()
    const transaction = await signer.sendTransaction(args.request)
    return transaction
  } catch (error_) {
    let error: Error = <Error>error_
    if ((<ProviderRpcError>error_).code === 4001)
      error = new UserRejectedRequestError()
    throw error
  }
}
