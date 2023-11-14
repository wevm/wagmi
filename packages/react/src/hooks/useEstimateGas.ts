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
  ConfigParameter<config> & {
    query?:
      | UseQueryParameters<
          EstimateGasQueryFnData,
          EstimateGasErrorType,
          selectData,
          EstimateGasQueryKey<config, chainId>
        >
      | undefined
  }

export type UseEstimateGasReturnType<selectData = EstimateGasData> =
  UseQueryReturnType<selectData, EstimateGasErrorType>

/** https://beta.wagmi.sh/react/api/hooks/useEstimateGas */
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
  const chainId = useChainId()

  const queryOptions = estimateGasQueryOptions(config, {
    ...(parameters as any),
    account,
    chainId: parameters.chainId ?? chainId,
    connector,
  })
  const enabled = Boolean((account || connector) && (query.enabled ?? true))

  return useQuery({ ...query, ...queryOptions, enabled })
}
