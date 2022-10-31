import {
  FetchTransactionArgs,
  FetchTransactionResult,
  fetchTransaction,
} from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseTransactionArgs = Partial<FetchTransactionArgs>
export type UseTransactionConfig = QueryConfig<FetchTransactionResult, Error>

type QueryKeyArgs = UseTransactionArgs
type QueryKeyConfig = Pick<UseTransactionConfig, 'contextKey'>

function queryKey({
  chainId,
  contextKey,
  hash,
}: QueryKeyArgs & QueryKeyConfig) {
  return [{ entity: 'transaction', contextKey, chainId, hash }] as const
}

function queryFn({
  queryKey: [{ chainId, hash }],
}: QueryFunctionArgs<typeof queryKey>) {
  if (!hash) throw new Error('hash is required')
  return fetchTransaction({ chainId, hash })
}

/**
 * @description Fetches transaction for hash
 *
 * @example
 * import { useTransaction } from 'wagmi'
 *
 * const result = useTransaction({
 *  chainId: 1,
 *  hash: '0x...',
 * })
 */
export function useTransaction({
  contextKey,
  cacheTime = 0,
  chainId: chainId_,
  enabled = true,
  hash,
  staleTime,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseTransactionArgs & UseTransactionConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  return useQuery(queryKey({ contextKey, chainId, hash }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && hash),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
