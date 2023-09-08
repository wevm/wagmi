'use client'

import {
  type Config,
  type EstimateFeesPerGasError,
  type ResolvedRegister,
} from '@wagmi/core'
import { type Evaluate } from '@wagmi/core/internal'
import {
  type EstimateFeesPerGasData,
  type EstimateFeesPerGasOptions,
  type EstimateFeesPerGasQueryFnData,
  type EstimateFeesPerGasQueryKey,
  estimateFeesPerGasQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEstimateFeesPerGasParameters<
  config extends Config = Config,
  selectData = EstimateFeesPerGasData,
> = Evaluate<
  EstimateFeesPerGasOptions<config> &
    UseQueryParameters<
      EstimateFeesPerGasQueryFnData,
      EstimateFeesPerGasError,
      selectData,
      EstimateFeesPerGasQueryKey<config>
    > &
    ConfigParameter<config>
>

export type UseEstimateFeesPerGasReturnType<
  selectData = EstimateFeesPerGasData,
> = UseQueryResult<selectData, EstimateFeesPerGasError>

/** https://alpha.wagmi.sh/react/hooks/useEstimateFeesPerGas */
export function useEstimateFeesPerGas<
  config extends Config = ResolvedRegister['config'],
  selectData = EstimateFeesPerGasData,
>(
  parameters: UseEstimateFeesPerGasParameters<config, selectData> = {},
): UseEstimateFeesPerGasReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId()

  const queryOptions = estimateFeesPerGasQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })

  return useQuery({ ...queryOptions, ...parameters })
}
