import * as React from 'react'
import {
  SendTransactionEagerArgs,
  SendTransactionEagerResult,
  sendTransactionEager,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'
import { useBuildTransactionRequest } from './useBuildTransactionRequest'

export type UseSendTransactionEagerArgs = {
  request: Partial<SendTransactionEagerArgs['request']> & {
    to: NonNullable<SendTransactionEagerArgs['request']['to']>
    value: NonNullable<SendTransactionEagerArgs['request']['value']>
  }
}

export type UseSendTransactionEagerConfig = MutationConfig<
  SendTransactionEagerResult,
  Error,
  UseSendTransactionEagerArgs
>

export const mutationKey = (args: UseSendTransactionEagerArgs) =>
  [{ entity: 'sendTransactionEager', ...args }] as const

const mutationFn = (args: SendTransactionEagerArgs) => {
  const { request } = args
  return sendTransactionEager({ request })
}

export function useSendTransactionEager({
  request,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSendTransactionEagerArgs & UseSendTransactionEagerConfig) {
  const { data: eagerRequest } = useBuildTransactionRequest({ request })

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
    const request_ = { ...request, ...eagerRequest }
    return mutate({ request: request_ })
  }, [eagerRequest, mutate, request])

  const sendTransactionAsync = React.useCallback(async () => {
    const request_ = { ...request, ...eagerRequest }
    return await mutateAsync({ request: request_ })
  }, [eagerRequest, mutateAsync, request])

  return {
    data,
    error,
    internal: {
      eagerRequest,
    },
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
