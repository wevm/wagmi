'use client'

import { useMutation } from '@tanstack/react-query'
import type { SignMessageErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type SignMessageData,
  type SignMessageMutate,
  type SignMessageMutateAsync,
  type SignMessageVariables,
  signMessageMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSignMessageParameters<context = unknown> = Compute<
  ConfigParameter & {
    mutation?:
      | UseMutationParameters<
          SignMessageData,
          SignMessageErrorType,
          SignMessageVariables,
          context
        >
      | undefined
  }
>

export type UseSignMessageReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    SignMessageData,
    SignMessageErrorType,
    SignMessageVariables,
    context
  > & {
    mutate: SignMessageMutate<context>
    mutateAsync: SignMessageMutateAsync<context>
    /** @deprecated use `mutate` instead */
    signMessage: SignMessageMutate<context>
    /** @deprecated use `mutateAsync` instead */
    signMessageAsync: SignMessageMutateAsync<context>
  }
>

/** https://wagmi.sh/react/api/hooks/useSignMessage */
export function useSignMessage<context = unknown>(
  parameters: UseSignMessageParameters<context> = {},
): UseSignMessageReturnType<context> {
  const config = useConfig(parameters)
  const mutationOptions = signMessageMutationOptions(config)
  const mutation = useMutation({ ...parameters.mutation, ...mutationOptions })
  return {
    ...mutation,
    signMessage: mutation.mutate,
    signMessageAsync: mutation.mutateAsync,
  }
}
