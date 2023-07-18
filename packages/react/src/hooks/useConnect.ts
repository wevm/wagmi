import { useMutation } from '@tanstack/react-query'
import { type ConnectError, type ResolvedRegister } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type ConnectData,
  type ConnectMutate,
  type ConnectMutateAsync,
  type ConnectVariables,
  connectMutationOptions,
} from '@wagmi/core/query'

import type { UseMutationOptions, UseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseConnectParameters<context = unknown> = Evaluate<
  UseMutationOptions<
    ConnectData<ResolvedRegister['config']>,
    ConnectError,
    ConnectVariables<ResolvedRegister['config']>,
    context
  >
>

export type UseConnectReturnType<context = unknown> = Evaluate<
  UseMutationResult<
    ConnectData<ResolvedRegister['config']>,
    ConnectError,
    ConnectVariables<ResolvedRegister['config']>,
    context
  > & {
    connect: ConnectMutate<ResolvedRegister['config'], context>
    connectAsync: ConnectMutateAsync<ResolvedRegister['config'], context>
    connectors: ResolvedRegister['config']['connectors']
  }
>

/** https://wagmi.sh/react/hooks/useConnect */
export function useConnect<context = unknown>(
  parameters: UseConnectParameters<context> = {},
): UseConnectReturnType<context> {
  const config = useConfig()
  const mutationOptions = connectMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  return {
    ...result,
    connect: mutate,
    connectAsync: mutateAsync,
    connectors: config.connectors,
  }
}
