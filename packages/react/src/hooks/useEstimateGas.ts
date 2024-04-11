'use client'

import type {
  Config,
  EstimateGasErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import {
  type EstimateGasData,
  type EstimateGasOptions,
  type EstimateGasQueryFnData,
  type EstimateGasQueryKey,
  estimateGasQueryOptions,
} from '@wagmi/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnectorClient } from './useConnectorClient.js'

export type UseEstimateGasParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = EstimateGasData,
> = EstimateGasOptions<config, chainId> &
  ConfigParameter<config> &
  QueryParameter<
    EstimateGasQueryFnData,
    EstimateGasErrorType,
    selectData,
    EstimateGasQueryKey<config, chainId>
  >

export type UseEstimateGasReturnType<selectData = EstimateGasData> =
  UseQueryReturnType<selectData, EstimateGasErrorType>

/** https://wagmi.sh/react/api/hooks/useEstimateGas */
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
  const { connector, query = {} } = parameters

  const config = useConfig(parameters)
  const { data: connectorClient } = useConnectorClient({
    connector,
    query: { enabled: parameters.account === undefined },
  })
  const account = parameters.account ?? connectorClient?.account
  const chainId = useChainId({ config })

  const options = estimateGasQueryOptions(config, {
    ...parameters,
    account,
    chainId: parameters.chainId ?? chainId,
    connector,
  })
  const enabled = Boolean((account || connector) && (query.enabled ?? true))

  return useQuery({ ...query, ...options, enabled })
}
