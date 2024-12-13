'use client'

import { useMutation } from '@tanstack/react-query'
import type {
  Config,
  ResolvedRegister,
  SendRawTransactionErrorType,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type SendRawTransactionData,
  type SendRawTransactionMutate,
  type SendRawTransactionMutateAsync,
  type SendRawTransactionVariables,
  sendRawTransactionMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSendRawTransactionParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          SendRawTransactionData,
          SendRawTransactionErrorType,
          SendRawTransactionVariables<config, config['chains'][number]['id']>,
          context
        >
      | undefined
  }
>

export type UseSendRawTransactionReturnType<
  config extends Config = Config,
  context = unknown,
> = Compute<
  UseMutationReturnType<
    SendRawTransactionData,
    SendRawTransactionErrorType,
    SendRawTransactionVariables<config, config['chains'][number]['id']>,
    context
  > & {
    sendRawTransaction: SendRawTransactionMutate<config, context>
    sendRawTransactionAsync: SendRawTransactionMutateAsync<config, context>
  }
>

/** https://wagmi.sh/react/api/hooks/useSendRawTransaction */
export function useSendRawTransaction<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSendRawTransactionParameters<config, context> = {},
): UseSendRawTransactionReturnType<config, context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = sendRawTransactionMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  type Return = UseSendRawTransactionReturnType<config, context>
  return {
    ...result,
    sendRawTransaction: mutate as Return['sendRawTransaction'],
    sendRawTransactionAsync: mutateAsync as Return['sendRawTransactionAsync'],
  }
}
