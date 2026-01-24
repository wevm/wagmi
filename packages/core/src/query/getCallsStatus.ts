import {
  type GetCallsStatusErrorType,
  type GetCallsStatusParameters,
  type GetCallsStatusReturnType,
  getCallsStatus,
} from '../actions/getCallsStatus.js'
import type { Config } from '../createConfig.js'
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
    enabled: Boolean(
      options.connector?.getProvider && (options.query?.enabled ?? true),
    ),
    queryFn: async (context) => {
      if (!options.connector?.getProvider)
        throw new Error('connector is required')
      const [, { connectorUid: _, scopeKey: __, ...parameters }] =
        context.queryKey
      const status = await getCallsStatus(config, parameters)
      return status
    },
    queryKey: getCallsStatusQueryKey(options),
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
