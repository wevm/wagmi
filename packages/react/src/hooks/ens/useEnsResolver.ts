import type { FetchEnsResolverArgs, FetchEnsResolverResult } from '@wagmi/core'
import { fetchEnsResolver } from '@wagmi/core'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseEnsResolverArgs = Omit<Partial<FetchEnsResolverArgs>, 'name'> & {
  name?: FetchEnsResolverArgs['name'] | null
}
export type UseEnsResolverConfig = QueryConfig<FetchEnsResolverResult, Error>

type QueryKeyArgs = UseEnsResolverArgs
type QueryKeyConfig = Pick<UseEnsResolverConfig, 'scopeKey'>

function queryKey({ chainId, name, scopeKey, universalResolverAddress }: QueryKeyArgs & QueryKeyConfig) {
  return [
    { entity: 'ensResolver', chainId, name, scopeKey, persist: false, universalResolverAddress },
  ] as const
}

function queryFn({
  queryKey: [{ chainId, name, universalResolverAddress }],
}: QueryFunctionArgs<typeof queryKey>) {
  if (!name) throw new Error('name is required')
  return fetchEnsResolver({ chainId, name, universalResolverAddress })
}

export function useEnsResolver({
  chainId: chainId_,
  name,
  enabled = true,
  scopeKey,
  universalResolverAddress,
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseEnsResolverArgs & UseEnsResolverConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  return useQuery(queryKey({ chainId, name, scopeKey, universalResolverAddress }), queryFn, {
    cacheTime: 0,
    enabled: Boolean(enabled && chainId && name),
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
