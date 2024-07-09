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
    signMessage: SignMessageMutate<context>
    signMessageAsync: SignMessageMutateAsync<context>
  }
>

/** https://wagmi.sh/react/api/hooks/useSignMessage */
export function useSignMessage<context = unknown>(
  parameters: UseSignMessageParameters<context> = {},
): UseSignMessageReturnType<context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = signMessageMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  return {
    ...result,
    signMessage: mutate,
    signMessageAsync: mutateAsync,
  }
}
