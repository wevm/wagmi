import { useMutation } from '@tanstack/react-query'
import type { SignMessageError, SignMessageParameters } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SignMessageData,
  type SignMessageMutate,
  type SignMessageMutateAsync,
  type SignMessageOptions,
  type SignMessageVariables,
  signMessageMutationOptions,
} from '@wagmi/core/query'
import * as React from 'react'

import type { UseMutationOptions, UseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseSignMessageParameters<
  message extends SignMessageParameters['message'] | undefined =
    | SignMessageParameters['message']
    | undefined,
  context = unknown,
> = Evaluate<
  SignMessageOptions<message> &
    UseMutationOptions<
      SignMessageData,
      SignMessageError,
      SignMessageVariables<message>,
      context
    >
>

export type UseSignMessageReturnType<
  message extends SignMessageParameters['message'] | undefined =
    | SignMessageParameters['message']
    | undefined,
  context = unknown,
> = Evaluate<
  UseMutationResult<
    SignMessageData,
    SignMessageError,
    SignMessageVariables<message>,
    context
  > & {
    signMessage: SignMessageMutate<message, context>
    signMessageAsync: SignMessageMutateAsync<message, context>
  }
>

export function useSignMessage<
  message extends SignMessageParameters['message'] | undefined,
  context = unknown,
>(
  parameters?: UseSignMessageParameters<message, context>,
): UseSignMessageReturnType<message, context>

/** https://wagmi.sh/react/hooks/useSignMessage */
export function useSignMessage(
  parameters: UseSignMessageParameters = {},
): UseSignMessageReturnType {
  const config = useConfig()
  const { getVariables, ...mutationOptions } = signMessageMutationOptions(
    config,
    parameters,
  )
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  return {
    ...result,
    signMessage: React.useCallback(
      (variables, options) => mutate(getVariables(variables), options),
      [getVariables, mutate],
    ),
    signMessageAsync: React.useCallback(
      (variables, options) => mutateAsync(getVariables(variables), options),
      [getVariables, mutateAsync],
    ),
  }
}
