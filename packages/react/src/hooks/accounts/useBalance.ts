import type { FetchBalanceArgs, FetchBalanceResult } from '@wagmi/core'
import { fetchBalance } from '@wagmi/core'
import * as React from 'react'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import { useChainId, useQuery } from '../utils'

export type UseBalanceArgs = Partial<FetchBalanceArgs> & {
  /** Subscribe to changes */
  watch?: boolean
}

export type UseBalanceConfig = QueryConfig<FetchBalanceResult, Error>

type QueryKeyArgs = Partial<FetchBalanceArgs>
type QueryKeyConfig = Pick<UseBalanceConfig, 'scopeKey'>

function queryKey({
  address,
  chainId,
  formatUnits,
  scopeKey,
  token,
}: QueryKeyArgs & QueryKeyConfig) {
  return [
    {
      entity: 'balance',
      address,
      chainId,
      formatUnits,
      scopeKey,
      token,
    },
  ] as const
}

function queryFn({
  queryKey: [{ address, chainId, formatUnits, token }],
}: QueryFunctionArgs<typeof queryKey>) {
  if (!address) throw new Error('address is required')
  return fetchBalance({ address, chainId, formatUnits, token })
}

export function useBalance({
  address,
  cacheTime,
  chainId: chainId_,
  enabled = true,
  formatUnits,
  scopeKey,
  staleTime,
  suspense,
  token,
  watch,
  onError,
  onSettled,
  onSuccess,
}: UseBalanceArgs & UseBalanceConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })
  const balanceQuery = useQuery(
    queryKey({ address, chainId, formatUnits, scopeKey, token }),
    queryFn,
    {
      cacheTime,
      enabled: Boolean(enabled && address),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    },
  )

  const { data: blockNumber } = useBlockNumber({ chainId, watch })
  React.useEffect(() => {
    if (!enabled) return
    if (!watch) return
    if (!blockNumber) return
    if (!address) return
    balanceQuery.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber])

  return balanceQuery
}
