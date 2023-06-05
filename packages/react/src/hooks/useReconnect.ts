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

export type UseReconnectParameters<TContext = unknown> = Pretty<
  ReconnectMutationParameters & {
    mutation?: Omit<MutationOptions<TContext>, OmittedMutationOptions>
  }
>
type MutationOptions<TContext = unknown> = UseMutationOptions<
  ReconnectMutationData,
  ReconnectError,
  ReconnectMutationVariables,
  TContext
>

export type UseReconnectReturnType<TContext = unknown> = Pretty<
  Omit<Result<TContext>, OmittedUseMutationResult> & {
    reconnect: Result<TContext>['mutate']
    reconnectAsync: Result<TContext>['mutateAsync']
    connectors: readonly Connector[]
  }
>
type Result<TContext = unknown> = UseMutationResult<
  ReconnectMutationData,
  ReconnectError,
  ReconnectMutationVariables,
  TContext
>

/** https://wagmi.sh/react/hooks/useReconnect */
export function useReconnect<TContext = unknown>({
  connectors,
  mutation,
}: UseReconnectParameters = {}): UseReconnectReturnType {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation<
    ReconnectMutationData,
    ReconnectError,
    ReconnectMutationVariables,
    TContext
  >(reconnectMutationOptions(config, { connectors }))
  return {
    ...mutationOptions,
    ...mutation,
    reconnect: mutate,
    reconnectAsync: mutateAsync,
    connectors: config.connectors,
  }
}
