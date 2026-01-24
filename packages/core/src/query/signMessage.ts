import type { MutationOptions } from '@tanstack/query-core'
import {
  type SignMessageErrorType,
  type SignMessageParameters,
  type SignMessageReturnType,
  signMessage,
} from '../actions/signMessage.js'
import type { Config } from '../createConfig.js'
import type { MutationParameter } from '../types/query.js'
import type { Compute } from '../types/utils.js'
import type { Mutate, MutateAsync } from './types.js'

export type SignMessageOptions<context = unknown> = MutationParameter<
  SignMessageData,
  SignMessageErrorType,
  SignMessageVariables,
  context
>

export function signMessageMutationOptions<context>(
  config: Config,
  options: SignMessageOptions<context> = {},
): SignMessageMutationOptions {
  return {
    ...(options.mutation as any),
    mutationFn(variables) {
      return signMessage(config, variables)
    },
    mutationKey: ['signMessage'],
  }
}

export type SignMessageMutationOptions = MutationOptions<
  SignMessageData,
  SignMessageErrorType,
  SignMessageVariables
>

export type SignMessageData = SignMessageReturnType

export type SignMessageVariables = Compute<SignMessageParameters>

export type SignMessageMutate<context = unknown> = Mutate<
  SignMessageData,
  SignMessageErrorType,
  SignMessageVariables,
  context
>

export type SignMessageMutateAsync<context = unknown> = MutateAsync<
  SignMessageData,
  SignMessageErrorType,
  SignMessageVariables,
  context
>
