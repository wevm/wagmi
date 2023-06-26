import { type GetBlockNumberError, watchBlockNumber } from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetBlockNumberData,
  type GetBlockNumberOptions,
  type GetBlockNumberQueryFnData,
  type GetBlockNumberQueryKey,
  getBlockNumberQueryOptions,
} from '@wagmi/core/query'
import * as React from 'react'

import type { ResolvedRegister } from '../index.js'
import type { UseQueryParameters, UseQueryResult } from '../types/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useQuery } from './useQuery.js'

export type UseBlockNumberParameters<selectData = GetBlockNumberData> =
  Evaluate<
    GetBlockNumberOptions<ResolvedRegister['config']> &
      UseQueryParameters<
        GetBlockNumberQueryFnData,
        GetBlockNumberError,
        selectData,
        GetBlockNumberQueryKey<ResolvedRegister['config']>
      > & {
        watch?: boolean | undefined
      }
  >

export type UseBlockNumberReturnType<selectData = GetBlockNumberData> =
  UseQueryResult<selectData, GetBlockNumberError>

/** https://wagmi.sh/react/hooks/useBlockNumber */
export function useBlockNumber<selectData = GetBlockNumberData>(
  parameters: UseBlockNumberParameters<selectData> = {},
): UseBlockNumberReturnType<selectData> {
  const { chainId: chainId_, enabled = true, watch, ...query } = parameters
  const config = useConfig()

  const defaultChainId = useChainId()
  const chainId = chainId_ ?? defaultChainId
  const queryOptions = getBlockNumberQueryOptions(config, { chainId })

  React.useEffect(() => {
    if (!enabled) return
    if (!watch) return

    return watchBlockNumber(config, {
      chainId,
      onBlockNumber(blockNumber) {
        config.queryClient.setQueryData(queryOptions.queryKey, blockNumber)
      },
    })
  }, [chainId, config, enabled, queryOptions, watch])

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
  })
}
