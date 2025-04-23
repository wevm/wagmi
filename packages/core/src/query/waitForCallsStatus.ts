import type { QueryOptions } from '@tanstack/query-core'

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
import type { Compute, PartialBy } from '../types/utils.js'

export type WaitForCallsStatusOptions = Compute<
  PartialBy<WaitForCallsStatusParameters, 'id'> & ScopeKeyParameter
>

export function waitForCallsStatusQueryOptions<config extends Config>(
  config: config,
  options: WaitForCallsStatusOptions,
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, id, ...parameters } = queryKey[1]
      if (!id) throw new Error('id is required')
      const status = await waitForCallsStatus(config, { ...parameters, id })
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
