import { createMutation as useMutation } from '@tanstack/solid-query'
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
  type SwitchConnectionVariables,
  switchConnectionMutationOptions,
} from '@wagmi/core/query'

import { type Accessor, createMemo, mergeProps } from 'solid-js'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type SolidSwitchConnectionParameters<
  config extends Config = Config,
  context = unknown,
> = Compute<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          SwitchConnectionData<config>,
          SwitchConnectionErrorType,
          SwitchConnectionVariables,
          context
        >
      | undefined
  }
>

export type UseSwitchConnectionParameters<
  config extends Config = Config,
  context = unknown,
> = Accessor<SolidSwitchConnectionParameters<config, context>>

export type UseSwitchConnectionReturnType<
  config extends Config = Config,
  context = unknown,
> = Compute<
  UseMutationReturnType<
    SwitchConnectionData<config>,
    SwitchConnectionErrorType,
    SwitchConnectionVariables,
    context
  > & {
    /** @deprecated use `useConnections` instead */
    connectors: readonly Connector[]
    mutate: SwitchConnectionMutate<config, context>
    mutateAsync: SwitchConnectionMutateAsync<config, context>
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

/** https://wagmi.sh/solid/api/primitives/useSwitchConnection */
export function useSwitchConnection<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSwitchConnectionParameters<config, context> = () => ({}),
): UseSwitchConnectionReturnType<config, context> {
  const config = useConfig<config>(parameters)
  const connections = useConnections(() => ({ config: config() }))
  const mutationOptions = createMemo(() =>
    switchConnectionMutationOptions(config()),
  )
  const mutation = useMutation(() => ({
    ...parameters().mutation,
    ...mutationOptions(),
  }))
  return mergeProps(mutation, {
    connectors: connections().map((connection) => connection.connector),
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    switchAccount: mutation.mutate,
    switchAccountAsync: mutation.mutateAsync,
    switchConnection: mutation.mutate,
    switchConnectionAsync: mutation.mutateAsync,
  }) as UseSwitchConnectionReturnType<config, context>
}
