import type { MutationOptions } from '@tanstack/query-core'

import {
  type SignMessageError,
  type SignMessageParameters,
  type SignMessageReturnType,
  signMessage,
} from '../actions/signMessage.js'
import { type Config } from '../config.js'
import { type Evaluate } from '../types/utils.js'
import { type Mutate, type MutateAsync } from './types.js'

export function signMessageMutationOptions(config: Config) {
  return {
    mutationFn(variables) {
      return signMessage(config, variables)
    },
    mutationKey: ['signMessage'],
  } as const satisfies MutationOptions<
    SignMessageData,
    SignMessageError,
    SignMessageVariables
  >
}

export type SignMessageData = SignMessageReturnType

export type SignMessageVariables = Evaluate<SignMessageParameters>

export type SignMessageMutate<context = unknown> = Mutate<
  SignMessageData,
  SignMessageError,
  SignMessageVariables,
  context
>

export type SignMessageMutateAsync<context = unknown> = MutateAsync<
  SignMessageData,
  SignMessageError,
  SignMessageVariables,
  context
>
