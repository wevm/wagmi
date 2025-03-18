import type { QueryOptions } from '@tanstack/query-core'

import type { Config } from '../../createConfig.js'
import { ConnectorNotConnectedError } from '../../errors/config.js'
import { filterQueryOptions } from '../../query/utils.js'
import type { ScopeKeyParameter } from '../../types/properties.js'
import type { Compute } from '../../types/utils.js'
import {
  type WaitForCallsStatusErrorType,
  type WaitForCallsStatusParameters,
  type WaitForCallsStatusReturnType,
  waitForCallsStatus,
} from '../actions/waitForCallsStatus.js'

export type WaitForCallsStatusOptions = Compute<
  WaitForCallsStatusParameters & ScopeKeyParameter
>

export function waitForCallsStatusQueryOptions<config extends Config>(
  config: config,
  options: WaitForCallsStatusOptions,
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const status = await waitForCallsStatus(config, parameters)
      return status
    },
    queryKey: waitForCallsStatusQueryKey(options),
    retry(failureCount, error) {
      if (error instanceof ConnectorNotConnectedError) return false
      return failureCount < 3
    },
  } as const satisfies QueryOptions<
    WaitForCallsStatusQueryFnData,
    WaitForCallsStatusErrorType,
    WaitForCallsStatusData,
    WaitForCallsStatusQueryKey
  >
}

export type WaitForCallsStatusQueryFnData = WaitForCallsStatusReturnType

export type WaitForCallsStatusData = WaitForCallsStatusQueryFnData

export function waitForCallsStatusQueryKey(options: WaitForCallsStatusOptions) {
  return ['callsStatus', filterQueryOptions(options)] as const
}

export type WaitForCallsStatusQueryKey = ReturnType<
  typeof waitForCallsStatusQueryKey
>
