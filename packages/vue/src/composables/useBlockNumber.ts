import { useQueryClient } from '@tanstack/vue-query'
import type {
  Config,
  GetBlockNumberErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type {
  Compute,
  UnionCompute,
  UnionStrictOmit,
} from '@wagmi/core/internal'
import {
  type GetBlockNumberData,
  type GetBlockNumberOptions,
  getBlockNumberQueryOptions,
} from '@wagmi/core/query'
import { computed } from 'vue'

import type { ConfigParameter } from '../types/properties.js'
import type { DeepMaybeRef, DeepUnwrapRef } from '../types/ref.js'
import { deepUnref } from '../utils/cloneDeep.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import {
  type UseWatchBlockNumberParameters,
  useWatchBlockNumber,
} from './useWatchBlockNumber.js'

export type UseBlockNumberParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockNumberData,
> = Compute<
  DeepMaybeRef<
    GetBlockNumberOptions<config, chainId, selectData> &
      ConfigParameter<config> & {
        watch?:
          | boolean
          | UnionCompute<
              UnionStrictOmit<
                DeepUnwrapRef<UseWatchBlockNumberParameters<config, chainId>>,
                'chainId' | 'config' | 'onBlockNumber' | 'onError'
              >
            >
          | undefined
      }
  >
>

export type UseBlockNumberReturnType<selectData = GetBlockNumberData> =
  UseQueryReturnType<selectData, GetBlockNumberErrorType>

/** https://wagmi.sh/vue/api/composables/useBlockNumber */
export function useBlockNumber<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockNumberData,
>(
  parameters: UseBlockNumberParameters<config, chainId, selectData> = {},
): UseBlockNumberReturnType<selectData> {
  const params = computed(() => deepUnref(parameters))
  const config = useConfig(params)
  const chainId = useChainId({ config })
  const options = computed(() =>
    getBlockNumberQueryOptions(config as any, {
      ...params.value,
      chainId: params.value.chainId ?? chainId.value,
      query: params.value.query,
    }),
  )

  const queryClient = useQueryClient()
  const watchBlockNumberArgs = computed(() => {
    return {
      ...({
        config,
        chainId: params.value.chainId ?? chainId.value,
        ...(typeof params.value.watch === 'object' ? params.value.watch : {}),
      } as UseWatchBlockNumberParameters),
      enabled:
        (params.value.query?.enabled ?? true) &&
        (typeof params.value.watch === 'object'
          ? params.value.watch.enabled
          : params.value.watch),
      onBlockNumber(blockNumber) {
        queryClient.setQueryData(options.value.queryKey, blockNumber)
      },
    } satisfies UseWatchBlockNumberParameters
  })
  useWatchBlockNumber(watchBlockNumberArgs)

  return useQuery(options as any) as any
}
