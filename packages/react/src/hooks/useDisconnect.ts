import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query'
import {
  type Connector,
  type DisconnectError,
  type DisconnectMutationData,
  type DisconnectMutationParameters,
  type DisconnectMutationVariables,
  type OmittedMutationOptions,
  disconnectMutationOptions,
} from '@wagmi/core'
import type { Pretty } from '@wagmi/core/internal'

import type { OmittedUseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type UseDisconnectParameters<TContext = unknown> = Pretty<
  DisconnectMutationParameters & {
    mutation?: Omit<Options<TContext>, OmittedMutationOptions>
  }
>
type Options<TContext = unknown> = UseMutationOptions<
  DisconnectMutationData,
  DisconnectError,
  DisconnectMutationVariables,
  TContext
>

export type UseDisconnectReturnType<TContext = unknown> = Pretty<
  Omit<Result<TContext>, OmittedUseMutationResult> & {
    connectors: readonly Connector[]
    disconnect: Result<TContext>['mutate']
    disconnectAsync: Result<TContext>['mutateAsync']
  }
>
type Result<TContext = unknown> = UseMutationResult<
  DisconnectMutationData,
  DisconnectError,
  DisconnectMutationVariables,
  TContext
>

/** https://wagmi.sh/react/hooks/useDisconnect */
export function useDisconnect<TContext = unknown>({
  connector,
  mutation,
}: UseDisconnectParameters<TContext> = {}): UseDisconnectReturnType<TContext> {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation<
    DisconnectMutationData,
    DisconnectError,
    DisconnectMutationVariables,
    TContext
  >(disconnectMutationOptions(config, { connector }))
  const connections = useConnections()
  const connectors = connections.map((connection) => connection.connector)

  return {
    ...mutationOptions,
    ...mutation,
    connectors,
    disconnect: mutate,
    disconnectAsync: mutateAsync,
  }
}
