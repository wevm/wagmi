import { useQueryClient } from '@tanstack/svelte-query'
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
  type GetBlockNumberQueryFnData,
  type GetBlockNumberQueryKey,
  getBlockNumberQueryOptions,
} from '@wagmi/core/query'

import { type CreateQueryReturnType, createQuery } from '../query.svelte.js'
import type {
  ConfigParameter,
  QueryParameter,
  RuneParameters,
  RuneReturnType,
} from '../types.js'
import { useChainId } from './useChainId.svelte.js'
import { useConfig } from './useConfig.svelte.js'
import {
  type UseWatchBlockNumberParameters,
  useWatchBlockNumber,
} from './useWatchBlockNumber.svelte.js'

export type UseBlockNumberParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockNumberData,
> = RuneParameters<
  Compute<
    GetBlockNumberOptions<config, chainId> &
      ConfigParameter<config> &
      QueryParameter<
        GetBlockNumberQueryFnData,
        GetBlockNumberErrorType,
        selectData,
        GetBlockNumberQueryKey<config, chainId>
      > & {
        watch?:
          | boolean
          | UnionCompute<
              UnionStrictOmit<
                ReturnType<UseWatchBlockNumberParameters<config, chainId>>,
                'chainId' | 'config' | 'onBlockNumber' | 'onError'
              >
            >
          | undefined
      }
  >
>

export type UseBlockNumberReturnType<selectData = GetBlockNumberData> =
  RuneReturnType<CreateQueryReturnType<selectData, GetBlockNumberErrorType>>

/** https://wagmi.sh/react/api/hooks/useBlockNumber */
export function useBlockNumber<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockNumberData,
>(
  parameters: UseBlockNumberParameters<
    config,
    chainId,
    selectData
  > = () => ({}),
): UseBlockNumberReturnType<selectData> {
  const { query = {}, watch } = $derived(parameters())

  const config = $derived.by(useConfig(parameters))
  const queryClient = useQueryClient()
  const configChainId = $derived.by(useChainId(parameters))
  const chainId = $derived(parameters().chainId ?? configChainId)

  const options = $derived(
    getBlockNumberQueryOptions(config, {
      ...parameters(),
      chainId,
    }),
  )

  useWatchBlockNumber(() => ({
    ...({
      config: parameters().config,
      chainId: parameters().chainId,
      ...(typeof watch === 'object' ? watch : {}),
    } as ReturnType<UseWatchBlockNumberParameters>),
    enabled: Boolean(
      (query.enabled ?? true) &&
        (typeof watch === 'object' ? watch.enabled : watch),
    ),
    onBlockNumber(blockNumber) {
      queryClient.setQueryData(options.queryKey, blockNumber)
    },
  }))

  return createQuery(() => ({ ...query, ...options }))
}
