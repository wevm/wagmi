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

export type UseDisconnectParameters<context = unknown> = Pretty<
  DisconnectMutationParameters & {
    mutation?: Omit<Options<context>, OmittedMutationOptions>
  }
>
type Options<context = unknown> = UseMutationOptions<
  DisconnectMutationData,
  DisconnectError,
  DisconnectMutationVariables,
  context
>

export type UseDisconnectReturnType<context = unknown> = Pretty<
  Omit<Result<context>, OmittedUseMutationResult> & {
    connectors: readonly Connector[]
    disconnect: Result<context>['mutate']
    disconnectAsync: Result<context>['mutateAsync']
  }
>
type Result<context = unknown> = UseMutationResult<
  DisconnectMutationData,
  DisconnectError,
  DisconnectMutationVariables,
  context
>

/** https://wagmi.sh/react/hooks/useDisconnect */
export function useDisconnect<context = unknown>({
  connector,
  mutation,
}: UseDisconnectParameters<context> = {}): UseDisconnectReturnType<context> {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation<
    DisconnectMutationData,
    DisconnectError,
    DisconnectMutationVariables,
    context
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
