import type { Config, GetBalanceErrorType, ResolvedRegister } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type GetBalanceData,
  type GetBalanceOptions,
  type GetBalanceQueryKey,
  getBalanceQueryOptions,
} from '@wagmi/core/query'
import type { GetBalanceQueryFnData } from '@wagmi/core/query'

import { computed } from 'vue'
import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseBalanceParameters<
  config extends Config = Config,
  selectData = GetBalanceData,
> = Evaluate<
  DeepMaybeRef<
    GetBalanceOptions<config> &
      ConfigParameter<config> &
      QueryParameter<
        GetBalanceQueryFnData,
        GetBalanceErrorType,
        selectData,
        GetBalanceQueryKey<config>
      >
  >
>

export type UseBalanceReturnType<selectData = GetBalanceData> =
  UseQueryReturnType<selectData, GetBalanceErrorType>

/** https://wagmi.sh/vue/api/composables/useBalance */
export function useBalance<
  config extends Config = ResolvedRegister['config'],
  selectData = GetBalanceData,
>(
  parameters_: UseBalanceParameters<config, selectData> = {},
): UseBalanceReturnType<selectData> {
  const parameters = computed(() => deepUnref(parameters_))

  const config = useConfig(parameters)
  const configChainId = useChainId({ config })

  const queryOptions = computed(() => {
    const {
      address,
      chainId = configChainId.value,
      query = {},
    } = parameters.value
    const options = getBalanceQueryOptions(config, {
      ...parameters.value,
      chainId,
    })
    const enabled = Boolean(address && (query.enabled ?? true))
    return { ...query, ...options, enabled }
  })

  return useQuery(queryOptions as any) as UseBalanceReturnType<selectData>
}
