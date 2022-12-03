import type { FetchEnsResolverArgs, FetchEnsResolverResult } from '@wagmi/core'
import { fetchEnsResolver } from '@wagmi/core'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseEnsResolverArgs = Partial<FetchEnsResolverArgs>
export type UseEnsResolverConfig = QueryConfig<FetchEnsResolverResult, Error>

type QueryKeyArgs = UseEnsResolverArgs
type QueryKeyConfig = Pick<UseEnsResolverConfig, 'scopeKey'>

function queryKey({ chainId, name, scopeKey }: QueryKeyArgs & QueryKeyConfig) {
  return [
    { entity: 'ensResolver', chainId, name, scopeKey, persist: false },
  ] as const
}

function queryFn({
  queryKey: [{ chainId, name }],
}: QueryFunctionArgs<typeof queryKey>) {
  if (!name) throw new Error('name is required')
  return fetchEnsResolver({ chainId, name })
}

export function useEnsResolver({
  chainId: chainId_,
  name,
  enabled = true,
  scopeKey,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseEnsResolverArgs & UseEnsResolverConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  return useQuery(queryKey({ chainId, name, scopeKey }), queryFn, {
    cacheTime: 0,
    enabled: Boolean(enabled && chainId && name),
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
