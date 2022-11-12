import type { FetchBalanceArgs, FetchBalanceResult } from '@wagmi/core'
import { fetchBalance } from '@wagmi/core'
import * as React from 'react'

import type { QueryConfig, QueryFunctionArgs } from '../../types'
import { useChainId, useInvalidateOnBlock, useQuery } from '../utils'

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
  const queryKey_ = React.useMemo(
    () => queryKey({ address, chainId, formatUnits, scopeKey, token }),
    [address, chainId, formatUnits, scopeKey, token],
  )
  const balanceQuery = useQuery(queryKey_, queryFn, {
    cacheTime,
    enabled: Boolean(enabled && address),
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  })

  useInvalidateOnBlock({
    chainId,
    enabled: Boolean(enabled && watch && address),
    queryKey: queryKey_,
  })

  return balanceQuery
}
