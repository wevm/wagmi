import { useMutation } from '@tanstack/react-query'
import type {
  Connector,
  ResolvedRegister,
  SwitchAccountError,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SwitchAccountData,
  type SwitchAccountMutate,
  type SwitchAccountMutateAsync,
  type SwitchAccountVariables,
  switchAccountMutationOptions,
} from '@wagmi/core/query'

import type { UseMutationOptions, UseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type UseSwitchAccountParameters<context = unknown> = Evaluate<
  UseMutationOptions<
    SwitchAccountData<ResolvedRegister['config']>,
    SwitchAccountError,
    SwitchAccountVariables,
    context
  >
>

export type UseSwitchAccountReturnType<context = unknown> = Evaluate<
  UseMutationResult<
    SwitchAccountData<ResolvedRegister['config']>,
    SwitchAccountError,
    SwitchAccountVariables,
    context
  > & {
    connectors: readonly Connector[]
    switchAccount: SwitchAccountMutate<ResolvedRegister['config'], context>
    switchAccountAsync: SwitchAccountMutateAsync<
      ResolvedRegister['config'],
      context
    >
  }
>

/** https://wagmi.sh/react/hooks/useSwitchAccount */
export function useSwitchAccount<context = unknown>(
  parameters: UseSwitchAccountParameters<context> = {},
): UseSwitchAccountReturnType<context> {
  const config = useConfig()
  const mutationOptions = switchAccountMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  return {
    ...result,
    connectors: useConnections().map((connection) => connection.connector),
    switchAccount: mutate,
    switchAccountAsync: mutateAsync,
  }
}
