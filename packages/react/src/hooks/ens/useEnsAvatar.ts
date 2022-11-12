import type { FetchEnsAvatarArgs, FetchEnsAvatarResult } from '@wagmi/core'
import { fetchEnsAvatar } from '@wagmi/core'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseEnsAvatarArgs = Partial<FetchEnsAvatarArgs>
export type UseEnsLookupConfig = QueryConfig<FetchEnsAvatarResult, Error>

type QueryKeyArgs = UseEnsAvatarArgs
type QueryKeyConfig = Pick<UseEnsLookupConfig, 'scopeKey'>

function queryKey({
  address,
  chainId,
  scopeKey,
}: QueryKeyArgs & QueryKeyConfig) {
  return [{ entity: 'ensAvatar', address, chainId, scopeKey }] as const
}

function queryFn({
  queryKey: [{ address, chainId }],
}: QueryFunctionArgs<typeof queryKey>) {
  if (!address) throw new Error('address is required')
  return fetchEnsAvatar({ address, chainId })
}

export function useEnsAvatar({
  address,
  cacheTime,
  chainId: chainId_,
  enabled = true,
  scopeKey,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseEnsAvatarArgs & UseEnsLookupConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  return useQuery(queryKey({ address, chainId, scopeKey }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && address && chainId),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
