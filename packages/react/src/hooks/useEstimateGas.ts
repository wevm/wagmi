'use client'

import type { Config, EstimateGasError, ResolvedRegister } from '@wagmi/core'
import {
  type EstimateGasData,
  type EstimateGasOptions,
  type EstimateGasQueryFnData,
  type EstimateGasQueryKey,
  estimateGasQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import {
  type UseQueryParameters,
  type UseQueryReturnType,
  useQuery,
} from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnectorClient } from './useConnectorClient.js'

export type UseEstimateGasParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = EstimateGasData,
> = EstimateGasOptions<config, chainId> &
  UseQueryParameters<
    EstimateGasQueryFnData,
    EstimateGasError,
    selectData,
    EstimateGasQueryKey<config, chainId>
  > &
  ConfigParameter<config>

export type UseEstimateGasReturnType<selectData = EstimateGasData> =
  UseQueryReturnType<selectData, EstimateGasError>

/** https://alpha.wagmi.sh/react/api/hooks/useEstimateGas */
export function useEstimateGas<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = EstimateGasData,
>(
  parameters?: UseEstimateGasParameters<config, chainId, selectData>,
): UseEstimateGasReturnType<selectData>

export function useEstimateGas(
  parameters: UseEstimateGasParameters = {},
): UseEstimateGasReturnType {
  const { connector, ...query } = parameters

  const config = useConfig(parameters)
  const { data: connectorClient } = useConnectorClient({
    connector,
    enabled: parameters.account === undefined,
  })
  const chainId = useChainId()

  const queryOptions = estimateGasQueryOptions(config, {
    ...(parameters as any),
    account: parameters.account ?? connectorClient?.account,
    chainId: parameters.chainId ?? chainId,
  })
  const enabled = Boolean(parameters.enabled ?? true)

  return useQuery({ ...queryOptions, ...query, enabled })
}
