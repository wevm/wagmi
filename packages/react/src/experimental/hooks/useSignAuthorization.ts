'use client'

import { useMutation } from '@tanstack/react-query'
import type { Config, ResolvedRegister } from '@wagmi/core'
import {
  type SignAuthorizationData,
  type SignAuthorizationErrorType,
  type SignAuthorizationMutate,
  type SignAuthorizationMutateAsync,
  type SignAuthorizationVariables,
  signAuthorizationMutationOptions,
} from '@wagmi/core/experimental'
import type { Compute } from '@wagmi/core/internal'

import { useConfig } from '../../hooks/useConfig.js'
import type { ConfigParameter } from '../../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../../utils/query.js'

export type UseSignAuthorizationParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          SignAuthorizationData,
          SignAuthorizationErrorType,
          SignAuthorizationVariables,
          context
        >
      | undefined
  }
>

export type UseSignAuthorizationReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    SignAuthorizationData,
    SignAuthorizationErrorType,
    SignAuthorizationVariables,
    context
  > & {
    signAuthorization: SignAuthorizationMutate<context>
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
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = signAuthorizationMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  type Return = UseSignAuthorizationReturnType<context>
  return {
    ...result,
    signAuthorization: mutate as Return['signAuthorization'],
    signAuthorizationAsync: mutateAsync as Return['signAuthorizationAsync'],
  }
}
