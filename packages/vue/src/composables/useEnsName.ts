import type { Config, GetEnsNameErrorType, ResolvedRegister } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type GetEnsNameData,
  type GetEnsNameOptions,
  type GetEnsNameQueryFnData,
  type GetEnsNameQueryKey,
  getEnsNameQueryOptions,
} from '@wagmi/core/query'

import { computed } from 'vue'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsNameParameters<
  config extends Config = Config,
  selectData = GetEnsNameData,
> = Evaluate<
  DeepMaybeRef<
    GetEnsNameOptions<config> &
      ConfigParameter<config> &
      QueryParameter<
        GetEnsNameQueryFnData,
        GetEnsNameErrorType,
        selectData,
        GetEnsNameQueryKey<config>
      >
  >
>

export type UseEnsNameReturnType<selectData = GetEnsNameData> =
  UseQueryReturnType<selectData, GetEnsNameErrorType>

/** https://wagmi.sh/vue/api/composables/useEnsName */
export function useEnsName<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsNameData,
>(
  parameters_: UseEnsNameParameters<config, selectData> = {},
): UseEnsNameReturnType<selectData> {
  const parameters = computed(() => deepUnref(parameters_))

  const config = useConfig(parameters)
  const configChainId = useChainId({ config })

  const queryOptions = computed(() => {
    const {
      address,
      chainId = configChainId.value,
      query = {},
    } = parameters.value
    const options = getEnsNameQueryOptions(config, {
      ...parameters.value,
      chainId,
    })
    const enabled = Boolean(address && (query.enabled ?? true))
    return { ...query, ...options, enabled }
  })

  return useQuery(queryOptions as any) as UseEnsNameReturnType<selectData>
}
