import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query'
import {
  type OmittedMutationOptions,
  type SignMessageError,
  type SignMessageMutationData,
  type SignMessageMutationParameters,
  type SignMessageMutationVariables,
  type SignMessageParameters,
  signMessageMutationOptions,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'

import type { OmittedUseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseSignMessageParameters<
  message extends SignMessageParameters['message'] | undefined =
    | SignMessageParameters['message']
    | undefined,
  context = unknown,
> = Evaluate<
  SignMessageMutationParameters<message> & {
    mutation?: Omit<
      UseMutationOptions<
        SignMessageMutationData,
        SignMessageError,
        SignMessageMutationVariables<message>,
        context
      >,
      OmittedMutationOptions
    >
  }
>

export type UseSignMessageReturnType<
  message extends SignMessageParameters['message'] | undefined =
    | SignMessageParameters['message']
    | undefined,
  context = unknown,
> = Evaluate<
  Omit<Result<message, context>, OmittedUseMutationResult> & {
    signMessage: Result<message, context>['mutate']
    signMessageAsync: Result<message, context>['mutateAsync']
  }
>
type Result<
  message extends SignMessageParameters['message'] | undefined,
  context = unknown,
> = UseMutationResult<
  SignMessageMutationData,
  SignMessageError,
  SignMessageMutationVariables<message>,
  context
>

/** https://wagmi.sh/react/hooks/useSignMessage */
export function useSignMessage<
  message extends SignMessageParameters['message'] | undefined,
  context = unknown,
>(
  parameters?: UseSignMessageParameters<message, context>,
): UseSignMessageReturnType<message, context>
export function useSignMessage({
  message,
  mutation,
}: UseSignMessageParameters = {}): UseSignMessageReturnType {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation(
    signMessageMutationOptions(config, { message }),
  )

  return {
    ...mutationOptions,
    ...mutation,
    signMessage: mutate,
    signMessageAsync: mutateAsync,
  }
}
