import type {
  FetchDotbitAvatarArgs,
  FetchDotbitAvatarResult,
} from '@wagmi/core'
import { fetchDotbitAvatar } from '@wagmi/core'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseDotbitAvatarArgs = Partial<FetchDotbitAvatarArgs>
export type UseDotbitLookupConfig = QueryConfig<FetchDotbitAvatarResult, Error>

type QueryKeyArgs = UseDotbitAvatarArgs

function queryKey({ address, chainId }: QueryKeyArgs) {
  return [{ entity: 'dotbitAvatar', address, chainId }] as const
}

function queryFn({
  queryKey: [{ address, chainId }],
}: QueryFunctionArgs<typeof queryKey>) {
  if (!address) throw new Error('address is required')
  return fetchDotbitAvatar({ address, chainId })
}

export function useDotbitAvatar({
  address,
  cacheTime,
  chainId: chainId_,
  enabled = true,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseDotbitAvatarArgs & UseDotbitLookupConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  return useQuery(queryKey({ address, chainId }), queryFn, {
    cacheTime,
    enabled: Boolean(enabled && address && chainId),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })
}
