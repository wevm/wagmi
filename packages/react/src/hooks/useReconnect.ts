'use client'

import { useMutation } from '@tanstack/react-query'
import type { Connector, ReconnectErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type ReconnectData,
  type ReconnectMutate,
  type ReconnectMutateAsync,
  type ReconnectVariables,
  reconnectMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseReconnectParameters<context = unknown> = Compute<
  ConfigParameter & {
    mutation?:
      | UseMutationParameters<
          ReconnectData,
          ReconnectErrorType,
          ReconnectVariables,
          context
        >
      | undefined
  }
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

/** https://wagmi.sh/react/api/hooks/useReconnect */
export function useReconnect<context = unknown>(
  parameters: UseReconnectParameters<context> = {},
): UseReconnectReturnType<context> {
  const config = useConfig(parameters)
  const mutationOptions = reconnectMutationOptions(config)
  const mutation = useMutation({ ...parameters.mutation, ...mutationOptions })
  return {
    ...mutation,
    connectors: config.connectors,
    reconnect: mutation.mutate,
    reconnectAsync: mutation.mutateAsync,
  }
}
