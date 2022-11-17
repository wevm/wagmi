import { disconnect } from '@wagmi/core'

import { useMutation } from '../utils'

export type UseDisconnectConfig = {
  /** Function to invoke when an error is thrown while connecting. */
  onError?: (error: Error, context: unknown) => void | Promise<unknown>
  /**
   * Function fires before mutation function and is passed same variables mutation function would receive.
   * Value returned from this function will be passed to both onError and onSettled functions in event of a mutation failure.
   */
  onMutate?: () => unknown
  /** Function to invoke when connect is settled (either successfully connected, or an error has thrown). */
  onSettled?: (error: Error | null, context: unknown) => void | Promise<unknown>
  /** Function fires when mutation is successful and will be passed the mutation's result */
  onSuccess?: (context: unknown) => void | Promise<unknown>
}

export const mutationKey = [{ entity: 'disconnect' }] as const

const mutationFn = () => disconnect()

export function useDisconnect({
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseDisconnectConfig = {}) {
  const {
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate: disconnect,
    mutateAsync: disconnectAsync,
    reset,
    status,
  } = useMutation<void, Error>(mutationKey, mutationFn, {
    ...(onError
      ? {
          onError(error, _variables, context) {
            onError(error, context)
          },
        }
      : {}),
    onMutate,
    ...(onSettled
      ? {
          onSettled(_data, error, _variables, context) {
            onSettled(error, context)
          },
        }
      : {}),
    ...(onSuccess
      ? {
          onSuccess(_data, _variables, context) {
            onSuccess(context)
          },
        }
      : {}),
  })

  return {
    disconnect,
    disconnectAsync,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status,
  } as const
}
