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
import { useCallback } from 'react'
import type { Address } from 'viem'

import type { UseMutationOptions, UseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

type ChainId = ResolvedRegister['config']['chains'][number]['id']

export type UseSendTransactionParameters<
  chainId extends ChainId | undefined = undefined,
  to extends Address | undefined = undefined,
  context = unknown,
> = SendTransactionOptions<ResolvedRegister['config'], chainId, to> &
  UseMutationOptions<
    SendTransactionData,
    SendTransactionError,
    SendTransactionVariables<ResolvedRegister['config'], chainId, undefined>,
    context
  >

export type UseSendTransactionReturnType<
  chainId extends ChainId | undefined = undefined,
  to extends Address | undefined = undefined,
  context = unknown,
> = Evaluate<
  UseMutationResult<
    SendTransactionData,
    SendTransactionError,
    SendTransactionVariables<ResolvedRegister['config'], chainId, undefined>,
    context
  > & {
    sendTransaction: SendTransactionMutate<
      ResolvedRegister['config'],
      chainId,
      to,
      context
    >
    sendTransactionAsync: SendTransactionMutateAsync<
      ResolvedRegister['config'],
      chainId,
      to,
      context
    >
  }
>

export function useSendTransaction<
  chainId extends ChainId | undefined = undefined,
  to extends Address | undefined = undefined,
  context = unknown,
>(
  parameters?: UseSendTransactionParameters<chainId, to, context>,
): UseSendTransactionReturnType<chainId, to, context>

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
    sendTransaction: useCallback(
      (variables, options) => mutate(getVariables(variables), options),
      [getVariables, mutate],
    ),
    sendTransactionAsync: useCallback(
      (variables, options) => mutateAsync(getVariables(variables), options),
      [getVariables, mutateAsync],
    ),
  }
}
