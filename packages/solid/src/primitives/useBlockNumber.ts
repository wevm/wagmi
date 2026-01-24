import { useQueryClient } from '@tanstack/solid-query'
import type {
  Config,
  GetBlockNumberErrorType,
  ResolvedRegister,
} from '@wagmi/core'
import type {
  Compute,
  ConfigParameter,
  UnionCompute,
  UnionStrictOmit,
} from '@wagmi/core/internal'
import {
  type GetBlockNumberData,
  type GetBlockNumberOptions,
  getBlockNumberQueryOptions,
} from '@wagmi/core/query'
import { type Accessor, createMemo } from 'solid-js'
import { type UseQueryReturnType, useQuery } from '../utils/query.js'
import { useChainId } from './useChainId.js'
import { useConfig } from './useConfig.js'
import { useWatchBlockNumber } from './useWatchBlockNumber.js'

/** https://wagmi.sh/solid/api/hooks/useBlockNumber */
export function useBlockNumber<
  config extends Config = ResolvedRegister['config'],
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  selectData = GetBlockNumberData,
>(
  parameters: useBlockNumber.Parameters<
    config,
    chainId,
    selectData
  > = () => ({}),
): useBlockNumber.ReturnType<selectData> {
  const config = useConfig(parameters)
  const chainId = useChainId(() => ({ config: config() }))
  const options = createMemo(() =>
    getBlockNumberQueryOptions(config(), {
      ...parameters(),
      chainId: parameters().chainId ?? chainId(),
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
      } as useWatchBlockNumber.SolidParameters),
      enabled:
        (parameters().query?.enabled ?? true) &&
        (typeof watch === 'object' ? watch.enabled : watch),
      onBlockNumber(blockNumber) {
        queryClient.setQueryData(options().queryKey, blockNumber)
      },
    } satisfies useWatchBlockNumber.SolidParameters
  })
  useWatchBlockNumber(watchBlockNumberArgs)
  return useQuery(options)
}

export namespace useBlockNumber {
  export type Parameters<
    config extends Config = Config,
    chainId extends
      config['chains'][number]['id'] = config['chains'][number]['id'],
    selectData = GetBlockNumberData,
  > = Accessor<SolidParameters<config, chainId, selectData>>

  export type ReturnType<selectData = GetBlockNumberData> = UseQueryReturnType<
    selectData,
    GetBlockNumberErrorType
  >

  export type SolidParameters<
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
                useWatchBlockNumber.SolidParameters<config, chainId>,
                'chainId' | 'config' | 'onBlockNumber' | 'onError'
              >
            >
          | undefined
      }
  >
}
