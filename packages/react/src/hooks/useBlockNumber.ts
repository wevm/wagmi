import {
  type GetBlockNumberError,
  type GetBlockNumberQueryFnData,
  type GetBlockNumberQueryKey,
  type GetBlockNumberQueryParameters,
  type OmittedQueryOptions,
  getBlockNumberQueryOptions,
  watchBlockNumber,
} from '@wagmi/core'
import type { Prettify } from '@wagmi/core/internal'
import * as React from 'react'

import type { OmittedUseQueryOptions } from '../types/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import {
  type UseQueryParameters,
  type UseQueryReturnType,
  useQuery,
} from './useQuery.js'

type QueryOptions<TSelectData = GetBlockNumberQueryFnData> = Omit<
  UseQueryParameters<
    GetBlockNumberQueryFnData,
    GetBlockNumberError,
    TSelectData,
    GetBlockNumberQueryKey
  >,
  OmittedQueryOptions | OmittedUseQueryOptions
>

export type UseBlockNumberParameters<TSelectData = GetBlockNumberQueryFnData> =
  Prettify<
    GetBlockNumberQueryParameters & {
      enabled?: boolean
      query?: QueryOptions<TSelectData>
      watch?: boolean | undefined
    }
  >
export type UseBlockNumberReturnType<TSelectData = GetBlockNumberQueryFnData> =
  UseQueryReturnType<TSelectData, GetBlockNumberError>

export function useBlockNumber<TSelectData = GetBlockNumberQueryFnData>({
  chainId: chainId_,
  enabled = true,
  query,
  watch,
}: UseBlockNumberParameters<TSelectData> = {}) {
  const config = useConfig()
  const defaultChainId = useChainId()
  const chainId = chainId_ ?? defaultChainId
  const queryOptions = getBlockNumberQueryOptions(config, { chainId })
  console.log(queryOptions.queryKey)

  React.useEffect(() => {
    if (!enabled) return
    if (!watch) return

    try {
      const unwatch = watchBlockNumber(config, {
        chainId,
        onBlockNumber: (blockNumber) =>
          config.queryClient.setQueryData(queryOptions.queryKey, blockNumber),
      })
      return unwatch
    } catch {}
  }, [chainId, watch])

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
  })
}
