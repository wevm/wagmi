import type { FetchFeeDataArgs, FetchFeeDataResult } from '@wagmi/core'
import { fetchFeeData } from '@wagmi/core'
import * as React from 'react'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useInvalidateOnBlock, useQuery } from '../utils'

export type UseFeeDataArgs = Partial<FetchFeeDataArgs> & {
  /** Subscribe to changes */
  watch?: boolean
}
export type UseFeedDataConfig = QueryConfig<FetchFeeDataResult, Error>

type QueryKeyArgs = Partial<FetchFeeDataArgs>
type QueryKeyConfig = Pick<UseFeedDataConfig, 'scopeKey'>

function queryKey({
  chainId,
  formatUnits,
  scopeKey,
}: QueryKeyArgs & QueryKeyConfig) {
  return [{ entity: 'feeData', chainId, formatUnits, scopeKey }] as const
}

function queryFn({
  queryKey: [{ chainId, formatUnits }],
}: QueryFunctionArgs<typeof queryKey>) {
  return fetchFeeData({ chainId, formatUnits })
}

export function useFeeData({
  cacheTime,
  chainId: chainId_,
  enabled = true,
  formatUnits = 'wei',
  scopeKey,
  staleTime,
  suspense,
  watch,
  onError,
  onSettled,
  onSuccess,
}: UseFeeDataArgs & UseFeedDataConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  const queryKey_ = React.useMemo(
    () =>
      queryKey({
        chainId,
        formatUnits,
        scopeKey,
      }),
    [chainId, formatUnits, scopeKey],
  )
  const feeDataQuery = useQuery(queryKey_, queryFn, {
    cacheTime,
    enabled,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })

  useInvalidateOnBlock({
    chainId,
    enabled: Boolean(enabled && watch),
    queryKey: queryKey_,
  })

  return feeDataQuery
}
