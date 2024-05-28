import type {
  Config,
  GetEnsAvatarErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type GetEnsAvatarData,
  type GetEnsAvatarOptions,
  type GetEnsAvatarQueryFnData,
  type GetEnsAvatarQueryKey,
  getEnsAvatarQueryOptions,
} from '@wagmi/core/query'
import { computed } from 'vue'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsAvatarParameters<
  config extends Config = Config,
  selectData = GetEnsAvatarData,
> = Evaluate<
  DeepMaybeRef<
    GetEnsAvatarOptions<config> &
      ConfigParameter<config> &
      QueryParameter<
        GetEnsAvatarQueryFnData,
        GetEnsAvatarErrorType,
        selectData,
        GetEnsAvatarQueryKey<config>
      >
  >
>

export type UseEnsAvatarReturnType<selectData = GetEnsAvatarData> =
  UseQueryReturnType<selectData, GetEnsAvatarErrorType>

/** https://wagmi.sh/vue/api/composables/useEnsAvatar */
export function useEnsAvatar<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsAvatarData,
>(
  parameters_: UseEnsAvatarParameters<config, selectData> = {},
): UseEnsAvatarReturnType<selectData> {
  const parameters = computed(() => deepUnref(parameters_))

  const config = useConfig(parameters)
  const configChainId = useChainId({ config })

  const queryOptions = computed(() => {
    const { chainId = configChainId.value, name, query = {} } = parameters.value
    const options = getEnsAvatarQueryOptions(config, {
      ...parameters.value,
      chainId,
    })
    const enabled = Boolean(name && (query.enabled ?? true))
    return { ...query, ...options, enabled }
  })

  return useQuery(queryOptions as any) as UseEnsAvatarReturnType<selectData>
}
