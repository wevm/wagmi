'use client'

import { useMutation } from '@tanstack/react-query'
import type {
  Config,
  ResolvedRegister,
  SendCallsSyncErrorType,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type SendCallsSyncData,
  type SendCallsSyncMutate,
  type SendCallsSyncMutateAsync,
  type SendCallsSyncVariables,
  sendCallsSyncMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSendCallsSyncParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          SendCallsSyncData,
          SendCallsSyncErrorType,
          SendCallsSyncVariables<config, config['chains'][number]['id']>,
          context
        >
      | undefined
  }
>

export type UseSendCallsSyncReturnType<
  config extends Config = Config,
  context = unknown,
> = Compute<
  UseMutationReturnType<
    SendCallsSyncData,
    SendCallsSyncErrorType,
    SendCallsSyncVariables<config, config['chains'][number]['id']>,
    context
  > & {
    mutate: SendCallsSyncMutate<config, context>
    mutateAsync: SendCallsSyncMutateAsync<config, context>
    /** @deprecated use `mutate` instead */
    sendCallsSync: SendCallsSyncMutate<config, context>
    /** @deprecated use `mutateAsync` instead */
    sendCallsSyncAsync: SendCallsSyncMutateAsync<config, context>
  }
>

/** https://wagmi.sh/react/api/hooks/useSendCallsSync */
export function useSendCallsSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSendCallsSyncParameters<config, context> = {},
): UseSendCallsSyncReturnType<config, context> {
  const config = useConfig(parameters)
  const mutationOptions = sendCallsSyncMutationOptions(config)
  const mutation = useMutation({ ...parameters.mutation, ...mutationOptions })
  type Return = UseSendCallsSyncReturnType<config, context>
  return {
    ...mutation,
    mutate: mutation.mutate as Return['mutate'],
    mutateAsync: mutation.mutateAsync as Return['mutateAsync'],
    sendCallsSync: mutation.mutate as Return['mutate'],
    sendCallsSyncAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
