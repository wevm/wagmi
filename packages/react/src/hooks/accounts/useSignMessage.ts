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

export const mutationKey = 'signMessage'

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
  const { mutate, mutateAsync, ...signMessageMutation } = useMutation(
    mutationKey,
    mutationFn,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    },
  )

  const signMessage = React.useCallback(
    (args?: SignMessageArgs) =>
      mutate(<SignMessageArgs>{ message, ...(args ?? {}) }),
    [message, mutate],
  )

  const signMessageAsync = React.useCallback(
    (args?: SignMessageArgs) =>
      mutateAsync(<SignMessageArgs>{ message, ...(args ?? {}) }),
    [message, mutateAsync],
  )

  return {
    ...signMessageMutation,
    signMessageAsync,
    signMessage,
  }
}
