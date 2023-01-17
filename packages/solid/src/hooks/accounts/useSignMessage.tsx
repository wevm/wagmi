import { createMutation } from '@tanstack/solid-query'
import type { SignMessageResult } from '@wagmi/core'
import { signMessage } from '@wagmi/core'
import type { Accessor } from 'solid-js'

import type { MutationConfig } from '../../types'

export type SignMessageArgs = {
  message: Accessor<string | Uint8Array>
}

export type UseSignMessageArgs = Partial<SignMessageArgs>

export type UseSignMessageConfig = MutationConfig<
  SignMessageResult,
  Error,
  SignMessageArgs
>

export const mutationKey = (args: UseSignMessageArgs) =>
  [{ entity: 'signMessage', ...args }] as const

const mutationFn = (args: UseSignMessageArgs) => {
  if (!args.message) throw new Error('message is required')
  return signMessage({ message: args.message() })
}

export const useSignMessage = (
  props?: UseSignMessageArgs & UseSignMessageConfig,
) => {
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
  } = createMutation(mutationKey({ message: props?.message }), mutationFn, {
    onError: props?.onError,
    onMutate: props?.onMutate,
    onSettled: props?.onSettled,
    onSuccess: props?.onSuccess,
  })

  const signMessage = (args?: SignMessageArgs) =>
    mutate(args || ({ message: props?.message } as SignMessageArgs))

  const signMessageAsync = (args?: SignMessageArgs) =>
    mutateAsync(args || ({ message: props?.message } as SignMessageArgs))

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
