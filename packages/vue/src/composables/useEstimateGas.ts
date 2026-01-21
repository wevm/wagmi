import type {
  Config,
  EstimateGasErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import {
  type EstimateGasData,
  type EstimateGasOptions,
  estimateGasQueryOptions,
} from '@wagmi/core/query'
import { computed } from 'vue'
import type { ConfigParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useConnection } from './useConnection.js'

export type UseEstimateGasParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
  selectData = EstimateGasData,
> = DeepMaybeRef<
  EstimateGasOptions<config, chainId, selectData> & ConfigParameter<config>
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
  const params = computed(() => deepUnref(parameters))
  const config = useConfig(params)
  const { address, connector } = useConnection({ config })
  const chainId = useChainId({ config })
  const options = computed(() =>
    estimateGasQueryOptions(config as any, {
      ...params.value,
      account: params.value.account ?? address.value,
      chainId: params.value.chainId ?? chainId.value,
      connector: params.value.connector ?? connector.value,
      query: params.value.query,
    }),
  )
  return useQuery(options as any) as any
}
