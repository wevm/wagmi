'use client'

import { useMutation } from '@tanstack/react-query'
import { type Connector, type ReconnectError } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type ReconnectData,
  type ReconnectMutate,
  type ReconnectMutateAsync,
  type ReconnectVariables,
  reconnectMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationOptions, UseMutationResult } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseReconnectParameters<context = unknown> = Evaluate<
  UseMutationOptions<
    ReconnectData,
    ReconnectError,
    ReconnectVariables,
    context
  > &
    ConfigParameter
>

export type UseReconnectReturnType<context = unknown> = Evaluate<
  UseMutationResult<
    ReconnectData,
    ReconnectError,
    ReconnectVariables,
    context
  > & {
    connectors: readonly Connector[]
    reconnect: ReconnectMutate<context>
    reconnectAsync: ReconnectMutateAsync<context>
  }
>

/** https://alpha.wagmi.sh/react/hooks/useReconnect */
export function useReconnect<context = unknown>(
  parameters: UseReconnectParameters<context> = {},
): UseReconnectReturnType<context> {
  const config = useConfig(parameters)
  const mutationOptions = reconnectMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  return {
    ...result,
    connectors: config.connectors,
    reconnect: mutate,
    reconnectAsync: mutateAsync,
  }
}
