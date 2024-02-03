'use client'

import { useMutation } from '@tanstack/react-query'
import { type Connector, type DisconnectErrorType } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type DisconnectData,
  type DisconnectMutate,
  type DisconnectMutateAsync,
  type DisconnectVariables,
  disconnectMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.ts'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.ts'
import { useConfig } from './createConfig.ts'
import { useConnections } from './createConnections.ts'

export type UseDisconnectParameters<context = unknown> = Evaluate<
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

export type UseDisconnectReturnType<context = unknown> = Evaluate<
  UseMutationReturnType<
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

/** https://wagmi.sh/react/api/hooks/useDisconnect */
export function useDisconnect<context = unknown>(
  parameters: UseDisconnectParameters<context> = {},
): UseDisconnectReturnType<context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = disconnectMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  return {
    ...result,
    connectors: useConnections().map((connection) => connection.connector),
    disconnect: mutate,
    disconnectAsync: mutateAsync,
  }
}
