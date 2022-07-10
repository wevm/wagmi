import * as React from 'react'
import {
  SendTransactionArgs,
  SendTransactionPreparedRequest,
  SendTransactionResult,
  SendTransactionUnpreparedRequest,
  sendTransaction,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseSendTransactionArgs = Omit<
  SendTransactionArgs,
  'request' | 'dangerouslyPrepared'
> &
  (
    | {
        dangerouslyPrepared?: false
        request?: SendTransactionPreparedRequest
      }
    | {
        dangerouslyPrepared: true
        request?: SendTransactionUnpreparedRequest
      }
  )
export type UseSendTransactionConfig = MutationConfig<
  SendTransactionResult,
  Error,
  SendTransactionArgs
>

type UseSendTransactionMutationArgs = {
  dangerouslySet: {
    request: SendTransactionUnpreparedRequest
  }
}

export const mutationKey = (args: UseSendTransactionArgs) =>
  [{ entity: 'sendTransaction', ...args }] as const

const mutationFn = ({
  chainId,
  dangerouslyPrepared,
  request,
}: SendTransactionArgs) => {
  return sendTransaction({
    chainId,
    dangerouslyPrepared,
    request,
  } as SendTransactionArgs)
}

export function useSendTransaction({
  chainId,
  dangerouslyPrepared,
  request,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSendTransactionArgs & UseSendTransactionConfig) {
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
  } = useMutation(
    mutationKey({
      chainId,
      dangerouslyPrepared,
      request,
    } as SendTransactionArgs),
    mutationFn,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    },
  )

  const sendTransaction = React.useCallback(
    (args?: UseSendTransactionMutationArgs) =>
      mutate({
        chainId,
        dangerouslyPrepared,
        request,
        ...args?.dangerouslySet,
      } as SendTransactionArgs),
    [chainId, mutate, request],
  )

  const sendTransactionAsync = React.useCallback(
    (args?: UseSendTransactionMutationArgs) =>
      mutateAsync({
        chainId,
        dangerouslyPrepared,
        request,
        ...args?.dangerouslySet,
      } as SendTransactionArgs),
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
      !dangerouslyPrepared && !request ? undefined : sendTransaction,
    sendTransactionAsync:
      !dangerouslyPrepared && !request ? undefined : sendTransactionAsync,
    status,
    variables,
  }
}
