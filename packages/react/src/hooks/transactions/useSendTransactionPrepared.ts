import * as React from 'react'
import {
  SendTransactionPreparedArgs,
  SendTransactionPreparedResult,
  sendTransactionPrepared,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseSendTransactionPreparedArgs = {
  /** The prepared request to use when sending the transaction */
  request?: SendTransactionPreparedArgs['request']
}

export type UseSendTransactionPreparedConfig = MutationConfig<
  SendTransactionPreparedResult,
  Error,
  UseSendTransactionPreparedArgs
>

export const mutationKey = (args: UseSendTransactionPreparedArgs) =>
  [{ entity: 'sendTransactionPrepared', ...args }] as const

const mutationFn = (args: UseSendTransactionPreparedArgs) => {
  const { request } = args
  if (!request) throw new Error('request not provided')
  return sendTransactionPrepared({ request })
}

export function useSendTransactionPrepared({
  request,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSendTransactionPreparedArgs & UseSendTransactionPreparedConfig) {
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
  } = useMutation(mutationKey({ request }), mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  })

  const sendTransaction = React.useCallback(() => {
    return mutate({ request })
  }, [mutate, request])

  const sendTransactionAsync = React.useCallback(async () => {
    return await mutateAsync({ request })
  }, [mutateAsync, request])

  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    sendTransaction: request ? sendTransaction : undefined,
    sendTransactionAsync: request ? sendTransactionAsync : undefined,
    status,
    variables,
  }
}
