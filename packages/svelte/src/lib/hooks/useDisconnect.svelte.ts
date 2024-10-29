import type {
  CreateMutationParameters,
  CreateMutationReturnType,
} from '$lib/query.svelte.js'
import type {
  ConfigParameter,
  RuneParameters,
  RuneReturnType,
} from '$lib/types.js'
import {
  type CreateMutationResult,
  createMutation,
} from '@tanstack/svelte-query'
import type { Connector, DisconnectErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type DisconnectData,
  type DisconnectMutate,
  type DisconnectMutateAsync,
  type DisconnectVariables,
  disconnectMutationOptions,
} from '@wagmi/core/query'
import { useConfig } from './useConfig.svelte.js'
import { useConnections } from './useConnections.svelte.js'

export type UseDisconnectParameters<context = unknown> = RuneParameters<
  Compute<
    ConfigParameter & {
      mutation?:
        | CreateMutationParameters<
            DisconnectData,
            DisconnectErrorType,
            DisconnectVariables,
            context
          >
        | undefined
    }
  >
>

export type UseDisconnectReturnType<context = unknown> = RuneReturnType<
  Compute<
    CreateMutationReturnType<
      DisconnectData,
      DisconnectErrorType,
      DisconnectVariables,
      context
    > & {
      connectors: readonly Connector[]
      disconnect: DisconnectMutate<context>
      disconnectAsync: DisconnectMutateAsync<context>
    }
  >
>

/** https://wagmi.sh/react/api/hooks/useDisconnect */
export function useDisconnect<context = unknown>(
  parameters: UseDisconnectParameters<context> = () => ({}),
): UseDisconnectReturnType<context> {
  const { mutation } = $derived.by(parameters)

  const config = $derived.by(useConfig(parameters))

  const mutationOptions = $derived(disconnectMutationOptions(config))
  const query = createMutation(() => ({
    ...mutation,
    ...mutationOptions,
  }))
  const { mutate, mutateAsync, ...result } = $derived(query)

  const connections = $derived.by(useConnections(() => ({ config })))
  const connectors = $derived(connections.map((c) => c.connector))

  return () => ({
    ...result,
    connectors,
    disconnect: mutate,
    disconnectAsync: mutateAsync,
  })
}
