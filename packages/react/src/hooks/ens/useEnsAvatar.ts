import type { FetchEnsAvatarArgs, FetchEnsAvatarResult } from '@wagmi/core'
import { fetchEnsAvatar } from '@wagmi/core'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseEnsAvatarArgs = Omit<Partial<FetchEnsAvatarArgs>, 'name'> & {
  name?: FetchEnsAvatarArgs['name'] | null
}
export type UseEnsLookupConfig = QueryConfig<FetchEnsAvatarResult, Error>

type QueryKeyArgs = UseEnsAvatarArgs
type QueryKeyConfig = Pick<UseEnsLookupConfig, 'scopeKey'>

function queryKey({ name, chainId, scopeKey, universalResolverAddress }: QueryKeyArgs & QueryKeyConfig) {
  return [{ entity: 'ensAvatar', name, chainId, scopeKey, universalResolverAddress }] as const
}

function queryFn({
  queryKey: [{ name, chainId, universalResolverAddress }],
}: QueryFunctionArgs<typeof queryKey>) {
  if (!name) throw new Error('name is required')
  return fetchEnsAvatar({ name, chainId, universalResolverAddress })
}

export function useEnsAvatar({
  cacheTime,
  chainId: chainId_,
  enabled = true,
  name,
  scopeKey,
  universalResolverAddress,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseEnsAvatarArgs & UseEnsLookupConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  return useQuery(queryKey({ name, chainId, scopeKey, universalResolverAddress }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && name && chainId),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
