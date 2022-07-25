import {
  FetchTransactionArgs,
  FetchTransactionResult,
  fetchTransaction,
} from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

type UseTransactionArgs = Partial<FetchTransactionArgs>

export type UseTransactionConfig = QueryConfig<FetchTransactionResult, Error>

const queryKey = ({ chainId, hash }: Partial<FetchTransactionArgs>) =>
  [{ entity: 'transaction', chainId, hash }] as const

const queryFn = ({
  queryKey: [{ chainId, hash }],
}: QueryFunctionArgs<typeof queryKey>) => {
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

  return useQuery(queryKey({ chainId, hash }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && hash),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
