import { useMutation } from '@tanstack/react-query'
import { type Connector, type DisconnectError } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type DisconnectData,
  type DisconnectMutate,
  type DisconnectMutateAsync,
  type DisconnectVariables,
  disconnectMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationOptions, UseMutationResult } from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type UseDisconnectParameters<context = unknown> = Evaluate<
  UseMutationOptions<
    DisconnectData,
    DisconnectError,
    DisconnectVariables,
    context
  > &
    ConfigParameter
>

export type UseDisconnectReturnType<context = unknown> = Evaluate<
  UseMutationResult<
    DisconnectData,
    DisconnectError,
    DisconnectVariables,
    context
  > & {
    connectors: readonly Connector[]
    disconnect: DisconnectMutate<context>
    disconnectAsync: DisconnectMutateAsync<context>
  }
>

/** https://wagmi.sh/react/hooks/useDisconnect */
export function useDisconnect<context = unknown>(
  parameters: UseDisconnectParameters<context> = {},
): UseDisconnectReturnType<context> {
  const config = parameters.config ?? useConfig()
  const mutationOptions = disconnectMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  return {
    ...result,
    connectors: useConnections().map((connection) => connection.connector),
    disconnect: mutate,
    disconnectAsync: mutateAsync,
  }
}
