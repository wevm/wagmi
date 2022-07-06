import { providers } from 'ethers'
import { isAddress } from 'ethers/lib/utils'

import { fetchEnsAddress } from '../ens'
import { getProvider } from '../providers'

export type PrepareTransactionArgs = {
  request: providers.TransactionRequest & {
    to: NonNullable<providers.TransactionRequest['to']>
  }
  signerOrProvider?: providers.JsonRpcSigner | providers.Provider
}

export type PrepareTransactionResult = providers.TransactionRequest & {
  to: NonNullable<providers.TransactionRequest['to']>
  gasLimit: NonNullable<providers.TransactionRequest['gasLimit']>
}

export async function prepareTransaction({
  request,
  signerOrProvider = getProvider(),
}: PrepareTransactionArgs): Promise<PrepareTransactionResult> {
  const [to, gasLimit] = await Promise.all([
    isAddress(request.to)
      ? Promise.resolve(request.to)
      : fetchEnsAddress({ name: request.to }),
    request.gasLimit
      ? Promise.resolve(request.gasLimit)
      : signerOrProvider.estimateGas(request),
  ])

  return { ...request, gasLimit, to: to as string }
}
