import type { Connector, ReconnectErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type ReconnectData,
  type ReconnectMutate,
  type ReconnectMutateAsync,
  type ReconnectOptions,
  type ReconnectVariables,
  reconnectMutationOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import { type UseMutationReturnType, useMutation } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseReconnectParameters<context = unknown> = Compute<
  ConfigParameter & ReconnectOptions<context>
>

export type UseReconnectReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    ReconnectData,
    ReconnectErrorType,
    ReconnectVariables,
    context
  > & {
    connectors: readonly Connector[]
    mutate: ReconnectMutate<context>
    mutateAsync: ReconnectMutateAsync<context>
    /** @deprecated use `mutate` instead */
    reconnect: ReconnectMutate<context>
    /** @deprecated use `mutateAsync` instead */
    reconnectAsync: ReconnectMutateAsync<context>
  }
>

/** https://wagmi.sh/vue/api/composables/useReconnect */
export function useReconnect<context = unknown>(
  parameters: UseReconnectParameters<context> = {},
): UseReconnectReturnType<context> {
  const config = useConfig(parameters)
  const options = reconnectMutationOptions(config, parameters as any)
  const mutation = useMutation(options)
  type Return = UseReconnectReturnType<context>
  return {
    ...(mutation as Return),
    connectors: config.connectors,
    reconnect: mutation.mutate as Return['mutate'],
    reconnectAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
