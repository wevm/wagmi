import type { QueryOptions } from '@tanstack/query-core'

import {
  type GetPermissionsErrorType,
  type GetPermissionsParameters,
  type GetPermissionsReturnType,
  getPermissions,
} from '../actions/getPermissions.js'
import type { Config } from '../createConfig.js'
import type { ScopeKeyParameter } from '../types/properties.js'
import type { Compute, ExactPartial } from '../types/utils.js'
import { filterQueryOptions } from './utils.js'

export type GetPermissionsOptions<config extends Config> = Compute<
  ExactPartial<GetPermissionsParameters<config>> & ScopeKeyParameter
>

export function getPermissionsQueryOptions<config extends Config>(
  config: config,
  options: GetPermissionsOptions<config> = {},
) {
  return {
    async queryFn({ queryKey }) {
      const { scopeKey: _, ...parameters } = queryKey[1]
      const permissions = await getPermissions(config, parameters)
      return permissions ?? null
    },
    queryKey: getPermissionsQueryKey(options),
  } as const satisfies QueryOptions<
    GetPermissionsQueryFnData,
    GetPermissionsErrorType,
    GetPermissionsData,
    GetPermissionsQueryKey<config>
  >
}

export type GetPermissionsQueryFnData = GetPermissionsReturnType

export type GetPermissionsData = GetPermissionsQueryFnData

export function getPermissionsQueryKey<config extends Config>(
  options: GetPermissionsOptions<config> = {},
) {
  return ['getPermissions', filterQueryOptions(options)] as const
}

export type GetPermissionsQueryKey<config extends Config> = ReturnType<
  typeof getPermissionsQueryKey<config>
>
