'use client'

import { useMutation } from '@tanstack/react-query'
import type { Config, ResolvedRegister, SendCallsErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type SendCallsData,
  type SendCallsMutate,
  type SendCallsMutateAsync,
  type SendCallsVariables,
  sendCallsMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSendCallsParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          SendCallsData,
          SendCallsErrorType,
          SendCallsVariables<config, config['chains'][number]['id']>,
          context
        >
      | undefined
  }
>

export type UseSendCallsReturnType<
  config extends Config = Config,
  context = unknown,
> = Compute<
  UseMutationReturnType<
    SendCallsData,
    SendCallsErrorType,
    SendCallsVariables<config, config['chains'][number]['id']>,
    context
  > & {
    mutate: SendCallsMutate<config, context>
    mutateAsync: SendCallsMutateAsync<config, context>
    /** @deprecated use `mutate` instead */
    sendCalls: SendCallsMutate<config, context>
    /** @deprecated use `mutateAsync` instead */
    sendCallsAsync: SendCallsMutateAsync<config, context>
  }
>

/** https://wagmi.sh/react/api/hooks/useSendCalls */
export function useSendCalls<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSendCallsParameters<config, context> = {},
): UseSendCallsReturnType<config, context> {
  const config = useConfig(parameters)
  const mutationOptions = sendCallsMutationOptions(config)
  const mutation = useMutation({ ...parameters.mutation, ...mutationOptions })
  type Return = UseSendCallsReturnType<config, context>
  return {
    ...mutation,
    mutate: mutation.mutate as Return['mutate'],
    mutateAsync: mutation.mutateAsync as Return['mutateAsync'],
    sendCalls: mutation.mutate as Return['mutate'],
    sendCallsAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
