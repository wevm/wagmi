import * as React from 'react'
import { FetchBalanceArgs, FetchBalanceResult, fetchBalance } from '@wagmi/core'
import { useQuery } from 'react-query'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import { useChainId, useGetterWithConfig } from '../utils'

export type UseBalanceArgs = Partial<FetchBalanceArgs> & {
  /** Subscribe to changes */
  watch?: boolean
}

export type UseBalanceConfig = QueryConfig<FetchBalanceResult, Error>

export const queryKey = ({
  addressOrName,
  chainId,
  formatUnits,
  token,
}: Partial<FetchBalanceArgs> & {
  chainId?: number
}) =>
  [{ entity: 'balance', addressOrName, chainId, formatUnits, token }] as const

const queryFn = ({
  queryKey: [{ addressOrName, formatUnits, token }],
}: QueryFunctionArgs<typeof queryKey>) => {
  if (!addressOrName) throw new Error('address is required')
  return fetchBalance({ addressOrName, formatUnits, token })
}

export function useBalance({
  addressOrName: addressOrName_,
  formatUnits: formatUnits_ = 'ether',
  token: token_,
  watch,
  cacheTime,
  enabled = true,
  staleTime,
  onError,
  onSettled,
  onSuccess,
}: UseBalanceArgs & UseBalanceConfig = {}) {
  const chainId = useChainId()
  const {
    config: { addressOrName, formatUnits, token },
    forceEnabled,
    getter,
  } = useGetterWithConfig<FetchBalanceArgs>({
    addressOrName: addressOrName_,
    formatUnits: formatUnits_,
    token: token_,
  })

  const balanceQuery = useQuery(
    queryKey({ addressOrName, chainId, formatUnits, token }),
    queryFn,
    {
      cacheTime,
      enabled: forceEnabled || Boolean(enabled && addressOrName),
      staleTime,
      onError,
      onSettled,
      onSuccess,
    },
  )

  const { data: blockNumber } = useBlockNumber({ watch })
  React.useEffect(() => {
    if (!enabled && !forceEnabled) return
    if (!watch) return
    if (!blockNumber) return
    if (!addressOrName) return
    balanceQuery.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber])

  return { ...balanceQuery, getBalance: getter(balanceQuery.refetch) }
}
