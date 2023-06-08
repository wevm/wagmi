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

export type UseReconnectParameters<context = unknown> = Pretty<
  ReconnectMutationParameters & {
    mutation?: Omit<MutationOptions<context>, OmittedMutationOptions>
  }
>
type MutationOptions<context = unknown> = UseMutationOptions<
  ReconnectMutationData,
  ReconnectError,
  ReconnectMutationVariables,
  context
>

export type UseReconnectReturnType<context = unknown> = Pretty<
  Omit<Result<context>, OmittedUseMutationResult> & {
    reconnect: Result<context>['mutate']
    reconnectAsync: Result<context>['mutateAsync']
    connectors: readonly Connector[]
  }
>
type Result<context = unknown> = UseMutationResult<
  ReconnectMutationData,
  ReconnectError,
  ReconnectMutationVariables,
  context
>

/** https://wagmi.sh/react/hooks/useReconnect */
export function useReconnect<context = unknown>({
  connectors,
  mutation,
}: UseReconnectParameters = {}): UseReconnectReturnType {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation<
    ReconnectMutationData,
    ReconnectError,
    ReconnectMutationVariables,
    context
  >(reconnectMutationOptions(config, { connectors }))
  return {
    ...mutationOptions,
    ...mutation,
    reconnect: mutate,
    reconnectAsync: mutateAsync,
    connectors: config.connectors,
  }
}
