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
    sendCallsSync: SendCallsSyncMutate<config, context>
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
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = sendCallsSyncMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  type Return = UseSendCallsSyncReturnType<config, context>
  return {
    ...result,
    sendCallsSync: mutate as Return['sendCallsSync'],
    sendCallsSyncAsync: mutateAsync as Return['sendCallsSyncAsync'],
  }
}
