'use client'
import { useMutation } from '@tanstack/react-query'
import type { Connector, DisconnectErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type DisconnectData,
  type DisconnectMutate,
  type DisconnectMutateAsync,
  type DisconnectOptions,
  type DisconnectVariables,
  disconnectMutationOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type UseDisconnectParameters<context = unknown> = Compute<
  ConfigParameter & DisconnectOptions<context>
>

export type UseDisconnectReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    DisconnectData,
    DisconnectErrorType,
    DisconnectVariables,
    context,
    DisconnectMutate<context>,
    DisconnectMutateAsync<context>
  > & {
    /** @deprecated use `useConnections` instead */
    connectors: readonly Connector[]
    /** @deprecated use `mutate` instead */
    disconnect: DisconnectMutate<context>
    /** @deprecated use `mutateAsync` instead */
    disconnectAsync: DisconnectMutateAsync<context>
  }
>

/** https://wagmi.sh/react/api/hooks/useDisconnect */
export function useDisconnect<context = unknown>(
  parameters: UseDisconnectParameters<context> = {},
): UseDisconnectReturnType<context> {
  const config = useConfig(parameters)
  const options = disconnectMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseDisconnectReturnType<context>
  return {
    ...(mutation as Return),
    connectors: useConnections({ config }).map(
      (connection) => connection.connector,
    ),
    disconnect: mutation.mutate as Return['mutate'],
    disconnectAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
