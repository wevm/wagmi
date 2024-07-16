import type {
  Config,
  GetBytecodeErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type GetBytecodeData,
  type GetBytecodeOptions,
  type GetBytecodeQueryKey,
  getBytecodeQueryOptions,
} from '@wagmi/core/query'
import type { GetBytecodeQueryFnData } from '@wagmi/core/query'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'

import { computed } from 'vue'
import type { DeepMaybeRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'

export type UseBytecodeParameters<
  config extends Config = Config,
  selectData = GetBytecodeData,
> = Compute<
  DeepMaybeRef<
    GetBytecodeOptions<config> &
      ConfigParameter<config> &
      QueryParameter<
        GetBytecodeQueryFnData,
        GetBytecodeErrorType,
        selectData,
        GetBytecodeQueryKey<config>
      >
  >
>

export type UseBytecodeReturnType<selectData = GetBytecodeData> =
  UseQueryReturnType<selectData, GetBytecodeErrorType>

/** https://wagmi.sh/vue/api/hooks/useBytecode */
export function useBytecode<
  config extends Config = ResolvedRegister['config'],
  selectData = GetBytecodeData,
>(
  parameters_: UseBytecodeParameters<config, selectData> = {},
): UseBytecodeReturnType<selectData> {
  const parameters = computed(() => deepUnref(parameters_))

  const config = useConfig(parameters)
  const chainId = useChainId({ config })

  const queryOptions = computed(() => {
    const {
      address: contractAddress,
      chainId: parametersChainId,
      query = {},
    } = parameters.value

    const options = getBytecodeQueryOptions(config, {
      ...parameters.value,
      address: contractAddress,
      chainId: parametersChainId ?? chainId.value,
    })
    const enabled = Boolean(contractAddress && (query.enabled ?? true))
    return { ...query, ...options, enabled }
  })

  return useQuery(queryOptions as any) as UseBytecodeReturnType<selectData>
}
