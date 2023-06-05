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

export type UseDisconnectParameters = Pretty<
  DisconnectMutationParameters & {
    mutation?: Omit<Options, OmittedMutationOptions>
  }
>
type Options = UseMutationOptions<
  DisconnectMutationData,
  DisconnectError,
  DisconnectMutationVariables
>

export type UseDisconnectReturnType = Pretty<
  Omit<Result, OmittedUseMutationResult> & {
    connectors: readonly Connector[]
    disconnect: Result['mutate']
    disconnectAsync: Result['mutateAsync']
  }
>
type Result = UseMutationResult<
  DisconnectMutationData,
  DisconnectError,
  DisconnectMutationVariables
>

/** https://wagmi.sh/react/hooks/useDisconnect */
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
