import type { QueryOptions } from '@tanstack/query-core'

import type { Config } from '../../createConfig.js'
import { ConnectorNotConnectedError } from '../../errors/config.js'
import { filterQueryOptions } from '../../query/utils.js'
import type { ScopeKeyParameter } from '../../types/properties.js'
import type { Evaluate, ExactPartial } from '../../types/utils.js'
import {
  type GetCapabilitiesErrorType,
  type GetCapabilitiesParameters,
  type GetCapabilitiesReturnType,
  getCapabilities,
} from '../actions/getCapabilities.js'

export type GetCapabilitiesOptions = Evaluate<
  ExactPartial<GetCapabilitiesParameters> & ScopeKeyParameter
>

export function getCapabilitiesQueryOptions<config extends Config>(
  config: config,
  options: GetCapabilitiesOptions = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const capabilities = await getCapabilities(config, parameters)
      return capabilities
    },
    queryKey: getCapabilitiesQueryKey(options),
    retry(failureCount, error) {
      if (error instanceof ConnectorNotConnectedError) return false
      return failureCount < 3
    },
  } as const satisfies QueryOptions<
    GetCapabilitiesQueryFnData,
    GetCapabilitiesErrorType,
    GetCapabilitiesData,
    GetCapabilitiesQueryKey
  >
}

export type GetCapabilitiesQueryFnData = GetCapabilitiesReturnType

export type GetCapabilitiesData = GetCapabilitiesQueryFnData

export function getCapabilitiesQueryKey(options: GetCapabilitiesOptions = {}) {
  return ['capabilities', filterQueryOptions(options)] as const
}

export type GetCapabilitiesQueryKey = ReturnType<typeof getCapabilitiesQueryKey>
