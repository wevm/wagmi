import {
  WaitForTransactionArgs,
  WaitForTransactionResult,
  waitForTransaction,
} from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseWaitForTransactionArgs = Partial<WaitForTransactionArgs>
export type UseWaitForTransactionConfig = QueryConfig<
  WaitForTransactionResult,
  Error
>

type QueryKeyArgs = UseWaitForTransactionArgs
type QueryKeyConfig = Pick<UseWaitForTransactionConfig, 'scopeKey'>

function queryKey({
  confirmations,
  chainId,
  hash,
  scopeKey,
  timeout,
  wait,
}: QueryKeyArgs & QueryKeyConfig) {
  return [
    {
      entity: 'waitForTransaction',
      confirmations,
      chainId,
      hash,
      scopeKey,
      timeout,
      wait,
    },
  ] as const
}

function queryFn({
  queryKey: [{ chainId, confirmations, hash, timeout, wait }],
}: QueryFunctionArgs<typeof queryKey>) {
  return waitForTransaction({ chainId, confirmations, hash, timeout, wait })
}

export function useWaitForTransaction({
  chainId: chainId_,
  confirmations,
  hash,
  timeout,
  wait,
  cacheTime,
  enabled = true,
  scopeKey,
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseWaitForTransactionArgs & UseWaitForTransactionConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  return useQuery(
    queryKey({ chainId, confirmations, hash, scopeKey, timeout, wait }),
    queryFn,
    {
      cacheTime,
      enabled: Boolean(enabled && (hash || wait)),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )
}
