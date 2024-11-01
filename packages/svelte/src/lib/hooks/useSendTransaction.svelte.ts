import { createMutation } from '@tanstack/svelte-query'
import type {
  Config,
  ResolvedRegister,
  SendTransactionErrorType,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type SendTransactionData,
  type SendTransactionMutate,
  type SendTransactionMutateAsync,
  type SendTransactionVariables,
  sendTransactionMutationOptions,
} from '@wagmi/core/query'

import type {
  CreateMutationParameters,
  CreateMutationReturnType,
} from '$lib/query.svelte.js'
import type { RuneParameters, RuneReturnType } from '$lib/types.js'
import type { ConfigParameter } from '../types.js'
import { useConfig } from './useConfig.svelte.js'

export type UseSendTransactionParameters<
  config extends Config = Config,
  context = unknown,
> = RuneParameters<
  Compute<
    ConfigParameter<config> & {
      mutation?:
        | CreateMutationParameters<
            SendTransactionData,
            SendTransactionErrorType,
            SendTransactionVariables<config, config['chains'][number]['id']>,
            context
          >
        | undefined
    }
  >
>

export type UseSendTransactionReturnType<
  config extends Config = Config,
  context = unknown,
> = RuneReturnType<
  Compute<
    CreateMutationReturnType<
      SendTransactionData,
      SendTransactionErrorType,
      SendTransactionVariables<config, config['chains'][number]['id']>,
      context
    > & {
      sendTransaction: SendTransactionMutate<config, context>
      sendTransactionAsync: SendTransactionMutateAsync<config, context>
    }
  >
>

/** https://wagmi.sh/react/api/hooks/useSendTransaction */
export function useSendTransaction<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSendTransactionParameters<config, context> = () => ({}),
): UseSendTransactionReturnType<config, context> {
  const { mutation } = $derived.by(parameters)

  const config = $derived.by(useConfig(parameters))

  const mutationOptions = $derived(sendTransactionMutationOptions(config))
  const query = createMutation(() => ({
    ...mutation,
    ...mutationOptions,
  }))
  const { mutate, mutateAsync, ...result } = $derived(query)

  return () => ({
    ...result,
    sendTransaction: mutate,
    sendTransactionAsync: mutateAsync,
  })
}
