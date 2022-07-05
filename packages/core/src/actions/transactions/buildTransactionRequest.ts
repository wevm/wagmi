import { providers } from 'ethers'
import { isAddress } from 'ethers/lib/utils'

import { fetchEnsAddress } from '../ens'
import { getProvider } from '../providers'

export type BuildTransactionRequestArgs = {
  request: Partial<providers.TransactionRequest>
  signerOrProvider?: providers.JsonRpcSigner | providers.Provider
}

export type BuildTransactionRequestResult = providers.TransactionRequest

export async function buildTransactionRequest({
  request,
  signerOrProvider = getProvider(),
}: BuildTransactionRequestArgs): Promise<BuildTransactionRequestResult> {
  const [toResult, gasLimitResult] = await Promise.allSettled([
    request.to
      ? isAddress(request.to)
        ? Promise.resolve(request.to)
        : fetchEnsAddress({ name: request.to })
      : undefined,
    request.gasLimit
      ? Promise.resolve(request.gasLimit)
      : signerOrProvider.estimateGas(request),
  ])

  const gasLimit =
    gasLimitResult.status === 'fulfilled' ? gasLimitResult.value : undefined
  const to =
    toResult.status === 'fulfilled' ? toResult.value || undefined : undefined

  return { ...request, gasLimit, to }
}
