import { useMutation } from '@tanstack/react-query'
import type {
  Config,
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

import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationOptions, UseMutationResult } from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type UseSwitchAccountParameters<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
> = Evaluate<
  UseMutationOptions<
    SwitchAccountData<config>,
    SwitchAccountError,
    SwitchAccountVariables,
    context
  > &
    ConfigParameter<config>
>

export type UseSwitchAccountReturnType<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
> = Evaluate<
  UseMutationResult<
    SwitchAccountData<config>,
    SwitchAccountError,
    SwitchAccountVariables,
    context
  > & {
    connectors: readonly Connector[]
    switchAccount: SwitchAccountMutate<config, context>
    switchAccountAsync: SwitchAccountMutateAsync<config, context>
  }
>

/** https://wagmi.sh/react/hooks/useSwitchAccount */
export function useSwitchAccount<config extends Config, context = unknown>(
  parameters: UseSwitchAccountParameters<config, context> = {},
): UseSwitchAccountReturnType<config, context> {
  const config = useConfig(parameters)
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
