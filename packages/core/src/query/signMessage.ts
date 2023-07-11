import type { SignableMessage } from 'viem'

import {
  type SignMessageError,
  type SignMessageParameters,
  type SignMessageReturnType,
  signMessage,
} from '../actions/signMessage.js'
import { type Config } from '../config.js'
import {
  type Evaluate,
  type ExactPartial,
  type Omit,
  type PartialBy,
} from '../types/utils.js'
import { mergeWithOutUndefined } from '../utils/mergeWithOutUndefined.js'
import { type Mutate, type MutateAsync, type MutationOptions } from './types.js'

export type SignMessageOptions<message extends SignableMessage | undefined,> =
  Evaluate<
    ExactPartial<Omit<SignMessageParameters, 'message'>> & {
      message?: message | SignableMessage | undefined
    }
  >

export function signMessageMutationOptions<
  message extends SignableMessage | undefined,
>(config: Config, options: SignMessageOptions<message> = {}) {
  return {
    getVariables(variables) {
      return {
        ...mergeWithOutUndefined(options, variables),
        message: (variables?.message ?? options.message)!,
      }
    },
    mutationFn(variables) {
      return signMessage(config, variables)
    },
    mutationKey: ['signMessage', options],
  } as const satisfies MutationOptions<
    SignMessageData,
    SignMessageError,
    SignMessageVariables<undefined>,
    SignMessageParameters
  >
}

export type SignMessageData = SignMessageReturnType

export type SignMessageVariables<message extends SignableMessage | undefined> =
  | Evaluate<
      PartialBy<
        SignMessageParameters,
        message extends SignableMessage ? 'message' : never
      >
    >
  | (message extends SignableMessage ? undefined : never)

export type SignMessageMutate<
  message extends SignableMessage | undefined,
  context = unknown,
> = Mutate<
  SignMessageData,
  SignMessageError,
  SignMessageVariables<undefined>,
  context,
  SignMessageVariables<message>
>

export type SignMessageMutateAsync<
  message extends SignableMessage | undefined,
  context = unknown,
> = MutateAsync<
  SignMessageData,
  SignMessageError,
  SignMessageVariables<undefined>,
  context,
  SignMessageVariables<message>
>
