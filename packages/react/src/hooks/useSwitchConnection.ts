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
  type SwitchConnectionVariables,
  switchConnectionMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type UseSwitchConnectionParameters<
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

/** https://wagmi.sh/react/api/hooks/useSwitchConnection */
export function useSwitchConnection<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSwitchConnectionParameters<config, context> = {},
): UseSwitchConnectionReturnType<config, context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = switchConnectionMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  type Return = UseSwitchConnectionReturnType<config, context>
  return {
    ...result,
    connectors: useConnections({ config }).map(
      (connection) => connection.connector,
    ),
    mutate: mutate as Return['mutate'],
    mutateAsync: mutateAsync as Return['mutateAsync'],
    switchAccount: mutate as Return['switchAccount'],
    switchAccountAsync: mutateAsync as Return['switchAccountAsync'],
    switchConnection: mutate as Return['switchConnection'],
    switchConnectionAsync: mutateAsync as Return['switchConnectionAsync'],
  }
}
