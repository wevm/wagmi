import type {
  Config,
  GetBytecodeErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetBytecodeData,
  type GetBytecodeOptions,
  getBytecodeQueryOptions,
} from '@wagmi/core/query'
import { computed } from 'vue'
import type { ConfigParameter } from '../types/properties.js'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseBytecodeParameters<
  config extends Config = Config,
  selectData = GetBytecodeData,
> = Compute<
  DeepMaybeRef<GetBytecodeOptions<config, selectData> & ConfigParameter<config>>
>

export type UseBytecodeReturnType<selectData = GetBytecodeData> =
  UseQueryReturnType<selectData, GetBytecodeErrorType>

/** https://wagmi.sh/vue/api/hooks/useBytecode */
export function useBytecode<
  config extends Config = ResolvedRegister['config'],
  selectData = GetBytecodeData,
>(
  parameters: UseBytecodeParameters<config, selectData> = {},
): UseBytecodeReturnType<selectData> {
  const params = computed(() => deepUnref(parameters))
  const config = useConfig(params)
  const chainId = useChainId({ config })
  const options = computed(() =>
    getBytecodeQueryOptions(config as any, {
      ...params.value,
      address: params.value.address,
      chainId: params.value.chainId ?? chainId.value,
      query: params.value.query,
    }),
  )
  return useQuery(options as any) as any
}
