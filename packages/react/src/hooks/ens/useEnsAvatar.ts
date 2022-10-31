import {
  FetchEnsAvatarArgs,
  FetchEnsAvatarResult,
  fetchEnsAvatar,
} from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseEnsAvatarArgs = Partial<FetchEnsAvatarArgs>
export type UseEnsLookupConfig = QueryConfig<FetchEnsAvatarResult, Error>

type QueryKeyArgs = UseEnsAvatarArgs
type QueryKeyConfig = Pick<UseEnsLookupConfig, 'contextKey'>

function queryKey({
  addressOrName,
  chainId,
  contextKey,
}: QueryKeyArgs & QueryKeyConfig) {
  return [{ entity: 'ensAvatar', addressOrName, chainId, contextKey }] as const
}

function queryFn({
  queryKey: [{ addressOrName, chainId }],
}: QueryFunctionArgs<typeof queryKey>) {
  if (!addressOrName) throw new Error('addressOrName is required')
  return fetchEnsAvatar({ addressOrName, chainId })
}

export function useEnsAvatar({
  addressOrName,
  cacheTime,
  chainId: chainId_,
  contextKey,
  enabled = true,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseEnsAvatarArgs & UseEnsLookupConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  return useQuery(queryKey({ addressOrName, chainId, contextKey }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && addressOrName && chainId),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
