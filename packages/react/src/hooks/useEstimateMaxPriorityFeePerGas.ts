'use client'
import type {
  Config,
  EstimateMaxPriorityFeePerGasErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type EstimateMaxPriorityFeePerGasData,
  type EstimateMaxPriorityFeePerGasOptions,
  estimateMaxPriorityFeePerGasQueryOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEstimateMaxPriorityFeePerGasParameters<
  config extends Config = Config,
  selectData = EstimateMaxPriorityFeePerGasData,
> = Compute<
  EstimateMaxPriorityFeePerGasOptions<config, selectData> &
    ConfigParameter<config>
>

export type UseEstimateMaxPriorityFeePerGasReturnType<
  selectData = EstimateMaxPriorityFeePerGasData,
> = UseQueryReturnType<selectData, EstimateMaxPriorityFeePerGasErrorType>

/** https://wagmi.sh/react/api/hooks/useEstimateMaxPriorityFeePerGas */
export function useEstimateMaxPriorityFeePerGas<
  config extends Config = ResolvedRegister['config'],
  selectData = EstimateMaxPriorityFeePerGasData,
>(
  parameters: UseEstimateMaxPriorityFeePerGasParameters<
    config,
    selectData
  > = {},
): UseEstimateMaxPriorityFeePerGasReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId({ config })
  const options = estimateMaxPriorityFeePerGasQueryOptions(config, {
    ...parameters,
    chainId: parameters.chainId ?? chainId,
  })
  return useQuery(options)
}
