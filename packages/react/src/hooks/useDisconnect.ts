import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query'
import {
  type DisconnectMutationData,
  type DisconnectMutationError,
  type DisconnectMutationVariables,
  type Prettify,
  disconnectMutationOptions,
} from '@wagmi/core'

import { useConfig } from './useConfig.js'

export type UseDisconnectParameters = Prettify<
  Omit<Options, 'mutationFn' | 'mutationKey'> & DisconnectMutationVariables
>
type Options = UseMutationOptions<
  DisconnectMutationData,
  DisconnectMutationError,
  DisconnectMutationVariables
>
export type UseDisconnectReturnType = Prettify<
  Omit<Result, 'mutate' | 'mutateAsync'> & {
    disconnect: Result['mutate']
    disconnectAsync: Result['mutateAsync']
  }
>
type Result = UseMutationResult<
  DisconnectMutationData,
  DisconnectMutationError,
  DisconnectMutationVariables
>

export function useDisconnect(
  parameters: UseDisconnectParameters = {},
): UseDisconnectReturnType {
  const config = useConfig()
  const { mutate, mutateAsync, ...rest } = useMutation(
    disconnectMutationOptions(config, parameters),
  )
  return {
    ...rest,
    disconnect: mutate,
    disconnectAsync: mutateAsync,
  }
}
