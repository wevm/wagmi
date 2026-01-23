'use client'
import { useMutation } from '@tanstack/react-query'
import type { SignMessageErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type SignMessageData,
  type SignMessageMutate,
  type SignMessageMutateAsync,
  type SignMessageOptions,
  type SignMessageVariables,
  signMessageMutationOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSignMessageParameters<context = unknown> = Compute<
  ConfigParameter & SignMessageOptions<context>
>

export type UseSignMessageReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    SignMessageData,
    SignMessageErrorType,
    SignMessageVariables,
    context,
    SignMessageMutate<context>,
    SignMessageMutateAsync<context>
  > & {
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
  const options = signMessageMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseSignMessageReturnType<context>
  return {
    ...(mutation as Return),
    signMessage: mutation.mutate as Return['mutate'],
    signMessageAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
