import type {
  WaitForTransactionArgs,
  WaitForTransactionResult,
} from '@wagmi/core'
import { waitForTransaction } from '@wagmi/core'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseWaitForTransactionArgs = Partial<WaitForTransactionArgs>
export type UseWaitForTransactionConfig = QueryConfig<
  WaitForTransactionResult,
  Error
>

type QueryKeyArgs = Partial<UseWaitForTransactionArgs>
type QueryKeyConfig = Pick<UseWaitForTransactionConfig, 'scopeKey'>

function queryKey({
  confirmations,
  chainId,
  hash,
  scopeKey,
  timeout,
}: QueryKeyArgs & QueryKeyConfig) {
  return [
    {
      entity: 'waitForTransaction',
      confirmations,
      chainId,
      hash,
      scopeKey,
      timeout,
    },
  ] as const
}

function queryFn({
  onReplaced,
}: {
  onReplaced?: WaitForTransactionArgs['onReplaced']
}) {
  return ({
    queryKey: [{ chainId, confirmations, hash, timeout }],
  }: QueryFunctionArgs<typeof queryKey>) => {
    if (!hash) throw new Error('hash is required')
    return waitForTransaction({
      chainId,
      confirmations,
      hash,
      onReplaced,
      timeout,
    })
  }
}

export function useWaitForTransaction({
  chainId: chainId_,
  confirmations,
  hash,
  timeout,
  cacheTime,
  enabled = true,
  scopeKey,
  staleTime,
  suspense,
  onError,
  onReplaced,
  onSettled,
  onSuccess,
}: UseWaitForTransactionArgs & UseWaitForTransactionConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  return useQuery(
    queryKey({ chainId, confirmations, hash, scopeKey, timeout }),
    queryFn({ onReplaced }),
    {
      cacheTime,
      enabled: Boolean(enabled && hash),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )
}
