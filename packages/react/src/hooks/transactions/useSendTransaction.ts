import * as React from 'react'
import {
  SendTransactionArgs,
  SendTransactionResult,
  SendTransactionUnpreparedRequest,
  sendTransaction,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseSendTransactionArgs = Partial<
  Omit<SendTransactionArgs, 'request'> & {
    request:
      | SendTransactionArgs['request']
      | { type: 'prepared'; payload: undefined }
  }
>
export type UseSendTransactionConfig = MutationConfig<
  SendTransactionResult,
  Error,
  SendTransactionArgs
>

type UseSendTransactionMutationArgs = Omit<SendTransactionArgs, 'request'> & {
  request: SendTransactionUnpreparedRequest
}

export const mutationKey = (args: UseSendTransactionArgs) =>
  [{ entity: 'sendTransaction', ...args }] as const

const mutationFn = ({ chainId, request }: SendTransactionArgs) => {
  return sendTransaction({ chainId, request })
}

export function useSendTransaction({
  chainId,
  request,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSendTransactionArgs & UseSendTransactionConfig = {}) {
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
    (args?: UseSendTransactionMutationArgs) =>
      mutate({
        chainId,
        request: request as SendTransactionArgs['request'],
        ...(args ?? {}),
      }),
    [chainId, mutate, request],
  )

  const sendTransactionAsync = React.useCallback(
    (args?: UseSendTransactionMutationArgs) =>
      mutateAsync({
        chainId,
        request: request as SendTransactionArgs['request'],
        ...(args ?? {}),
      }),
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
    sendTransaction:
      request?.type === 'prepared' && !request.payload
        ? undefined
        : sendTransaction,
    sendTransactionAsync:
      request?.type === 'prepared' && !request.payload
        ? undefined
        : sendTransactionAsync,
    status,
    variables,
  }
}
