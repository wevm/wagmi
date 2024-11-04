import type { MutateOptions, MutationOptions } from '@tanstack/query-core'

import type { Config } from '../../createConfig.js'
import type { Compute } from '../../types/utils.js'
import {
  type SignAuthorizationErrorType,
  type SignAuthorizationParameters,
  type SignAuthorizationReturnType,
  signAuthorization,
} from '../actions/signAuthorization.js'

export function signAuthorizationMutationOptions(
  config: Config,
){
  return {
    mutationFn(variables) {
      return signAuthorization(config, variables)
    },
    mutationKey: ['signAuthorization'],
  } as const satisfies MutationOptions<
    SignAuthorizationData,
    SignAuthorizationErrorType,
    SignAuthorizationVariables
  >
}

export type SignAuthorizationData = SignAuthorizationReturnType

export type SignAuthorizationVariables = SignAuthorizationParameters

export type SignAuthorizationMutate<context = unknown> =(
  variables: SignAuthorizationVariables,
  options?:
    | Compute<
        MutateOptions<
          SignAuthorizationData,
          SignAuthorizationErrorType,
          SignAuthorizationVariables,
          context
        >
      >
    | undefined,
) => void

export type SignAuthorizationMutateAsync<context = unknown> =(
  variables: SignAuthorizationVariables,
  options?:
    | Compute<
        MutateOptions<
          SignAuthorizationData,
          SignAuthorizationErrorType,
          SignAuthorizationVariables,
          context
        >
      >
    | undefined,
) => Promise<SignAuthorizationData>