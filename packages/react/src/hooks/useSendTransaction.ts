import { useMutation } from '@tanstack/react-query'
import type {
  Config,
  ResolvedRegister,
  SendTransactionError,
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
import type { UseMutationOptions, UseMutationResult } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSendTransactionParameters<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  UseMutationOptions<
    SendTransactionData,
    SendTransactionError,
    SendTransactionVariables<config, config['chains'][number]['id']>,
    context
  > &
    ConfigParameter<config>
>

export type UseSendTransactionReturnType<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  UseMutationResult<
    SendTransactionData,
    SendTransactionError,
    SendTransactionVariables<config, config['chains'][number]['id']>,
    context
  > & {
    sendTransaction: SendTransactionMutate<config, context>
    sendTransactionAsync: SendTransactionMutateAsync<config, context>
  }
>

/** https://wagmi.sh/react/hooks/useSendTransaction */
export function useSendTransaction<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSendTransactionParameters<config, context> = {},
): UseSendTransactionReturnType<config, context> {
  const config = useConfig(parameters)
  const mutationOptions = sendTransactionMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  type Return = UseSendTransactionReturnType<config, context>
  return {
    ...result,
    sendTransaction: mutate as Return['sendTransaction'],
    sendTransactionAsync: mutateAsync as Return['sendTransactionAsync'],
  }
}
