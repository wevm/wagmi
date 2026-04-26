import {
  type SimulateBlocksErrorType,
  type SimulateBlocksParameters,
  type SimulateBlocksReturnType,
  simulateBlocks,
} from '../actions/simulateBlocks.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions, structuralSharing } from './utils.js'

export type SimulateBlocksOptions<
  config extends Config,
  calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateBlocksData<calls>,
> = Compute<
  ExactPartial<SimulateBlocksParameters<config, calls>> & ScopeKeyParameter
> &
  QueryParameter<
    SimulateBlocksQueryFnData<calls>,
    SimulateBlocksErrorType,
    selectData,
    SimulateBlocksQueryKey<config, calls>
  >

export function simulateBlocksQueryOptions<
  config extends Config,
  const calls extends readonly unknown[],
  selectData = SimulateBlocksData<calls>,
>(
  config: config,
  options: SimulateBlocksOptions<config, calls, selectData> = {} as any,
): SimulateBlocksQueryOptions<config, calls, selectData> {
  return {
    ...options.query,
    enabled: Boolean(options.blocks && (options.query?.enabled ?? true)),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.blocks) throw new Error('blocks is required')
      return simulateBlocks(config, {
        ...(parameters as SimulateBlocksParameters),
        blocks: parameters.blocks,
      })
    },
    queryKey: simulateBlocksQueryKey(options),
    structuralSharing,
  }
}

export type SimulateBlocksQueryFnData<
  calls extends readonly unknown[] = readonly unknown[],
> = SimulateBlocksReturnType<calls>

export type SimulateBlocksData<
  calls extends readonly unknown[] = readonly unknown[],
> = SimulateBlocksQueryFnData<calls>

export function simulateBlocksQueryKey<
  config extends Config,
  const calls extends readonly unknown[],
>(
  options: Compute<
    ExactPartial<SimulateBlocksParameters<config, calls>> & ScopeKeyParameter
  > = {},
) {
  return ['simulateBlocks', filterQueryOptions(options)] as const
}

export type SimulateBlocksQueryKey<
  config extends Config,
  calls extends readonly unknown[],
> = ReturnType<typeof simulateBlocksQueryKey<config, calls>>

export type SimulateBlocksQueryOptions<
  config extends Config,
  calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateBlocksData<calls>,
> = QueryOptions<
  SimulateBlocksQueryFnData<calls>,
  SimulateBlocksErrorType,
  selectData,
  SimulateBlocksQueryKey<config, calls>
>
