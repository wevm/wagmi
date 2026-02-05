import {
  type SimulateCallsErrorType,
  type SimulateCallsParameters,
  type SimulateCallsReturnType,
  simulateCalls,
} from '../actions/simulateCalls.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions, structuralSharing } from './utils.js'

export type SimulateCallsOptions<
  config extends Config,
  calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateCallsData<calls>,
> = Compute<
  ExactPartial<SimulateCallsParameters<config, calls>> & ScopeKeyParameter
> &
  QueryParameter<
    SimulateCallsQueryFnData<calls>,
    SimulateCallsErrorType,
    selectData,
    SimulateCallsQueryKey<config, calls>
  >

export function simulateCallsQueryOptions<
  config extends Config,
  const calls extends readonly unknown[],
  selectData = SimulateCallsData<calls>,
>(
  config: config,
  options: SimulateCallsOptions<config, calls, selectData> = {} as any,
): SimulateCallsQueryOptions<config, calls, selectData> {
  return {
    ...options.query,
    enabled: Boolean(
      options.calls &&
        (!options.traceAssetChanges || options.account || options.connector) &&
        (options.query?.enabled ?? true),
    ),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.calls) throw new Error('calls is required')
      if (
        parameters.traceAssetChanges &&
        !parameters.account &&
        !options.connector
      )
        throw new Error(
          'account or connector is required when traceAssetChanges is true',
        )
      return simulateCalls(config, {
        ...(parameters as SimulateCallsParameters),
        calls: parameters.calls,
        connector: options.connector,
      })
    },
    queryKey: simulateCallsQueryKey(options),
    structuralSharing,
  }
}

export type SimulateCallsQueryFnData<
  calls extends readonly unknown[] = readonly unknown[],
> = SimulateCallsReturnType<calls>

export type SimulateCallsData<
  calls extends readonly unknown[] = readonly unknown[],
> = SimulateCallsQueryFnData<calls>

export function simulateCallsQueryKey<
  config extends Config,
  const calls extends readonly unknown[],
>(
  options: Compute<
    ExactPartial<SimulateCallsParameters<config, calls>> & ScopeKeyParameter
  > = {},
) {
  return ['simulateCalls', filterQueryOptions(options)] as const
}

export type SimulateCallsQueryKey<
  config extends Config,
  calls extends readonly unknown[],
> = ReturnType<typeof simulateCallsQueryKey<config, calls>>

export type SimulateCallsQueryOptions<
  config extends Config,
  calls extends readonly unknown[] = readonly unknown[],
  selectData = SimulateCallsData<calls>,
> = QueryOptions<
  SimulateCallsQueryFnData<calls>,
  SimulateCallsErrorType,
  selectData,
  SimulateCallsQueryKey<config, calls>
>
