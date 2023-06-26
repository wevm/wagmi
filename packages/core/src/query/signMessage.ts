import {
  type SignMessageError,
  type SignMessageParameters,
  type SignMessageReturnType,
  signMessage,
} from '../actions/signMessage.js'
import { type Config } from '../config.js'
import { type Evaluate, type IsUndefined } from '../types/utils.js'
import { type Mutate, type MutateAsync, type MutationOptions } from './types.js'

export type SignMessageOptions<
  message extends SignMessageParameters['message'] | undefined,
> = Evaluate<
  Omit<SignMessageParameters, 'message'> & {
    message?: message | SignMessageParameters['message'] | undefined
  }
>

/** https://wagmi.sh/core/actions/signMessage#tanstack-query */
export const signMessageMutationOptions = <
  message extends SignMessageParameters['message'] | undefined,
>(
  config: Config,
  options: SignMessageOptions<message> = {},
) =>
  ({
    getVariables(variables) {
      return {
        message: (variables?.message ?? options.message)!,
      }
    },
    mutationFn(variables) {
      return signMessage(config, variables)
    },
    mutationKey: ['signMessage', options],
  }) as const satisfies MutationOptions<
    SignMessageData,
    SignMessageError,
    SignMessageVariables<undefined>,
    SignMessageParameters
  >

export type SignMessageData = SignMessageReturnType

export type SignMessageVariables<
  message extends SignMessageParameters['message'] | undefined,
> = Evaluate<
  Omit<SignMessageParameters, 'message'> &
    (IsUndefined<message> extends false
      ? { message?: SignMessageParameters['message'] | undefined }
      : { message: SignMessageParameters['message'] })
>

export type SignMessageMutate<
  message extends SignMessageParameters['message'] | undefined,
  context = unknown,
> = Mutate<
  SignMessageData,
  SignMessageError,
  SignMessageVariables<undefined>,
  context,
  SignMessageVariables<message>
>

export type SignMessageMutateAsync<
  message extends SignMessageParameters['message'] | undefined,
  context = unknown,
> = MutateAsync<
  SignMessageData,
  SignMessageError,
  SignMessageVariables<undefined>,
  context,
  SignMessageVariables<message>
>
