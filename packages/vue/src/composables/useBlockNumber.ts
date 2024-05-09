import { useQueryClient } from '@tanstack/vue-query'
import {
  type Config,
  type GetBlockNumberErrorType,
  type ResolvedRegister,
} from '@wagmi/core'
import {
  type Evaluate,
  type UnionEvaluate,
  type UnionOmit,
} from '@wagmi/core/internal'
import {
  type GetBlockNumberData,
  type GetBlockNumberOptions,
  type GetBlockNumberQueryFnData,
  type GetBlockNumberQueryKey,
  getBlockNumberQueryOptions,
} from '@wagmi/core/query'
import { type MaybeRef, computed, toValue } from 'vue'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import {
  type UseWatchBlockNumberParameters,
  useWatchBlockNumber,
} from './useWatchBlockNumber.js'

export type UseBlockNumberParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockNumberData,
> = Evaluate<
  GetBlockNumberOptions<config, chainId> &
    ConfigParameter<config> &
    QueryParameter<
      GetBlockNumberQueryFnData,
      GetBlockNumberErrorType,
      selectData,
      GetBlockNumberQueryKey<config, chainId>
    > & {
      watch?:
        | MaybeRef<
            | boolean
            | UnionEvaluate<
                UnionOmit<
                  UseWatchBlockNumberParameters<config, chainId>,
                  'chainId' | 'config' | 'onBlockNumber' | 'onError'
                >
              >
          >
        | undefined
    }
>

export type UseBlockNumberReturnType<selectData = GetBlockNumberData> =
  UseQueryReturnType<selectData, GetBlockNumberErrorType>

/** https://wagmi.sh/vue/api/composables/useBlockNumber */
export function useBlockNumber<
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockNumberData,
>(
  parameters: UseBlockNumberParameters<config, chainId, selectData> = {},
): UseBlockNumberReturnType<selectData> {
  const { query = {}, watch, ...rest } = parameters

  const config = useConfig(parameters)
  const queryClient = useQueryClient()
  const configChainId = useChainId({ config })
  const chainId = parameters.chainId ?? configChainId.value

  const options = getBlockNumberQueryOptions(config, {
    ...rest,
    chainId,
  })

  const enabled = computed(() => {
    const watch_ = toValue(watch)
    return Boolean(
      (toValue(query.enabled) ?? true) &&
        (typeof watch_ === 'object' ? toValue(watch_.enabled) : watch_),
    )
  })

  useWatchBlockNumber({
    ...({
      config: parameters.config,
      chainId: parameters.chainId,
      ...(typeof watch === 'object' ? watch : {}),
    } as UseWatchBlockNumberParameters),
    enabled,
    onBlockNumber(blockNumber) {
      queryClient.setQueryData(options.queryKey, blockNumber)
    },
  })

  return useQuery({
    ...query,
    ...options,
  } as any) as UseBlockNumberReturnType<selectData>
}
