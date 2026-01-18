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
  getBlockNumberQueryOptions,
} from '@wagmi/core/query'
import { type Accessor, createMemo } from 'solid-js'

import type { ConfigParameter } from '../types/properties.js'
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
  GetBlockNumberOptions<config, chainId, selectData> &
    ConfigParameter<config> & {
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
  parameters: UseBlockNumberParameters<
    config,
    chainId,
    selectData
  > = () => ({}),
): UseBlockNumberReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId(() => ({ config: config() }))
  const options = createMemo(() =>
    getBlockNumberQueryOptions(config(), {
      ...parameters(),
      chainId: parameters().chainId ?? chainId(),
      query: parameters().query,
    }),
  )

  const queryClient = useQueryClient()
  const watchBlockNumberArgs = createMemo(() => {
    // Assign to variable to help type narrowing
    const { watch } = parameters()
    return {
      ...({
        config: config(),
        chainId: parameters().chainId ?? chainId(),
        ...(typeof watch === 'object' ? watch : {}),
      } as SolidWatchBlockNumberParameters),
      enabled:
        (parameters().query?.enabled ?? true) &&
        (typeof watch === 'object' ? watch.enabled : watch),
      onBlockNumber(blockNumber) {
        queryClient.setQueryData(options().queryKey, blockNumber)
      },
    } satisfies SolidWatchBlockNumberParameters
  })
  useWatchBlockNumber(watchBlockNumberArgs)

  return useQuery(options)
}
