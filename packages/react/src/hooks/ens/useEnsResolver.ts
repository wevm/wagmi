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
  if (!name) throw new Error('name is required')
  return fetchEnsResolver({ name })
}

export function useEnsResolver({
  name,
  cacheTime,
  enabled = true,
  keepPreviousData,
  select,
  staleTime = Infinity,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseEnsResolverArgs & UseEnsResolverConfig = {}) {
  const chainId = useChainId()
  return useQuery(queryKey({ chainId, name }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && chainId && name),
    keepPreviousData,
    select,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
