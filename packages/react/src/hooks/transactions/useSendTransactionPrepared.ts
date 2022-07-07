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
  preparedRequest?: SendTransactionPreparedArgs['preparedRequest']
}

export type UseSendTransactionPreparedConfig = MutationConfig<
  SendTransactionPreparedResult,
  Error,
  UseSendTransactionPreparedArgs
>

export const mutationKey = (args: UseSendTransactionPreparedArgs) =>
  [{ entity: 'sendTransactionPrepared', ...args }] as const

const mutationFn = (args: UseSendTransactionPreparedArgs) => {
  const { preparedRequest } = args
  if (!preparedRequest) throw new Error('preparedRequest not provided')
  return sendTransactionPrepared({ preparedRequest })
}

export function useSendTransactionPrepared({
  preparedRequest,
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
  } = useMutation(mutationKey({ preparedRequest }), mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  })

  const sendTransaction = React.useCallback(() => {
    return mutate({ preparedRequest })
  }, [mutate, preparedRequest])

  const sendTransactionAsync = React.useCallback(async () => {
    return await mutateAsync({ preparedRequest })
  }, [mutateAsync, preparedRequest])

  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    sendTransaction: preparedRequest ? sendTransaction : undefined,
    sendTransactionAsync: preparedRequest ? sendTransactionAsync : undefined,
    status,
    variables,
  }
}
