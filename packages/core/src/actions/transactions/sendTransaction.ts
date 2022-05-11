import { providers } from 'ethers'

import {
  ConnectorNotFoundError,
  ProviderRpcError,
  UserRejectedRequestError,
} from '../../errors'
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
  } catch (error) {
    if ((<ProviderRpcError>error).code === 4001)
      throw new UserRejectedRequestError(error)
    throw error
  }
}
