import * as React from 'react'
import { FetchFeeDataArgs, FetchFeeDataResult, fetchFeeData } from '@wagmi/core'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import { useChainId, useQuery } from '../utils'

type UseFeeDataArgs = Partial<FetchFeeDataArgs> & {
  /** Subscribe to changes */
  watch?: boolean
}

export type UseFeedDataConfig = QueryConfig<FetchFeeDataResult, Error>

export const queryKey = ({
  chainId,
  formatUnits,
}: Partial<FetchFeeDataArgs> & {
  chainId?: number
}) => [{ entity: 'feeData', chainId, formatUnits }] as const

const queryFn = ({
  queryKey: [{ chainId, formatUnits }],
}: QueryFunctionArgs<typeof queryKey>) => {
  return fetchFeeData({ chainId, formatUnits })
}

export function useFeeData({
  cacheTime,
  chainId: chainId_,
  enabled = true,
  formatUnits = 'wei',
  staleTime,
  suspense,
  watch,
  onError,
  onSettled,
  onSuccess,
}: UseFeeDataArgs & UseFeedDataConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })

  const feeDataQuery = useQuery(queryKey({ chainId, formatUnits }), queryFn, {
    cacheTime,
    enabled,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })

  const { data: blockNumber } = useBlockNumber({ watch })
  React.useEffect(() => {
    if (!enabled) return
    if (!watch) return
    if (!blockNumber) return
    feeDataQuery.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber])

  return feeDataQuery
}
