import type {
  Config,
  GetEnsAddressErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetEnsAddressData,
  type GetEnsAddressOptions,
  getEnsAddressQueryOptions,
} from '@wagmi/core/query'
import { computed } from 'vue'
import type { ConfigParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseEnsAddressParameters<
  config extends Config = Config,
  selectData = GetEnsAddressData,
> = Compute<
  DeepMaybeRef<
    GetEnsAddressOptions<config, selectData> & ConfigParameter<config>
  >
>

export type UseEnsAddressReturnType<selectData = GetEnsAddressData> =
  UseQueryReturnType<selectData, GetEnsAddressErrorType>

/** https://wagmi.sh/vue/api/composables/useEnsAddress */
export function useEnsAddress<
  config extends Config = ResolvedRegister['config'],
  selectData = GetEnsAddressData,
>(
  parameters: UseEnsAddressParameters<config, selectData> = {},
): UseEnsAddressReturnType<selectData> {
  const params = computed(() => deepUnref(parameters))
  const config = useConfig(params)
  const chainId = useChainId({ config })
  const options = computed(() =>
    getEnsAddressQueryOptions(config as any, {
      ...params.value,
      chainId: params.value.chainId ?? chainId.value,
      query: params.value.query,
    }),
  )
  return useQuery(options as any) as any
}
