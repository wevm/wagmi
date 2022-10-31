import {
  FetchEnsResolverArgs,
  FetchEnsResolverResult,
  fetchEnsResolver,
} from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseEnsResolverArgs = Partial<FetchEnsResolverArgs>
export type UseEnsResolverConfig = QueryConfig<FetchEnsResolverResult, Error>

type QueryKeyArgs = UseEnsResolverArgs
type QueryKeyConfig = Pick<UseEnsResolverConfig, 'contextKey'>

function queryKey({
  chainId,
  contextKey,
  name,
}: QueryKeyArgs & QueryKeyConfig) {
  return [{ entity: 'ensResolver', chainId, contextKey, name }] as const
}

function queryFn({
  queryKey: [{ chainId, name }],
}: QueryFunctionArgs<typeof queryKey>) {
  if (!name) throw new Error('name is required')
  return fetchEnsResolver({ chainId, name })
}

export function useEnsResolver({
  cacheTime,
  chainId: chainId_,
  contextKey,
  enabled = true,
  name,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseEnsResolverArgs & UseEnsResolverConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  return useQuery(queryKey({ chainId, contextKey, name }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && chainId && name),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
