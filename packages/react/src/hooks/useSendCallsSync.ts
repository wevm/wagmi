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
  type SendCallsSyncOptions,
  type SendCallsSyncVariables,
  sendCallsSyncMutationOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSendCallsSyncParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<ConfigParameter<config> & SendCallsSyncOptions<config, context>>

export type UseSendCallsSyncReturnType<
  config extends Config = Config,
  context = unknown,
> = Compute<
  UseMutationReturnType<
    SendCallsSyncData,
    SendCallsSyncErrorType,
    SendCallsSyncVariables<config, config['chains'][number]['id']>,
    context,
    SendCallsSyncMutate<config, context>,
    SendCallsSyncMutateAsync<config, context>
  > & {
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
  const options = sendCallsSyncMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseSendCallsSyncReturnType<config, context>
  return {
    ...(mutation as Return),
    sendCallsSync: mutation.mutate as Return['mutate'],
    sendCallsSyncAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
