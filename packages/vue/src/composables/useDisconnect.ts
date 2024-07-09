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
import { type Ref, computed } from 'vue'

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
    connectors: Ref<readonly Connector[]>
    disconnect: DisconnectMutate<context>
    disconnectAsync: DisconnectMutateAsync<context>
  }
>

/** https://wagmi.sh/vue/api/composables/useDisconnect */
export function useDisconnect<context = unknown>(
  parameters: UseDisconnectParameters<context> = {},
): UseDisconnectReturnType<context> {
  const { mutation } = parameters

  const config = useConfig(parameters)
  const connections = useConnections({ config })

  const mutationOptions = disconnectMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  return {
    ...result,
    connectors: computed(() =>
      connections.value.map((connection) => connection.connector),
    ),
    disconnect: mutate,
    disconnectAsync: mutateAsync,
  }
}
