import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query'
import {
  type DisconnectError,
  type DisconnectMutationData,
  type DisconnectMutationVariables,
  disconnectMutationOptions,
} from '@wagmi/core'
import type {
  OmittedMutationOptions,
  OmittedMutationResult,
  Prettify,
} from '@wagmi/core/internal'

import { useConfig } from './useConfig.js'

export type UseDisconnectParameters = Prettify<
  Omit<Options, OmittedMutationOptions> & DisconnectMutationVariables
>
type Options = UseMutationOptions<
  DisconnectMutationData,
  DisconnectError,
  DisconnectMutationVariables
>

export type UseDisconnectReturnType = Prettify<
  Omit<Result, OmittedMutationResult> & {
    disconnect: Result['mutate']
    disconnectAsync: Result['mutateAsync']
  }
>
type Result = UseMutationResult<
  DisconnectMutationData,
  DisconnectError,
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
