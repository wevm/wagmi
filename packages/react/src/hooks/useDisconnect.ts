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
import type { Evaluate } from '@wagmi/core/internal'

import type { OmittedUseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type UseDisconnectParameters<context = unknown> = Evaluate<
  DisconnectMutationParameters & {
    mutation?: Omit<
      UseMutationOptions<
        DisconnectMutationData,
        DisconnectError,
        DisconnectMutationVariables,
        context
      >,
      OmittedMutationOptions
    >
  }
>

export type UseDisconnectReturnType<context = unknown> = Evaluate<
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
export function useDisconnect<context = unknown>(
  parameters?: UseDisconnectParameters<context>,
): UseDisconnectReturnType<context>
export function useDisconnect({
  connector,
  mutation,
}: UseDisconnectParameters = {}): UseDisconnectReturnType {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation(
    disconnectMutationOptions(config, { connector }),
  )
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
