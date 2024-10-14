import type { MutationOptions } from '@tanstack/query-core'

import {
  type RequestPermissionsErrorType,
  type RequestPermissionsParameters,
  type RequestPermissionsReturnType,
  requestPermissions,
} from '../actions/requestPermissions.js'
import type { Config } from '../createConfig.js'
import type { Mutate, MutateAsync } from './types.js'

export function requestPermissionsMutationOptions(config: Config) {
  return {
    mutationFn(variables) {
      return requestPermissions(config, variables)
    },
    mutationKey: ['requestPermissions'],
  } as const satisfies MutationOptions<
    RequestPermissionsData,
    RequestPermissionsErrorType,
    RequestPermissionsVariables
  >
}

export type RequestPermissionsData = RequestPermissionsReturnType

export type RequestPermissionsVariables = RequestPermissionsParameters

export type RequestPermissionsMutate<context = unknown> = Mutate<
  RequestPermissionsData,
  RequestPermissionsErrorType,
  RequestPermissionsVariables,
  context
>

export type RequestPermissionsMutateAsync<context = unknown> = MutateAsync<
  RequestPermissionsData,
  RequestPermissionsErrorType,
  RequestPermissionsVariables,
  context
>
