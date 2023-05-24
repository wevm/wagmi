import {
  type GetBalanceError,
  type GetBalanceQueryFnData,
  type GetBalanceQueryKey,
  type GetBalanceQueryParameters,
  type OmittedQueryOptions,
  getBalanceQueryOptions,
  watchBlockNumber,
} from '@wagmi/core'
import type { Pretty } from '@wagmi/core/internal'
import { useEffect } from 'react'

import type { OmittedUseQueryOptions } from '../types/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import {
  type UseQueryParameters,
  type UseQueryReturnType,
  useQuery,
} from './useQuery.js'

export type UseBalanceParameters<TSelectData = GetBalanceQueryFnData> = Pretty<
  GetBalanceQueryParameters & {
    enabled?: boolean
    query?: QueryOptions<TSelectData>
    watch?: boolean | undefined
  }
>
type QueryOptions<TSelectData = GetBalanceQueryFnData> = Omit<
  UseQueryParameters<
    GetBalanceQueryFnData,
    GetBalanceError,
    TSelectData,
    GetBalanceQueryKey
  >,
  OmittedQueryOptions | OmittedUseQueryOptions
>

export type UseBalanceReturnType<TSelectData = GetBalanceQueryFnData> =
  UseQueryReturnType<TSelectData, GetBalanceError>

export function useBalance<TSelectData = GetBalanceQueryFnData>({
  address,
  chainId: chainId_,
  enabled = true,
  query,
  token,
  unit,
  watch,
}: UseBalanceParameters<TSelectData>): UseBalanceReturnType<TSelectData> {
  const config = useConfig()
  const defaultChainId = useChainId()
  const chainId = chainId_ ?? defaultChainId
  const queryOptions = getBalanceQueryOptions(config, {
    address,
    chainId,
    token,
    unit,
  })

  useEffect(() => {
    if (!enabled) return
    if (!address) return
    if (!watch) return

    return watchBlockNumber(config, {
      chainId,
      onBlockNumber: () =>
        config.queryClient.invalidateQueries({
          queryKey: queryOptions.queryKey,
        }),
      syncConnectedChain: false,
    })
  }, [address, chainId, config, queryOptions, enabled, watch])

  return useQuery({
    ...queryOptions,
    ...query,
    enabled: Boolean(enabled && address),
  })
}
