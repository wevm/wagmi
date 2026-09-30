import type { MutationOptions } from '@tanstack/query-core'
import {
  type RequestPermissionsErrorType,
  type RequestPermissionsParameters,
  type RequestPermissionsReturnType,
  requestPermissions,
} from '../actions/requestPermissions.js'
import type { Config } from '../createConfig.js'
import type { MutationParameter } from '../types/query.js'
import type { Compute } from '../types/utils.js'
import type { Mutate, MutateAsync } from './types.js'

export type RequestPermissionsOptions<context = unknown> = MutationParameter<
  RequestPermissionsData,
  RequestPermissionsErrorType,
  RequestPermissionsVariables,
  context
>

export function requestPermissionsMutationOptions<context>(
  config: Config,
  options: RequestPermissionsOptions<context> = {},
): RequestPermissionsMutationOptions {
  return {
    ...(options.mutation as any),
    mutationFn(variables) {
      return requestPermissions(config, variables)
    },
    mutationKey: ['requestPermissions'],
  }
}

export type RequestPermissionsMutationOptions = MutationOptions<
  RequestPermissionsData,
  RequestPermissionsErrorType,
  RequestPermissionsVariables
>

export type RequestPermissionsData = RequestPermissionsReturnType

export type RequestPermissionsVariables = Compute<RequestPermissionsParameters>

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
