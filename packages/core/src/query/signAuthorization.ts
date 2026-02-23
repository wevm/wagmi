import type { MutationOptions } from '@tanstack/query-core'
import {
  type SignAuthorizationErrorType,
  type SignAuthorizationParameters,
  type SignAuthorizationReturnType,
  signAuthorization,
} from '../actions/signAuthorization.js'
import type { Config } from '../createConfig.js'
import type { MutationParameter } from '../types/query.js'
import type { Compute } from '../types/utils.js'
import type { Mutate, MutateAsync } from './types.js'

export type SignAuthorizationOptions<context = unknown> = MutationParameter<
  SignAuthorizationData,
  SignAuthorizationErrorType,
  SignAuthorizationVariables,
  context
>

export function signAuthorizationMutationOptions<context>(
  config: Config,
  options: SignAuthorizationOptions<context> = {},
): SignAuthorizationMutationOptions {
  return {
    ...(options.mutation as any),
    mutationFn(variables) {
      return signAuthorization(config, variables)
    },
    mutationKey: ['signAuthorization'],
  }
}

export type SignAuthorizationMutationOptions = MutationOptions<
  SignAuthorizationData,
  SignAuthorizationErrorType,
  SignAuthorizationVariables
>

export type SignAuthorizationData = SignAuthorizationReturnType

export type SignAuthorizationVariables = Compute<SignAuthorizationParameters>

export type SignAuthorizationMutate<context = unknown> = Mutate<
  SignAuthorizationData,
  SignAuthorizationErrorType,
  SignAuthorizationVariables,
  context
>

export type SignAuthorizationMutateAsync<context = unknown> = MutateAsync<
  SignAuthorizationData,
  SignAuthorizationErrorType,
  SignAuthorizationVariables,
  context
>
