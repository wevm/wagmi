import type {
  Config,
  GetEnsAvatarErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetEnsAvatarData,
  type GetEnsAvatarOptions,
  getEnsAvatarQueryOptions,
} from '@wagmi/core/query'
import { computed } from 'vue'
import type { ConfigParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsAvatarParameters<
  config extends Config = Config,
  selectData = GetEnsAvatarData,
> = Compute<
  DeepMaybeRef<
    GetEnsAvatarOptions<config, selectData> & ConfigParameter<config>
  >
>

export type UseEnsAvatarReturnType<selectData = GetEnsAvatarData> =
  UseQueryReturnType<selectData, GetEnsAvatarErrorType>

/** https://wagmi.sh/vue/api/composables/useEnsAvatar */
export function useEnsAvatar<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsAvatarData,
>(
  parameters: UseEnsAvatarParameters<config, selectData> = {},
): UseEnsAvatarReturnType<selectData> {
  const params = computed(() => deepUnref(parameters))
  const config = useConfig(params)
  const chainId = useChainId({ config })
  const options = computed(() =>
    getEnsAvatarQueryOptions(config as any, {
      ...params.value,
      chainId: params.value.chainId ?? chainId.value,
      query: params.value.query,
    }),
  )
  return useQuery(options as any) as any
}
