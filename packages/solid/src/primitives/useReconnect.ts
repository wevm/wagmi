import { createMutation as useMutation } from '@tanstack/solid-query'
import type { ReconnectErrorType } from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type ReconnectData,
  type ReconnectMutate,
  type ReconnectMutateAsync,
  type ReconnectOptions,
  type ReconnectVariables,
  reconnectMutationOptions,
} from '@wagmi/core/query'
import type { Accessor } from 'solid-js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useReconnect */
export function useReconnect<context = unknown>(
  parameters: useReconnect.Parameters<context> = () => ({}),
): useReconnect.ReturnType<context> {
  const config = useConfig(parameters)
  const mutation = useMutation(() =>
    reconnectMutationOptions(config(), parameters()),
  )
  return mutation as useReconnect.ReturnType<context>
}

export namespace useReconnect {
  export type Parameters<context = unknown> = Accessor<SolidParameters<context>>

  export type ReturnType<context = unknown> = Compute<
    UseMutationReturnType<
      ReconnectData,
      ReconnectErrorType,
      ReconnectVariables,
      context,
      ReconnectMutate<context>,
      ReconnectMutateAsync<context>
    >
  >

  export type SolidParameters<context = unknown> = Compute<
    ConfigParameter & ReconnectOptions<context>
  >
}
