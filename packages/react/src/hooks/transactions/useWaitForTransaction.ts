import {
  WaitForTransactionArgs,
  WaitForTransactionResult,
  waitForTransaction,
} from '@wagmi/core'
import { useQuery } from 'react-query'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useGetterWithConfig } from '../utils'

export type UseWaitForTransactionArgs = Partial<WaitForTransactionArgs>

export type UseWaitForTransactionConfig = QueryConfig<
  WaitForTransactionResult,
  Error
>

export const queryKey = ({
  confirmations,
  chainId,
  hash,
  timeout,
  wait,
}: Partial<WaitForTransactionArgs> & {
  chainId?: number
}) =>
  [
    {
      entity: 'waitForTransaction',
      confirmations,
      chainId,
      hash,
      timeout,
      wait,
    },
  ] as const

const queryFn = ({
  queryKey: [{ confirmations, hash, timeout, wait }],
}: QueryFunctionArgs<typeof queryKey>) => {
  if (!hash || !wait) throw new Error('hash or wait is required')
  return waitForTransaction({ confirmations, hash, timeout, wait })
}

export function useWaitForTransaction({
  confirmations: confirmations_,
  hash: hash_,
  timeout: timeout_,
  wait: wait_,
  cacheTime,
  enabled = true,
  keepPreviousData,
  select,
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseWaitForTransactionArgs & UseWaitForTransactionConfig = {}) {
  const chainId = useChainId()
  const {
    config: { confirmations, hash, timeout, wait },
    forceEnabled,
    getter,
  } = useGetterWithConfig<WaitForTransactionArgs>({
    confirmations: confirmations_,
    hash: hash_,
    timeout: timeout_,
    wait: wait_,
  })

  const waitForTransactionQuery = useQuery(
    queryKey({ confirmations, chainId, hash, timeout, wait }),
    queryFn,
    {
      cacheTime,
      enabled: forceEnabled || Boolean(enabled && (hash || wait)),
      keepPreviousData,
      select,
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )

  return {
    ...waitForTransactionQuery,
    getToken: getter(waitForTransactionQuery.refetch),
  }
}
