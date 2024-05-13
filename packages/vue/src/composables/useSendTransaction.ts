import { useMutation } from '@tanstack/vue-query'
import type {
  Config,
  ResolvedRegister,
  SendTransactionErrorType,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SendTransactionData,
  type SendTransactionMutate,
  type SendTransactionMutateAsync,
  type SendTransactionVariables,
  sendTransactionMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSendTransactionParameters<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          SendTransactionData,
          SendTransactionErrorType,
          SendTransactionVariables<config, config['chains'][number]['id']>,
          context
        >
      | undefined
  }
>

export type UseSendTransactionReturnType<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  UseMutationReturnType<
    SendTransactionData,
    SendTransactionErrorType,
    SendTransactionVariables<config, config['chains'][number]['id']>,
    context
  > & {
    sendTransaction: SendTransactionMutate<config, context>
    sendTransactionAsync: SendTransactionMutateAsync<config, context>
  }
>

/** https://wagmi.sh/vue/api/composables/useSendTransaction */
export function useSendTransaction<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSendTransactionParameters<config, context> = {},
): UseSendTransactionReturnType<config, context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = sendTransactionMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  return {
    ...result,
    sendTransaction: mutate,
    sendTransactionAsync: mutateAsync,
  } as UseSendTransactionReturnType<config, context>
}
