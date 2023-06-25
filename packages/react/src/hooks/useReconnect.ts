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
import type { Evaluate } from '@wagmi/core/internal'

import type { OmittedUseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseReconnectParameters<context = unknown> = Evaluate<
  ReconnectMutationParameters & {
    mutation?: Omit<
      UseMutationOptions<
        ReconnectMutationData,
        ReconnectError,
        ReconnectMutationVariables,
        context
      >,
      OmittedMutationOptions
    >
  }
>

export type UseReconnectReturnType<context = unknown> = Evaluate<
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
export function useReconnect<context = unknown>(
  parameters?: UseReconnectParameters<context>,
): UseReconnectReturnType<context>
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
