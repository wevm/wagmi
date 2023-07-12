import { useMutation } from '@tanstack/react-query'
import { type SignMessageError } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SignMessageData,
  type SignMessageMutate,
  type SignMessageMutateAsync,
  type SignMessageOptions,
  type SignMessageVariables,
  signMessageMutationOptions,
} from '@wagmi/core/query'
import { useCallback } from 'react'
import type { SignableMessage } from 'viem'

import type { UseMutationOptions, UseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseSignMessageParameters<
  message extends SignableMessage | undefined = undefined,
  context = unknown,
> = Evaluate<
  SignMessageOptions<message> &
    UseMutationOptions<
      SignMessageData,
      SignMessageError,
      SignMessageVariables<undefined>,
      context
    >
>

export type UseSignMessageReturnType<
  message extends SignableMessage | undefined = undefined,
  context = unknown,
> = Evaluate<
  UseMutationResult<
    SignMessageData,
    SignMessageError,
    SignMessageVariables<undefined>,
    context
  > & {
    signMessage: SignMessageMutate<message, context>
    signMessageAsync: SignMessageMutateAsync<message, context>
  }
>

export function useSignMessage<
  message extends SignableMessage | undefined = undefined,
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
    signMessage: useCallback(
      (variables, options) => mutate(getVariables(variables), options),
      [getVariables, mutate],
    ),
    signMessageAsync: useCallback(
      (variables, options) => mutateAsync(getVariables(variables), options),
      [getVariables, mutateAsync],
    ),
  }
}
