import type { FetchEnsNameArgs, FetchEnsNameResult } from '@wagmi/core'
import { fetchEnsName } from '@wagmi/core'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseEnsNameArgs = Partial<FetchEnsNameArgs>
export type UseEnsNameConfig = QueryConfig<FetchEnsNameResult, Error>

type QueryKeyArgs = UseEnsNameArgs
type QueryKeyConfig = Pick<UseEnsNameConfig, 'scopeKey'>

function queryKey({
  address,
  chainId,
  scopeKey,
  universalResolverAddress,
}: QueryKeyArgs & QueryKeyConfig) {
  return [
    { entity: 'ensName', address, chainId, scopeKey, universalResolverAddress },
  ] as const
}

function queryFn({
  queryKey: [{ address, chainId, universalResolverAddress }],
}: QueryFunctionArgs<typeof queryKey>) {
  if (!address) throw new Error('address is required')
  return fetchEnsName({ address, chainId, universalResolverAddress })
}

export function useEnsName({
  address,
  cacheTime,
  chainId: chainId_,
  enabled = true,
  scopeKey,
  universalResolverAddress,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseEnsNameArgs & UseEnsNameConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  return useQuery(
    queryKey({ address, chainId, scopeKey, universalResolverAddress }),
    queryFn,
    {
      cacheTime,
      enabled: Boolean(enabled && address && chainId),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )
}
