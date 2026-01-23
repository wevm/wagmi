import { createMutation as useMutation } from '@tanstack/solid-query'
import type { Connector, DisconnectErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type DisconnectData,
  type DisconnectMutate,
  type DisconnectMutateAsync,
  type DisconnectVariables,
  disconnectMutationOptions,
} from '@wagmi/core/query'
import { type Accessor, createMemo, mergeProps } from 'solid-js'

import type { ConfigParameter } from '../types/properties.js'
import type {
  SolidMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type SolidDisconnectParameters<context = unknown> = Compute<
  ConfigParameter & {
    mutation?:
      | SolidMutationParameters<
          DisconnectData,
          DisconnectErrorType,
          DisconnectVariables,
          context
        >
      | undefined
  }
>

export type UseDisconnectParameters<context = unknown> = Accessor<
  SolidDisconnectParameters<context>
>

export type UseDisconnectReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    DisconnectData,
    DisconnectErrorType,
    DisconnectVariables,
    context
  > & {
    /** @deprecated use `useConnections` instead */
    connectors: Compute<readonly Connector[]>
    /** @deprecated use `mutate` instead */
    disconnect: DisconnectMutate<context>
    /** @deprecated use `mutateAsync` instead */
    disconnectAsync: DisconnectMutateAsync<context>
    mutate: DisconnectMutate<context>
    mutateAsync: DisconnectMutateAsync<context>
  }
>

/** https://wagmi.sh/solid/api/primitives/useDisconnect */
export function useDisconnect<context = unknown>(
  parameters: UseDisconnectParameters<context> = () => ({}),
): UseDisconnectReturnType<context> {
  const config = useConfig(parameters)
  const connections = useConnections(() => ({ config: config() }))
  const mutationOptions = createMemo(() => disconnectMutationOptions(config()))
  const mutation = useMutation(() => ({
    ...parameters().mutation,
    ...mutationOptions(),
  }))
  return mergeProps(mutation, {
    connectors: connections().map((connection) => connection.connector),
    disconnect: mutation.mutate,
    disconnectAsync: mutation.mutateAsync,
  }) satisfies UseDisconnectReturnType<context>
}
