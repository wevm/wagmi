import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query'
import {
  type Connector,
  type OmittedMutationOptions,
  type ReconnectError,
  type ReconnectMutationData,
  type ReconnectMutationParameters,
  type ReconnectMutationVariables,
  reconnectMutationOptions,
} from '@wagmi/core'
import type { Pretty } from '@wagmi/core/internal'

import type { OmittedUseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseReconnectParameters = Pretty<
  ReconnectMutationParameters & {
    mutation?: Omit<MutationOptions, OmittedMutationOptions>
  }
>
type MutationOptions = UseMutationOptions<
  ReconnectMutationData,
  ReconnectError,
  ReconnectMutationVariables
>

export type UseReconnectReturnType = Pretty<
  Omit<Result, OmittedUseMutationResult> & {
    reconnect: Result['mutate']
    reconnectAsync: Result['mutateAsync']
    connectors: readonly Connector[]
  }
>
type Result = UseMutationResult<
  ReconnectMutationData,
  ReconnectError,
  ReconnectMutationVariables
>

/** https://wagmi.sh/react/hooks/useReconnect */
export function useReconnect({
  connectors,
  mutation,
}: UseReconnectParameters = {}): UseReconnectReturnType {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation(
    reconnectMutationOptions(config, { connectors }),
  )
  return {
    ...mutationOptions,
    ...mutation,
    reconnect: mutate,
    reconnectAsync: mutateAsync,
    connectors: config.connectors,
  }
}
