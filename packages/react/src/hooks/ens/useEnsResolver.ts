import { useQuery } from 'react-query'
import { FetchEnsResolverResult, fetchEnsResolver } from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId } from '../utils'

export type UseEnsResolverArgs = {
  /** ENS name */
  name?: string
}

export type UseEnsResolverConfig = QueryConfig<FetchEnsResolverResult, Error>

export const queryKey = ({
  chainId,
  name,
}: {
  chainId?: number
  name?: string
}) => [{ entity: 'ensResolver', chainId, name }] as const

const queryFn = ({
  queryKey: [{ name }],
}: QueryFunctionArgs<typeof queryKey>) => {
  if (!name) throw new Error('QueryKey missing name')
  return fetchEnsResolver({ name })
}

/**
 * Fetches ENS resolver for ENS name
 */
export function useEnsResolver({
  name,
  cacheTime,
  enabled = true,
  staleTime = Infinity,
  onError,
  onSettled,
  onSuccess,
}: UseEnsResolverArgs & UseEnsResolverConfig = {}) {
  const chainId = useChainId()
  return useQuery(queryKey({ chainId, name }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && chainId && name),
    staleTime,
    onError,
    onSettled,
    onSuccess,
  })
}
