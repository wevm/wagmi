import type { FetchEnsAddressArgs, FetchEnsAddressResult } from '@wagmi/core'
import { fetchEnsAddress } from '@wagmi/core'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseEnsAddressArgs = Omit<Partial<FetchEnsAddressArgs>, 'name'> & {
  name?: FetchEnsAddressArgs['name'] | null
}
export type UseEnsAddressConfig = QueryConfig<FetchEnsAddressResult, Error>

type QueryKeyArgs = UseEnsAddressArgs
type QueryKeyConfig = Pick<UseEnsAddressConfig, 'scopeKey'>

function queryKey({
  chainId,
  name,
  scopeKey,
  universalResolverAddress,
}: QueryKeyArgs & QueryKeyConfig) {
  return [
    { entity: 'ensAddress', chainId, name, scopeKey, universalResolverAddress },
  ] as const
}

function queryFn({
  queryKey: [{ chainId, name, universalResolverAddress }],
}: QueryFunctionArgs<typeof queryKey>) {
  if (!name) throw new Error('name is required')
  return fetchEnsAddress({ chainId, name, universalResolverAddress })
}

export function useEnsAddress({
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
}: UseEnsAddressArgs & UseEnsAddressConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  return useQuery(
    queryKey({ chainId, name, scopeKey, universalResolverAddress }),
    queryFn,
    {
      cacheTime,
      enabled: Boolean(enabled && chainId && name),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )
}
