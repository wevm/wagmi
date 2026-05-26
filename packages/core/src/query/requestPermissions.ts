import type { MutateOptions, MutationOptions } from '@tanstack/query-core'
import {
  type RequestPermissionsErrorType,
  type RequestPermissionsParameters,
  type RequestPermissionsReturnType,
  requestPermissions,
} from '../actions/requestPermissions.js'
import type { Config } from '../createConfig.js'
import type { MutationParameter } from '../types/query.js'
import type { Compute } from '../types/utils.js'

export type RequestPermissionsOptions<context = unknown> = MutationParameter<
  RequestPermissionsData,
  RequestPermissionsErrorType,
  RequestPermissionsVariables,
  context
>

export function requestPermissionsMutationOptions<
  config extends Config,
  context,
>(
  config: config,
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

export type RequestPermissionsData = Compute<RequestPermissionsReturnType>

export type RequestPermissionsVariables = RequestPermissionsParameters

export type RequestPermissionsMutate<context = unknown> = (
  variables: RequestPermissionsVariables,
  options?:
    | Compute<
        MutateOptions<
          RequestPermissionsData,
          RequestPermissionsErrorType,
          Compute<RequestPermissionsVariables>,
          context
        >
      >
    | undefined,
) => void

export type RequestPermissionsMutateAsync<context = unknown> = (
  variables: RequestPermissionsVariables,
  options?:
    | Compute<
        MutateOptions<
          RequestPermissionsData,
          RequestPermissionsErrorType,
          Compute<RequestPermissionsVariables>,
          context
        >
      >
    | undefined,
) => Promise<RequestPermissionsData>
