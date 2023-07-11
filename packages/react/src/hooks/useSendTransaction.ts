import { useMutation } from '@tanstack/react-query'
import type { ResolvedRegister, SendTransactionError } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SendTransactionData,
  type SendTransactionMutate,
  type SendTransactionMutateAsync,
  type SendTransactionOptions,
  type SendTransactionVariables,
  sendTransactionMutationOptions,
} from '@wagmi/core/query'
import * as React from 'react'

import type { UseMutationOptions, UseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

type ChainId = ResolvedRegister['config']['chains'][number]['id']

export type UseSendTransactionParameters<
  chainId extends ChainId | undefined = undefined,
  context = unknown,
> = SendTransactionOptions<ResolvedRegister['config'], chainId> &
  UseMutationOptions<
    SendTransactionData,
    SendTransactionError,
    SendTransactionVariables<ResolvedRegister['config'], chainId>,
    context
  >

export type UseSendTransactionReturnType<
  chainId extends ChainId | undefined = undefined,
  context = unknown,
> = Evaluate<
  UseMutationResult<
    SendTransactionData,
    SendTransactionError,
    SendTransactionVariables<ResolvedRegister['config'], chainId>,
    context
  > & {
    sendTransaction: SendTransactionMutate<
      ResolvedRegister['config'],
      chainId,
      context
    >
    sendTransactionAsync: SendTransactionMutateAsync<
      ResolvedRegister['config'],
      chainId,
      context
    >
  }
>

export function useSendTransaction<chainId extends ChainId, context = unknown>(
  parameters?: UseSendTransactionParameters<chainId, context>,
): UseSendTransactionReturnType<chainId, context>

/** https://wagmi.sh/react/hooks/useSendTransaction */
export function useSendTransaction(
  parameters: UseSendTransactionParameters = {},
): UseSendTransactionReturnType {
  const config = useConfig()
  const { getVariables, ...mutationOptions } = sendTransactionMutationOptions(
    config,
    parameters,
  )
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  return {
    ...result,
    sendTransaction: React.useCallback(
      (variables, options) => mutate(getVariables(variables), options),
      [getVariables, mutate],
    ),
    sendTransactionAsync: React.useCallback(
      (variables, options) => mutateAsync(getVariables(variables), options),
      [getVariables, mutateAsync],
    ),
  }
}
