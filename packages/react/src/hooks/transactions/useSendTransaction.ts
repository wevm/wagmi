import {
  SendTransactionArgs,
  SendTransactionResult,
  sendTransaction,
} from '@wagmi/core'
import { useCallback } from 'react'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseSendTransactionArgs = Partial<SendTransactionArgs>

export type UseSendTransactionConfig = MutationConfig<
  SendTransactionResult,
  Error,
  UseSendTransactionArgs
>

export const mutationKey = 'send-transaction'

export const mutationFn = async (args: UseSendTransactionArgs) => {
  const { request } = args
  if (!request) throw new Error('request is required')
  return sendTransaction({ request })
}

export const useSendTransaction = ({
  request,
  onError,
  onSettled,
  onSuccess,
}: UseSendTransactionArgs & UseSendTransactionConfig = {}) => {
  const { mutate, mutateAsync, ...transactionMutation } = useMutation(
    mutationKey,
    mutationFn,
    {
      onError,
      onSettled,
      onSuccess,
    },
  )

  const sendTransaction = useCallback(
    (args = {}) => mutate({ request, ...args }),
    [mutate, request],
  )

  const sendTransactionAsync = useCallback(
    (args = {}) => mutateAsync({ request, ...args }),
    [mutateAsync, request],
  )

  return {
    ...transactionMutation,
    sendTransactionAsync,
    sendTransaction,
  }
}
