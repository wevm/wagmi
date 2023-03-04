import { createMutation } from '@tanstack/solid-query'
import { disconnect } from '@wagmi/core'

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

export const useDisconnect = (props?: UseDisconnectConfig) => {
  const disconnectData = createMutation(() => ({
    mutationKey,
    mutationFn,
    onError: (error, _variables, context) => {
      props?.onError?.(error, context)
    },
    onMutate: () => props?.onMutate?.(),
    onSettled: (_data, error, _variables, context) => {
      props?.onSettled?.(error, context)
    },
    onSuccess: (_data, _variables, context) => {
      props?.onSuccess?.(context)
    },
  }))

  return {
    disconnect,
    disconnectAsync: disconnectData.mutateAsync,
    disconnectData,
  } as const
}
