import { useMutation } from '@tanstack/vue-query'
import type {
  Config,
  ResolvedRegister,
  SendEip712TransactionErrorType,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type SendEip712TransactionData,
  type SendEip712TransactionMutate,
  type SendEip712TransactionMutateAsync,
  type SendEip712TransactionVariables,
  sendEip712TransactionMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSendEip712TransactionParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          SendEip712TransactionData,
          SendEip712TransactionErrorType,
          SendEip712TransactionVariables<
            config,
            config['chains'][number]['id']
          >,
          context
        >
      | undefined
  }
>

export type UseSendEip712TransactionReturnType<
  config extends Config = Config,
  context = unknown,
> = Compute<
  UseMutationReturnType<
    SendEip712TransactionData,
    SendEip712TransactionErrorType,
    SendEip712TransactionVariables<config, config['chains'][number]['id']>,
    context
  > & {
    sendEip712Transaction: SendEip712TransactionMutate<config, context>
    sendEip712TransactionAsync: SendEip712TransactionMutateAsync<
      config,
      context
    >
  }
>

/** https://wagmi.sh/vue/api/composables/useSendEip712Transaction */
export function useSendEip712Transaction<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSendEip712TransactionParameters<config, context> = {},
): UseSendEip712TransactionReturnType<config, context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = sendEip712TransactionMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  return {
    ...result,
    sendEip712Transaction: mutate,
    sendEip712TransactionAsync: mutateAsync,
  } as UseSendEip712TransactionReturnType<config, context>
}
