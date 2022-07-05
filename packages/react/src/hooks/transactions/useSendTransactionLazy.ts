import * as React from 'react'
import {
  SendTransactionLazyArgs,
  SendTransactionLazyResult,
  sendTransactionLazy,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseSendTransactionLazyArgs = Partial<SendTransactionLazyArgs>

export type UseSendTransactionLazyConfig = MutationConfig<
  SendTransactionLazyResult,
  Error,
  UseSendTransactionLazyArgs
>

export const mutationKey = (args: UseSendTransactionLazyArgs) =>
  [{ entity: 'sendTransaction', ...args }] as const

const mutationFn = (args: UseSendTransactionLazyArgs) => {
  const { chainId, request } = args
  if (!request) throw new Error('request is required')
  return sendTransactionLazy({ chainId, request })
}

export function useSendTransactionLazy({
  chainId,
  request,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSendTransactionLazyArgs & UseSendTransactionLazyConfig = {}) {
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
    (args?: SendTransactionLazyArgs) =>
      mutate({ chainId, request, ...(args ?? {}) }),
    [chainId, mutate, request],
  )

  const sendTransactionAsync = React.useCallback(
    (args?: SendTransactionLazyArgs) =>
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
