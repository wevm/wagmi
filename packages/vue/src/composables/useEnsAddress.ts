import type {
  Config,
  GetEnsAddressErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type GetEnsAddressData,
  type GetEnsAddressOptions,
  type GetEnsAddressQueryFnData,
  type GetEnsAddressQueryKey,
  getEnsAddressQueryOptions,
} from '@wagmi/core/query'
import { computed } from 'vue'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsAddressParameters<
  config extends Config = Config,
  selectData = GetEnsAddressData,
> = Evaluate<
  DeepMaybeRef<
    GetEnsAddressOptions<config> &
      ConfigParameter<config> &
      QueryParameter<
        GetEnsAddressQueryFnData,
        GetEnsAddressErrorType,
        selectData,
        GetEnsAddressQueryKey<config>
      >
  >
>

export type UseEnsAddressReturnType<selectData = GetEnsAddressData> =
  UseQueryReturnType<selectData, GetEnsAddressErrorType>

/** https://wagmi.sh/vue/api/composables/useEnsAddress */
export function useEnsAddress<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsAddressData,
>(
  parameters_: UseEnsAddressParameters<config, selectData> = {},
): UseEnsAddressReturnType<selectData> {
  const parameters = computed(() => deepUnref(parameters_))

  const config = useConfig(parameters)
  const configChainId = useChainId({ config })

  const queryOptions = computed(() => {
    const { chainId = configChainId.value, name, query = {} } = parameters.value
    const options = getEnsAddressQueryOptions(config, {
      ...parameters.value,
      chainId,
    })
    const enabled = Boolean(name && (query.enabled ?? true))
    return { ...query, ...options, enabled }
  })

  return useQuery(queryOptions as any) as UseEnsAddressReturnType<selectData>
}
