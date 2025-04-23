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
    sendCalls: SendCallsMutate<config, context>
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
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = sendCallsMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  type Return = UseSendCallsReturnType<config, context>
  return {
    ...result,
    sendCalls: mutate as Return['sendCalls'],
    sendCallsAsync: mutateAsync as Return['sendCallsAsync'],
  }
}
