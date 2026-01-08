import {
  type GetCallsStatusErrorType,
  type GetCallsStatusParameters,
  type GetCallsStatusReturnType,
  getCallsStatus,
} from '../actions/getCallsStatus.js'
import type { Config } from '../createConfig.js'
import { ConnectorNotConnectedError } from '../errors/config.js'
import { filterQueryOptions } from '../query/utils.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { QueryOptions, QueryParameter } from '../types/query.js'
import type { Compute } from '../types/utils.js'

export type GetCallsStatusOptions<selectData = GetCallsStatusData> = Compute<
  GetCallsStatusParameters & ScopeKeyParameter
> &
  QueryParameter<
    GetCallsStatusQueryFnData,
    GetCallsStatusErrorType,
    selectData,
    GetCallsStatusQueryKey
  >

export function getCallsStatusQueryOptions<
  config extends Config,
  selectData = GetCallsStatusData,
>(
  config: config,
  options: GetCallsStatusOptions<selectData>,
): GetCallsStatusQueryOptions<selectData> {
  return {
    ...options.query,
    queryFn: async (context) => {
      const [, { scopeKey: _, ...parameters }] = context.queryKey
      const status = await getCallsStatus(config, parameters)
      return status
    },
    queryKey: getCallsStatusQueryKey(options),
    retry(failureCount, error) {
      if (error instanceof ConnectorNotConnectedError) return false
      return failureCount < 3
    },
  }
}

export type GetCallsStatusQueryFnData = GetCallsStatusReturnType

export type GetCallsStatusData = GetCallsStatusQueryFnData

export function getCallsStatusQueryKey(
  options: Compute<GetCallsStatusParameters & ScopeKeyParameter>,
) {
  return ['callsStatus', filterQueryOptions(options)] as const
}

export type GetCallsStatusQueryKey = ReturnType<typeof getCallsStatusQueryKey>

export type GetCallsStatusQueryOptions<selectData = GetCallsStatusData> =
  QueryOptions<
    GetCallsStatusQueryFnData,
    GetCallsStatusErrorType,
    selectData,
    GetCallsStatusQueryKey
  >
