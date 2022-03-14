import { FetchBalanceArgs, FetchBalanceResult, fetchBalance } from '@wagmi/core'
import { useEffect } from 'react'
import { useQuery } from 'react-query'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'

export type UseBalanceArgs = Partial<FetchBalanceArgs> & {
  /** Subscribe to changes */
  watch?: boolean
}

export type UseBalanceConfig = QueryConfig<FetchBalanceResult, Error>

export const queryKey = ({
  addressOrName,
  formatUnits,
  token,
}: Partial<FetchBalanceArgs>) =>
  [{ entity: 'balance', addressOrName, formatUnits, token }] as const

const queryFn = ({
  queryKey: [{ addressOrName, formatUnits, token }],
}: QueryFunctionArgs<typeof queryKey>) => {
  if (!addressOrName) throw new Error('address is required')
  return fetchBalance({ addressOrName, formatUnits, token })
}

export const useBalance = ({
  addressOrName,
  formatUnits = 'ether',
  token,
  watch,
  cacheTime,
  enabled = true,
  staleTime,
  onError,
  onSettled,
  onSuccess,
}: UseBalanceArgs & UseBalanceConfig) => {
  const balanceQuery = useQuery(
    queryKey({ addressOrName, formatUnits, token }),
    queryFn,
    {
      cacheTime,
      enabled: Boolean(enabled && addressOrName),
      staleTime,
      onError,
      onSettled,
      onSuccess,
    },
  )

  const { data: blockNumber } = useBlockNumber({ watch: true })
  useEffect(() => {
    if (!watch) return
    if (!blockNumber) return
    if (!addressOrName) return
    balanceQuery.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber])

  return balanceQuery
}
