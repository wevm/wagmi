import {
  type WaitForCallsStatusErrorType,
  type WaitForCallsStatusParameters,
  type WaitForCallsStatusReturnType,
  waitForCallsStatus,
} from '../actions/waitForCallsStatus.js'
import type { Config } from '../createConfig.js'
import { ConnectorNotConnectedError } from '../errors/config.js'
import { filterQueryOptions } from '../query/utils.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute, ExactPartial } from '../types/utils.js'

export type WaitForCallsStatusOptions<selectData = WaitForCallsStatusData> =
  Compute<ExactPartial<WaitForCallsStatusParameters> & ScopeKeyParameter> &
    QueryParameter<
      WaitForCallsStatusQueryFnData,
      WaitForCallsStatusErrorType,
      selectData,
      WaitForCallsStatusQueryKey
    >

export function waitForCallsStatusQueryOptions<
  config extends Config,
  selectData = WaitForCallsStatusData,
>(
  config: config,
  options: WaitForCallsStatusOptions<selectData>,
): WaitForCallsStatusQueryOptions<selectData> {
  return {
    ...options.query,
    enabled: Boolean(options.id && (options.query?.enabled ?? true)),
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      if (!parameters.id) throw new Error('id is required')
      const status = await waitForCallsStatus(config, {
        ...parameters,
        id: parameters.id,
      })
      return status
    },
    queryKey: waitForCallsStatusQueryKey(options),
    retry(failureCount, error) {
      if (error instanceof ConnectorNotConnectedError) return false
      return failureCount < 3
    },
  }
}

export type WaitForCallsStatusQueryFnData = WaitForCallsStatusReturnType

export type WaitForCallsStatusData = WaitForCallsStatusQueryFnData

export function waitForCallsStatusQueryKey(
  options: Compute<
    ExactPartial<WaitForCallsStatusParameters> & ScopeKeyParameter
  > = {},
) {
  return ['callsStatus', filterQueryOptions(options)] as const
}

export type WaitForCallsStatusQueryKey = ReturnType<
  typeof waitForCallsStatusQueryKey
>

export type WaitForCallsStatusQueryOptions<
  selectData = WaitForCallsStatusData,
> = QueryOptions<
  WaitForCallsStatusQueryFnData,
  WaitForCallsStatusErrorType,
  selectData,
  WaitForCallsStatusQueryKey
>
