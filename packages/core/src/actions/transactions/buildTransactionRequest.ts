import { providers } from 'ethers'
import { isAddress } from 'ethers/lib/utils'

import { fetchEnsAddress } from '../ens'
import { getProvider } from '../providers'

export type BuildTransactionRequestArgs = {
  request: Partial<providers.TransactionRequest> & {
    to: NonNullable<providers.TransactionRequest['to']>
    value: NonNullable<providers.TransactionRequest['value']>
  }
}

export type BuildTransactionRequestResult = providers.TransactionRequest

export async function buildTransactionRequest({
  request,
}: BuildTransactionRequestArgs): Promise<BuildTransactionRequestResult> {
  const provider = getProvider()

  const [toResult, gasLimitResult] = await Promise.allSettled([
    isAddress(request.to)
      ? Promise.resolve(request.to)
      : fetchEnsAddress({ name: request.to }),
    request.gasLimit
      ? Promise.resolve(request.gasLimit)
      : provider.estimateGas(request),
  ])

  const gasLimit =
    gasLimitResult.status === 'fulfilled' ? gasLimitResult.value : undefined
  const to =
    toResult.status === 'fulfilled' ? toResult.value || undefined : undefined

  return { ...request, gasLimit, to }
}
