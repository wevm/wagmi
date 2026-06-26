'use client'
import { useMutation } from '@tanstack/react-query'
import type {
  Config,
  ResolvedRegister,
  SignAuthorizationErrorType,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type SignAuthorizationData,
  type SignAuthorizationMutate,
  type SignAuthorizationMutateAsync,
  type SignAuthorizationOptions,
  type SignAuthorizationVariables,
  signAuthorizationMutationOptions,
} from '@wagmi/core/query'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSignAuthorizationParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<ConfigParameter<config> & SignAuthorizationOptions<context>>

export type UseSignAuthorizationReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    SignAuthorizationData,
    SignAuthorizationErrorType,
    SignAuthorizationVariables,
    context,
    SignAuthorizationMutate<context>,
    SignAuthorizationMutateAsync<context>
  > & {
    /** @deprecated use `mutate` instead */
    signAuthorization: SignAuthorizationMutate<context>
    /** @deprecated use `mutateAsync` instead */
    signAuthorizationAsync: SignAuthorizationMutateAsync<context>
  }
>

/** https://wagmi.sh/react/api/hooks/useSignAuthorization */
export function useSignAuthorization<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSignAuthorizationParameters<config, context> = {},
): UseSignAuthorizationReturnType<context> {
  const config = useConfig(parameters)
  const options = signAuthorizationMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseSignAuthorizationReturnType<context>
  return {
    ...(mutation as Return),
    signAuthorization: mutation.mutate as Return['mutate'],
    signAuthorizationAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
