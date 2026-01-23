'use client'
import { useMutation } from '@tanstack/react-query'
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
  type SendTransactionOptions,
  type SendTransactionVariables,
  sendTransactionMutationOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseSendTransactionParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<ConfigParameter<config> & SendTransactionOptions<config, context>>

export type UseSendTransactionReturnType<
  config extends Config = Config,
  context = unknown,
> = Compute<
  UseMutationReturnType<
    SendTransactionData,
    SendTransactionErrorType,
    SendTransactionVariables<config, config['chains'][number]['id']>,
    context,
    SendTransactionMutate<config, context>,
    SendTransactionMutateAsync<config, context>
  > & {
    /** @deprecated use `mutate` instead */
    sendTransaction: SendTransactionMutate<config, context>
    /** @deprecated use `mutateAsync` instead */
    sendTransactionAsync: SendTransactionMutateAsync<config, context>
  }
>

/** https://wagmi.sh/react/api/hooks/useSendTransaction */
export function useSendTransaction<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSendTransactionParameters<config, context> = {},
): UseSendTransactionReturnType<config, context> {
  const config = useConfig(parameters)
  const options = sendTransactionMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseSendTransactionReturnType<config, context>
  return {
    ...(mutation as Return),
    sendTransaction: mutation.mutate as Return['mutate'],
    sendTransactionAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
