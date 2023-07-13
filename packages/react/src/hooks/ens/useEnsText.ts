import type { FetchEnsTextArgs, FetchEnsTextResult } from '@wagmi/core'
import { fetchEnsText } from '@wagmi/core'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseEnsTextArgs = Partial<FetchEnsTextArgs>
export type UseEnsTextConfig = QueryConfig<FetchEnsTextResult, Error>

type QueryKeyArgs = UseEnsTextArgs
type QueryKeyConfig = Pick<UseEnsTextConfig, 'scopeKey'>

function queryKey({
  name,
  key,
  chainId,
  scopeKey,
}: QueryKeyArgs & QueryKeyConfig) {
  return [{ entity: 'ensText', name, key, chainId, scopeKey }] as const
}

function queryFn({
  queryKey: [{ name, key, chainId }],
}: QueryFunctionArgs<typeof queryKey>) {
  if (!name) throw new Error('name is required')
  if (!key) throw new Error('key is required')
  return fetchEnsText({ name, key, chainId })
}

export function useEnsText({
  name,
  key,
  cacheTime,
  chainId: chainId_,
  enabled = true,
  scopeKey,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseEnsTextArgs & UseEnsTextConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  return useQuery(queryKey({ name, key, chainId, scopeKey }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && name && key && chainId),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
