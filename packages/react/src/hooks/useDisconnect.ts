import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query'
import {
  type DisconnectError,
  type DisconnectMutationData,
  type DisconnectMutationVariables,
  type OmittedMutationOptions,
  disconnectMutationOptions,
} from '@wagmi/core'
import type { Prettify } from '@wagmi/core/internal'

import type { OmittedUseMutationResult } from '../types/query.js'
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
  Omit<Result, OmittedUseMutationResult> & {
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
