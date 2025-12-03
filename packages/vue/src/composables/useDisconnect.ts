import { useMutation } from '@tanstack/vue-query'
import type { Connector, DisconnectErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type DisconnectData,
  type DisconnectMutate,
  type DisconnectMutateAsync,
  type DisconnectVariables,
  disconnectMutationOptions,
} from '@wagmi/core/query'
import { computed, type Ref } from 'vue'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type UseDisconnectParameters<context = unknown> = Compute<
  ConfigParameter & {
    mutation?:
      | UseMutationParameters<
          DisconnectData,
          DisconnectErrorType,
          DisconnectVariables,
          context
        >
      | undefined
  }
>

export type UseDisconnectReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    DisconnectData,
    DisconnectErrorType,
    DisconnectVariables,
    context
  > & {
    /** @deprecated use `useConnections` instead */
    connectors: Ref<readonly Connector[]>
    /** @deprecated use `mutate` instead */
    disconnect: DisconnectMutate<context>
    /** @deprecated use `mutateAsync` instead */
    disconnectAsync: DisconnectMutateAsync<context>
    mutate: DisconnectMutate<context>
    mutateAsync: DisconnectMutateAsync<context>
  }
>

/** https://wagmi.sh/vue/api/composables/useDisconnect */
export function useDisconnect<context = unknown>(
  parameters: UseDisconnectParameters<context> = {},
): UseDisconnectReturnType<context> {
  const config = useConfig(parameters)
  const connections = useConnections({ config })
  const mutationOptions = disconnectMutationOptions(config)
  const mutation = useMutation({ ...parameters.mutation, ...mutationOptions })
  return {
    ...mutation,
    connectors: computed(() =>
      connections.value.map((connection) => connection.connector),
    ),
    disconnect: mutation.mutate,
    disconnectAsync: mutation.mutateAsync,
  }
}
