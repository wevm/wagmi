import { useMutation } from '@tanstack/react-query'
import type { ResolvedRegister, SendTransactionError } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SendTransactionData,
  type SendTransactionMutate,
  type SendTransactionMutateAsync,
  type SendTransactionVariables,
  sendTransactionMutationOptions,
} from '@wagmi/core/query'

import type { UseMutationOptions, UseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

type ChainId = ResolvedRegister['config']['chains'][number]['id']

export type UseSendTransactionParameters<context = unknown> =
  UseMutationOptions<
    SendTransactionData,
    SendTransactionError,
    SendTransactionVariables<ResolvedRegister['config'], ChainId>,
    context
  >

export type UseSendTransactionReturnType<context = unknown> = Evaluate<
  UseMutationResult<
    SendTransactionData,
    SendTransactionError,
    SendTransactionVariables<ResolvedRegister['config'], ChainId>,
    context
  > & {
    sendTransaction: SendTransactionMutate<ResolvedRegister['config'], context>
    sendTransactionAsync: SendTransactionMutateAsync<
      ResolvedRegister['config'],
      context
    >
  }
>

/** https://wagmi.sh/react/hooks/useSendTransaction */
export function useSendTransaction<context = unknown>(
  parameters: UseSendTransactionParameters<context> = {},
): UseSendTransactionReturnType<context> {
  const config = useConfig()
  const mutationOptions = sendTransactionMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  type Return = UseSendTransactionReturnType<context>
  return {
    ...result,
    sendTransaction: mutate as Return['sendTransaction'],
    sendTransactionAsync: mutateAsync as Return['sendTransactionAsync'],
  }
}
