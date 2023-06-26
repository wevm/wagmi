import { useMutation } from '@tanstack/react-query'
import { type Connector, type ReconnectError } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type ReconnectData,
  type ReconnectMutate,
  type ReconnectMutateAsync,
  type ReconnectOptions,
  type ReconnectVariables,
  reconnectMutationOptions,
} from '@wagmi/core/query'
import * as React from 'react'

import type { UseMutationOptions, UseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseReconnectParameters<context = unknown> = Evaluate<
  ReconnectOptions &
    UseMutationOptions<
      ReconnectData,
      ReconnectError,
      ReconnectVariables,
      context
    >
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

/** https://wagmi.sh/react/hooks/useReconnect */
export function useReconnect<context = unknown>(
  parameters: UseReconnectParameters<context> = {},
): UseReconnectReturnType<context> {
  const config = useConfig()
  const { getVariables, ...mutationOptions } = reconnectMutationOptions(
    config,
    parameters,
  )
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  return {
    ...result,
    connectors: config.connectors,
    reconnect: React.useCallback(
      (variables, options) => mutate(getVariables(variables), options),
      [getVariables, mutate],
    ),
    reconnectAsync: React.useCallback(
      (variables, options) => mutateAsync(getVariables(variables), options),
      [getVariables, mutateAsync],
    ),
  }
}
