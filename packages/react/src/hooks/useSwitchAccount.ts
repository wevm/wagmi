'use client'

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
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'
import { useConnections } from './useConnections.js'

export type UseSwitchAccountParameters<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          SwitchAccountData<config>,
          SwitchAccountError,
          SwitchAccountVariables,
          context
        >
      | undefined
  }
>

export type UseSwitchAccountReturnType<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  UseMutationReturnType<
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

/** https://alpha.wagmi.sh/react/api/hooks/useSwitchAccount */
export function useSwitchAccount<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSwitchAccountParameters<config, context> = {},
): UseSwitchAccountReturnType<config, context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = switchAccountMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  return {
    ...result,
    connectors: useConnections().map((connection) => connection.connector),
    switchAccount: mutate,
    switchAccountAsync: mutateAsync,
  }
}
