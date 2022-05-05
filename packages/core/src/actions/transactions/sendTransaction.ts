import { providers } from 'ethers'

import { ConnectorNotFoundError, UserRejectedRequestError } from '../../errors'
import { fetchSigner } from '../accounts'

export type SendTransactionArgs = {
  /** Object to use when creating transaction */
  request: providers.TransactionRequest
}

export type SendTransactionResult = providers.TransactionResponse

export async function sendTransaction(
  args: SendTransactionArgs,
): Promise<SendTransactionResult> {
  try {
    const signer = await fetchSigner()
    if (!signer) throw new ConnectorNotFoundError()

    const transaction = await signer.sendTransaction(args.request)
    return transaction
  } catch (error_) {
    let error: Error = <Error>error_
    if ((<ProviderRpcError>error_).code === 4001)
      error = new UserRejectedRequestError()
    throw error
  }
}
