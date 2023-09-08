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
import type { FeeValuesType } from 'viem'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryResult,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEstimateFeesPerGasParameters<
  type extends FeeValuesType = FeeValuesType,
  config extends Config = Config,
  selectData = EstimateFeesPerGasData<type>,
> = Evaluate<
  EstimateFeesPerGasOptions<type, config> &
    UseQueryParameters<
      EstimateFeesPerGasQueryFnData<type>,
      EstimateFeesPerGasError,
      selectData,
      EstimateFeesPerGasQueryKey<config, type>
    > &
    ConfigParameter<config>
>

export type UseEstimateFeesPerGasReturnType<
  type extends FeeValuesType = FeeValuesType,
  selectData = EstimateFeesPerGasData<type>,
> = UseQueryResult<selectData, EstimateFeesPerGasError>

/** https://alpha.wagmi.sh/react/hooks/useEstimateFeesPerGas */
export function useEstimateFeesPerGas<
  config extends Config = ResolvedRegister['config'],
  type extends FeeValuesType = 'eip1559',
  selectData = EstimateFeesPerGasData<type>,
>(
  parameters: UseEstimateFeesPerGasParameters<type, config, selectData> = {},
): UseEstimateFeesPerGasReturnType<type, selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId()

  const queryOptions = estimateFeesPerGasQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })

  return useQuery({ ...queryOptions, ...parameters })
}
