'use client'
import { useMutation } from '@tanstack/react-query'
import type { Config, ResolvedRegister, SendCallsErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type SendCallsData,
  type SendCallsMutate,
  type SendCallsMutateAsync,
  type SendCallsOptions,
  type SendCallsVariables,
  sendCallsMutationOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSendCallsParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<ConfigParameter<config> & SendCallsOptions<config, context>>

export type UseSendCallsReturnType<
  config extends Config = Config,
  context = unknown,
> = Compute<
  UseMutationReturnType<
    SendCallsData,
    SendCallsErrorType,
    SendCallsVariables<config, config['chains'][number]['id']>,
    context,
    SendCallsMutate<config, context>,
    SendCallsMutateAsync<config, context>
  > & {
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
  const options = sendCallsMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseSendCallsReturnType<config, context>
  return {
    ...(mutation as Return),
    sendCalls: mutation.mutate as Return['mutate'],
    sendCallsAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
