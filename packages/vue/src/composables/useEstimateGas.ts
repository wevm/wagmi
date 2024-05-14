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
import { computed } from 'vue'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnectorClient } from './useConnectorClient.js'

export type UseEstimateGasParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = EstimateGasData,
> = DeepMaybeRef<
  EstimateGasOptions<config, chainId> &
    ConfigParameter<config> &
    QueryParameter<
      EstimateGasQueryFnData,
      EstimateGasErrorType,
      selectData,
      EstimateGasQueryKey<config, chainId>
    >
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
  parameters_: UseEstimateGasParameters = {},
): UseEstimateGasReturnType {
  const parameters = computed(() => deepUnref(parameters_))

  const config = useConfig(parameters)
  const { data: connectorClient } = useConnectorClient(
    computed(() => ({
      connector: parameters.value.connector,
      query: { enabled: parameters.value.account === undefined },
    })),
  )

  const configChainId = useChainId({ config })

  const queryOptions = computed(() => {
    const {
      account = connectorClient?.value?.account,
      chainId = configChainId.value,
      connector,
      query = {},
    } = parameters.value
    const options = estimateGasQueryOptions(config, {
      ...parameters.value,
      account,
      chainId,
      connector,
    })
    const enabled = Boolean((account || connector) && (query.enabled ?? true))
    return { ...query, ...options, enabled }
  })

  return useQuery(queryOptions)
}
