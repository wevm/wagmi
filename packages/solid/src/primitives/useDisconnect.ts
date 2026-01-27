import { createMutation as useMutation } from '@tanstack/solid-query'
import type { DisconnectErrorType } from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type DisconnectData,
  type DisconnectMutate,
  type DisconnectMutateAsync,
  type DisconnectOptions,
  type DisconnectVariables,
  disconnectMutationOptions,
} from '@wagmi/core/query'
import type { Accessor } from 'solid-js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useDisconnect */
export function useDisconnect<context = unknown>(
  parameters: useDisconnect.Parameters<context> = () => ({}),
): useDisconnect.ReturnType<context> {
  const config = useConfig(parameters)
  const mutation = useMutation(() =>
    disconnectMutationOptions(config(), parameters()),
  )
  return mutation as useDisconnect.ReturnType<context>
}

export namespace useDisconnect {
  export type Parameters<context = unknown> = Accessor<SolidParameters<context>>

  export type ReturnType<context = unknown> = Compute<
    UseMutationReturnType<
      DisconnectData,
      DisconnectErrorType,
      DisconnectVariables,
      context,
      DisconnectMutate<context>,
      DisconnectMutateAsync<context>
    >
  >

  export type SolidParameters<context = unknown> = Compute<
    ConfigParameter & DisconnectOptions<context>
  >
}
