import type { QueryOptions } from '@tanstack/query-core'

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
import type { Compute } from '../types/utils.js'

export type GetCallsStatusOptions = Compute<
  GetCallsStatusParameters & ScopeKeyParameter
>

export function getCallsStatusQueryOptions<config extends Config>(
  config: config,
  options: GetCallsStatusOptions,
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const status = await getCallsStatus(config, parameters)
      return status
    },
    queryKey: getCallsStatusQueryKey(options),
    retry(failureCount, error) {
      if (error instanceof ConnectorNotConnectedError) return false
      return failureCount < 3
    },
  } as const satisfies QueryOptions<
    GetCallsStatusQueryFnData,
    GetCallsStatusErrorType,
    GetCallsStatusData,
    GetCallsStatusQueryKey
  >
}

export type GetCallsStatusQueryFnData = GetCallsStatusReturnType

export type GetCallsStatusData = GetCallsStatusQueryFnData

export function getCallsStatusQueryKey(options: GetCallsStatusOptions) {
  return ['callsStatus', filterQueryOptions(options)] as const
}

export type GetCallsStatusQueryKey = ReturnType<typeof getCallsStatusQueryKey>
