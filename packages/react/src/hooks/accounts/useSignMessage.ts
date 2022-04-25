import * as React from 'react'
import { SignMessageArgs, SignMessageResult, signMessage } from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseSignMessageArgs = Partial<SignMessageArgs>

export type UseSignMessageConfig = MutationConfig<
  SignMessageResult,
  Error,
  SignMessageArgs
>

export const mutationKey = (args: UseSignMessageArgs) => [
  { entity: 'signMessage', ...args },
]

const mutationFn = (args: UseSignMessageArgs) => {
  const { message } = args
  if (!message) throw new Error('message is required')
  return signMessage({ message })
}

export function useSignMessage({
  message,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSignMessageArgs & UseSignMessageConfig = {}) {
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
  } = useMutation(mutationKey({ message }), mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  })

  const signMessage = React.useCallback(
    (args?: SignMessageArgs) => mutate(args || <SignMessageArgs>{ message }),
    [message, mutate],
  )

  const signMessageAsync = React.useCallback(
    (args?: SignMessageArgs) =>
      mutateAsync(args || <SignMessageArgs>{ message }),
    [message, mutateAsync],
  )

  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    signMessage,
    signMessageAsync,
    status,
    variables,
  }
}
