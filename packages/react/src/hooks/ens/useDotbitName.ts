import type { FetchDotbitNameArgs, FetchDotbitNameResult } from '@wagmi/core'
import { fetchDotbitName } from '@wagmi/core'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useQuery } from '../utils'

export type UseDotbitNameArgs = Partial<FetchDotbitNameArgs>
export type UseDotbitNameConfig = QueryConfig<FetchDotbitNameResult, Error>

type QueryKeyArgs = UseDotbitNameArgs

function queryKey({ address, chainId }: QueryKeyArgs) {
  return [{ entity: 'dotbitName', address, chainId }] as const
}

function queryFn({
  queryKey: [{ address, chainId }],
}: QueryFunctionArgs<typeof queryKey>) {
  if (!address) throw new Error('address is required')
  return fetchDotbitName({ address, chainId })
}

export function useDotbitName({
  address,
  cacheTime,
  chainId: chainId_,
  enabled = true,
  staleTime = 1_000 * 60 * 60 * 24, // 24 hours
  suspense,
  onError,
  onSettled,
  onSuccess,
}: UseDotbitNameArgs & UseDotbitNameConfig = {}) {
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
