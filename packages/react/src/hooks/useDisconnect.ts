import { useMutation } from '@tanstack/react-query'
import { type Connector, type DisconnectError } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type DisconnectData,
  type DisconnectMutate,
  type DisconnectMutateAsync,
  type DisconnectOptions,
  type DisconnectVariables,
  disconnectMutationOptions,
} from '@wagmi/core/query'
import * as React from 'react'

import type { UseMutationOptions, UseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type UseDisconnectParameters<context = unknown> = Evaluate<
  DisconnectOptions &
    UseMutationOptions<
      DisconnectData,
      DisconnectError,
      DisconnectVariables,
      context
    >
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
  const config = useConfig()
  const { getVariables, ...mutationOptions } = disconnectMutationOptions(
    config,
    parameters,
  )
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  return {
    ...result,
    connectors: useConnections().map((connection) => connection.connector),
    disconnect: React.useCallback(
      (variables, options) => mutate(getVariables(variables), options),
      [getVariables, mutate],
    ),
    disconnectAsync: React.useCallback(
      (variables, options) => mutateAsync(getVariables(variables), options),
      [getVariables, mutateAsync],
    ),
  }
}
