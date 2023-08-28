import { useMutation } from '@tanstack/react-query'
import { type SignMessageError } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SignMessageData,
  type SignMessageMutate,
  type SignMessageMutateAsync,
  type SignMessageVariables,
  signMessageMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationOptions, UseMutationResult } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSignMessageParameters<context = unknown> = Evaluate<
  UseMutationOptions<
    SignMessageData,
    SignMessageError,
    SignMessageVariables,
    context
  > &
    ConfigParameter
>

export type UseSignMessageReturnType<context = unknown> = Evaluate<
  UseMutationResult<
    SignMessageData,
    SignMessageError,
    SignMessageVariables,
    context
  > & {
    signMessage: SignMessageMutate<context>
    signMessageAsync: SignMessageMutateAsync<context>
  }
>

/** https://wagmi.sh/react/hooks/useSignMessage */
export function useSignMessage<context = unknown>(
  parameters: UseSignMessageParameters<context> = {},
): UseSignMessageReturnType<context> {
  const config = parameters.config ?? useConfig()
  const mutationOptions = signMessageMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  return {
    ...result,
    signMessage: mutate,
    signMessageAsync: mutateAsync,
  }
}
