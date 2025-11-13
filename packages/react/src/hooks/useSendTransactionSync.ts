'use client'

import { useMutation } from '@tanstack/react-query'
import type {
  Config,
  ResolvedRegister,
  SendTransactionSyncErrorType,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type SendTransactionSyncData,
  type SendTransactionSyncMutate,
  type SendTransactionSyncMutateAsync,
  type SendTransactionSyncVariables,
  sendTransactionSyncMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSendTransactionSyncParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          SendTransactionSyncData,
          SendTransactionSyncErrorType,
          SendTransactionSyncVariables<config, config['chains'][number]['id']>,
          context
        >
      | undefined
  }
>

export type UseSendTransactionSyncReturnType<
  config extends Config = Config,
  context = unknown,
> = Compute<
  UseMutationReturnType<
    SendTransactionSyncData,
    SendTransactionSyncErrorType,
    SendTransactionSyncVariables<config, config['chains'][number]['id']>,
    context
  > & {
    sendTransactionSync: SendTransactionSyncMutate<config, context>
    sendTransactionSyncAsync: SendTransactionSyncMutateAsync<config, context>
  }
>

/** https://wagmi.sh/react/api/hooks/useSendTransactionSync */
export function useSendTransactionSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSendTransactionSyncParameters<config, context> = {},
): UseSendTransactionSyncReturnType<config, context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = sendTransactionSyncMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  type Return = UseSendTransactionSyncReturnType<config, context>
  return {
    ...result,
    sendTransactionSync: mutate as Return['sendTransactionSync'],
    sendTransactionSyncAsync: mutateAsync as Return['sendTransactionSyncAsync'],
  }
}
