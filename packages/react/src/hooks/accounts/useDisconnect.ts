import { disconnect } from '@wagmi/core'
import { useMutation, useQueryClient } from 'react-query'

import { MutationConfig } from '../../types'
import { queryKey as accountQueryKey } from './useAccount'

export type UseDisconnectConfig = MutationConfig<void, Error>

export const mutationKey = [{ entity: 'disconnect' }]

const mutationFn = () => disconnect()

export function useDisconnect({
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseDisconnectConfig = {}) {
  const queryClient = useQueryClient()
  const {
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    status,
  } = useMutation(mutationKey, mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess(data, variables, context) {
      // Clear account cache
      queryClient.removeQueries(accountQueryKey())
      // Pass on arguments
      onSuccess?.(data, variables, context)
    },
  })

  return {
    disconnect: mutate,
    disconnectAsync: mutateAsync,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    status,
  } as const
}
