import { createMutation as useMutation } from '@tanstack/solid-query'
import type {
  Config,
  ResolvedRegister,
  SwitchConnectionErrorType,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type SwitchConnectionData,
  type SwitchConnectionMutate,
  type SwitchConnectionMutateAsync,
  type SwitchConnectionOptions,
  type SwitchConnectionVariables,
  switchConnectionMutationOptions,
} from '@wagmi/core/query'
import type { Accessor } from 'solid-js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useSwitchConnection */
export function useSwitchConnection<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useSwitchConnection.Parameters<config, context> = () => ({}),
): useSwitchConnection.ReturnType<config, context> {
  const config = useConfig<config>(parameters)
  const mutation = useMutation(() =>
    switchConnectionMutationOptions(config(), parameters()),
  )
  return mutation as useSwitchConnection.ReturnType<config, context>
}

export namespace useSwitchConnection {
  export type Parameters<
    config extends Config = Config,
    context = unknown,
  > = Accessor<SolidParameters<config, context>>

  export type ReturnType<
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
    >
  >

  export type SolidParameters<
    config extends Config = Config,
    context = unknown,
  > = Compute<
    ConfigParameter<config> & SwitchConnectionOptions<config, context>
  >
}
