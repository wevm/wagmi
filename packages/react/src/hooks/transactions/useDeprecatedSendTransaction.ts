import {
  DeprecatedSendTransactionArgs,
  DeprecatedSendTransactionResult,
  deprecatedSendTransaction,
} from '@wagmi/core'
import * as React from 'react'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseDeprecatedSendTransactionArgs =
  Partial<DeprecatedSendTransactionArgs>

export type UseDeprecatedSendTransactionConfig = MutationConfig<
  DeprecatedSendTransactionResult,
  Error,
  UseDeprecatedSendTransactionArgs
>

export const mutationKey = (args: UseDeprecatedSendTransactionArgs) =>
  [{ entity: 'sendTransaction', ...args }] as const

const mutationFn = (args: UseDeprecatedSendTransactionArgs) => {
  const { chainId, request } = args
  if (!request) throw new Error('request is required')
  return deprecatedSendTransaction({ chainId, request })
}

/** @deprecated */
export function useDeprecatedSendTransaction({
  chainId,
  request,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseDeprecatedSendTransactionArgs & UseDeprecatedSendTransactionConfig = {}) {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables,
  } = useMutation(mutationKey({ chainId, request }), mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  })

  const sendTransaction = React.useCallback(
    (args?: DeprecatedSendTransactionArgs) =>
      mutate({ chainId, request, ...(args ?? {}) }),
    [chainId, mutate, request],
  )

  const sendTransactionAsync = React.useCallback(
    (args?: DeprecatedSendTransactionArgs) =>
      mutateAsync({ chainId, request, ...(args ?? {}) }),
    [chainId, mutateAsync, request],
  )

  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    sendTransaction,
    sendTransactionAsync,
    status,
    variables,
  }
}
