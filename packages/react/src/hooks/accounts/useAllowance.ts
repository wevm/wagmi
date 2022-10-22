import {
  FetchAllowanceArgs,
  FetchAllowanceResult,
  fetchAllowance,
} from '@wagmi/core'
import * as React from 'react'

import { QueryConfig, QueryFunctionArgs } from '../../types'
import { useBlockNumber } from '../network-status'
import { useChainId, useQuery } from '../utils'

export type UseAllowanceArgs = Partial<FetchAllowanceArgs> & {
  /** Subscribe to changes */
  watch?: boolean
}

export type UseAllowanceConfig = QueryConfig<FetchAllowanceResult, Error>

export const queryKey = ({
  ownerAddressOrName,
  spenderAddressOrName,
  chainId,
  formatUnits,
  token,
}: Partial<FetchAllowanceArgs> & {
  chainId?: number
}) =>
  [
    {
      entity: 'allowance',
      ownerAddressOrName,
      spenderAddressOrName,
      chainId,
      formatUnits,
      token,
    },
  ] as const

const queryFn = ({
  queryKey: [
    { ownerAddressOrName, spenderAddressOrName, chainId, formatUnits, token },
  ],
}: QueryFunctionArgs<typeof queryKey>) => {
  if (!ownerAddressOrName) throw new Error('owner address is required')
  if (!spenderAddressOrName) throw new Error('spender address is required')
  if (!token) throw new Error('token is required')
  return fetchAllowance({
    ownerAddressOrName,
    spenderAddressOrName,
    chainId,
    formatUnits,
    token,
  })
}

export function useAllowance({
  ownerAddressOrName,
  spenderAddressOrName,
  cacheTime,
  chainId: chainId_,
  enabled = true,
  formatUnits,
  staleTime,
  suspense,
  token,
  watch,
  onError,
  onSettled,
  onSuccess,
}: UseAllowanceArgs & UseAllowanceConfig = {}) {
  const chainId = useChainId({ chainId: chainId_ })
  const allowanceQuery = useQuery(
    queryKey({
      ownerAddressOrName,
      spenderAddressOrName,
      chainId,
      formatUnits,
      token,
    }),
    queryFn,
    {
      cacheTime,
      enabled: Boolean(enabled && ownerAddressOrName && spenderAddressOrName),
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
    if (!token) return
    if (!ownerAddressOrName) return
    if (!ownerAddressOrName) return
    allowanceQuery.refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber])

  return allowanceQuery
}
