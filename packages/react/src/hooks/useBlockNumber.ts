import {
  type GetBlockNumberError,
  type GetBlockNumberQueryFnData,
  type GetBlockNumberQueryKey,
  type GetBlockNumberQueryParameters,
  type OmittedQueryOptions,
  type ResolvedRegister,
  getBlockNumberQueryOptions,
  watchBlockNumber,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import * as React from 'react'

import type { OmittedUseQueryOptions } from '../types/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { type UseQueryParameters, useQuery } from './useQuery.js'
import { type UseQueryResult } from '@tanstack/react-query'

export type UseBlockNumberParameters<selectData = GetBlockNumberQueryFnData> =
  Evaluate<
    GetBlockNumberQueryParameters<ResolvedRegister['config']> & {
      enabled?: boolean
      query?: Omit<
        UseQueryParameters<
          GetBlockNumberQueryFnData,
          GetBlockNumberError,
          selectData,
          GetBlockNumberQueryKey<ResolvedRegister['config']>
        >,
        OmittedQueryOptions | OmittedUseQueryOptions
      >
      watch?: boolean | undefined
    }
  >

export type UseBlockNumberReturnType<selectData = GetBlockNumberQueryFnData> =
  UseQueryResult<selectData, GetBlockNumberError>

/** https://wagmi.sh/react/hooks/useBlockNumber */
export function useBlockNumber<selectData = GetBlockNumberQueryFnData>({
  chainId: chainId_,
  enabled = true,
  query,
  watch,
}: UseBlockNumberParameters<selectData> = {}) {
  const config = useConfig()
  const defaultChainId = useChainId()
  const chainId = chainId_ ?? defaultChainId
  const queryOptions = getBlockNumberQueryOptions(config, { chainId })

  React.useEffect(() => {
    if (!enabled) return
    if (!watch) return

    try {
      const unwatch = watchBlockNumber(config, {
        chainId,
        onBlockNumber(blockNumber) {
          config.queryClient.setQueryData(queryOptions.queryKey, blockNumber)
        },
      })
      return unwatch
    } catch {
      return
    }
  }, [chainId, watch])

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
  })
}
