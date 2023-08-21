import { useQueryClient } from '@tanstack/react-query'
import {
  type Config,
  type GetBlockNumberError,
  type ResolvedRegister,
  watchBlockNumber,
} from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type GetBlockNumberData,
  type GetBlockNumberOptions,
  type GetBlockNumberQueryFnData,
  type GetBlockNumberQueryKey,
  getBlockNumberQueryOptions,
} from '@wagmi/core/query'
import { useEffect } from 'react'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseBlockNumberParameters<
  config extends Config = ResolvedRegister['config'],
  selectData = GetBlockNumberData,
> = Evaluate<
  GetBlockNumberOptions<config> &
    UseQueryParameters<
      GetBlockNumberQueryFnData,
      GetBlockNumberError,
      selectData,
      GetBlockNumberQueryKey<config>
    > &
    ConfigParameter<config> & { watch?: boolean | undefined }
>

export type UseBlockNumberReturnType<selectData = GetBlockNumberData> =
  UseQueryResult<selectData, GetBlockNumberError>

/** https://wagmi.sh/react/hooks/useBlockNumber */
export function useBlockNumber<
  config extends Config,
  selectData = GetBlockNumberData,
>(
  parameters: UseBlockNumberParameters<config, selectData> = {},
): UseBlockNumberReturnType<selectData> {
  const { enabled = true, watch, ...query } = parameters
  const config = useConfig(parameters)
  const queryClient = useQueryClient()

  const chainId = parameters.chainId ?? useChainId()
  const queryOptions = getBlockNumberQueryOptions(config, { chainId })

  useEffect(() => {
    if (!enabled) return
    if (!watch) return

    return watchBlockNumber(config, {
      chainId,
      onBlockNumber(blockNumber) {
        queryClient.setQueryData(queryOptions.queryKey, blockNumber)
      },
    })
  }, [chainId, config, enabled, queryClient, queryOptions, watch])

  return useQuery({
    ...queryOptions,
    ...query,
    enabled,
  })
}
