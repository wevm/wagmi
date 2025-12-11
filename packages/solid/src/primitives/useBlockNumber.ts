import { useQueryClient } from '@tanstack/solid-query'
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
import { type Accessor, createMemo } from 'solid-js'

import type { ConfigParameter, QueryParameter } from '../types/properties.js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import {
  type SolidWatchBlockNumberParameters,
  useWatchBlockNumber,
} from './useWatchBlockNumber.js'

export type SolidBlockNumberParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockNumberData,
> = Compute<
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
              SolidWatchBlockNumberParameters<config, chainId>,
              'chainId' | 'config' | 'onBlockNumber' | 'onError'
            >
          >
        | undefined
    }
>

export type UseBlockNumberParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockNumberData,
> = Accessor<SolidBlockNumberParameters<config, chainId, selectData>>

export type UseBlockNumberReturnType<selectData = GetBlockNumberData> =
  UseQueryReturnType<selectData, GetBlockNumberErrorType>

/** https://wagmi.sh/solid/api/hooks/useBlockNumber */
export function useBlockNumber<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockNumberData,
>(
  parameters: UseBlockNumberParameters<config, chainId, selectData>,
): UseBlockNumberReturnType<selectData> {
  const config = useConfig(parameters)
  const queryClient = useQueryClient()
  const configChainId = useChainId(() => ({ config: config() }))

  const queryOptions = createMemo(() => {
    const {
      chainId = configChainId(),
      query = {},
      watch: _,
      ...rest
    } = parameters()
    const options = getBlockNumberQueryOptions(config(), {
      ...rest,
      chainId,
    })
    return {
      ...query,
      ...options,
    }
  })

  const watchBlockNumberArgs = createMemo(() => {
    const { chainId = configChainId(), query, watch } = parameters()
    return {
      ...({
        config: config(),
        chainId,
        ...(typeof watch === 'object' ? watch : {}),
      } as SolidWatchBlockNumberParameters),
      enabled:
        (query?.enabled ?? true) &&
        (typeof watch === 'object' ? watch.enabled : watch),
      onBlockNumber(blockNumber) {
        queryClient.setQueryData(queryOptions().queryKey, blockNumber)
      },
    } satisfies SolidWatchBlockNumberParameters
  })

  useWatchBlockNumber(watchBlockNumberArgs)

  return useQuery(queryOptions) satisfies UseBlockNumberReturnType<selectData>
}
