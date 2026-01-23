'use client'
import { useMutation } from '@tanstack/react-query'
import type {
  Config,
  Connector,
  ResolvedRegister,
  SwitchConnectionErrorType,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type SwitchConnectionData,
  type SwitchConnectionMutate,
  type SwitchConnectionMutateAsync,
  type SwitchConnectionOptions,
  type SwitchConnectionVariables,
  switchConnectionMutationOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type UseSwitchConnectionParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<ConfigParameter<config> & SwitchConnectionOptions<config, context>>

export type UseSwitchConnectionReturnType<
  config extends Config = Config,
  context = unknown,
> = Compute<
  UseMutationReturnType<
    SwitchConnectionData<config>,
    SwitchConnectionErrorType,
    SwitchConnectionVariables,
    context,
    SwitchConnectionMutate<config, context>,
    SwitchConnectionMutateAsync<config, context>
  > & {
    /** @deprecated use `useConnections` instead */
    connectors: readonly Connector[]
    /** @deprecated use `mutate` instead */
    switchAccount: SwitchConnectionMutate<config, context>
    /** @deprecated use `mutateAsync` instead */
    switchAccountAsync: SwitchConnectionMutateAsync<config, context>
    /** @deprecated use `mutate` instead */
    switchConnection: SwitchConnectionMutate<config, context>
    /** @deprecated use `mutateAsync` instead */
    switchConnectionAsync: SwitchConnectionMutateAsync<config, context>
  }
>

/** https://wagmi.sh/react/api/hooks/useSwitchConnection */
export function useSwitchConnection<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSwitchConnectionParameters<config, context> = {},
): UseSwitchConnectionReturnType<config, context> {
  const config = useConfig(parameters)
  const options = switchConnectionMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseSwitchConnectionReturnType<config, context>
  return {
    ...(mutation as Return),
    connectors: useConnections({ config }).map(
      (connection) => connection.connector,
    ),
    switchAccount: mutation.mutate as Return['mutate'],
    switchAccountAsync: mutation.mutateAsync as Return['mutateAsync'],
    switchConnection: mutation.mutate as Return['mutate'],
    switchConnectionAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
