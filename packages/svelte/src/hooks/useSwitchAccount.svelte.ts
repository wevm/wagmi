import { createMutation } from '@tanstack/svelte-query'
import type {
  Config,
  Connector,
  ResolvedRegister,
  SwitchAccountErrorType,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type SwitchAccountData,
  type SwitchAccountMutate,
  type SwitchAccountMutateAsync,
  type SwitchAccountVariables,
  switchAccountMutationOptions,
} from '@wagmi/core/query'

import type {
  CreateMutationParameters,
  CreateMutationReturnType,
} from '../query.svelte.js'
import type { RuneParameters, RuneReturnType } from '../types.js'
import type { ConfigParameter } from '../types.js'
import { useConfig } from './useConfig.svelte.js'
import { useConnections } from './useConnections.svelte.js'

export type UseSwitchAccountParameters<
  config extends Config = Config,
  context = unknown,
> = RuneParameters<
  Compute<
    ConfigParameter<config> & {
      mutation?:
        | CreateMutationParameters<
            SwitchAccountData<config>,
            SwitchAccountErrorType,
            SwitchAccountVariables,
            context
          >
        | undefined
    }
  >
>

export type UseSwitchAccountReturnType<
  config extends Config = Config,
  context = unknown,
> = RuneReturnType<
  Compute<
    CreateMutationReturnType<
      SwitchAccountData<config>,
      SwitchAccountErrorType,
      SwitchAccountVariables,
      context
    > & {
      connectors: readonly Connector[]
      switchAccount: SwitchAccountMutate<config, context>
      switchAccountAsync: SwitchAccountMutateAsync<config, context>
    }
  >
>

/** https://wagmi.sh/react/api/hooks/useSwitchAccount */
export function useSwitchAccount<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSwitchAccountParameters<config, context> = () => ({}),
): UseSwitchAccountReturnType<config, context> {
  const { mutation } = $derived.by(parameters)

  const config = $derived.by(useConfig(parameters))

  const mutationOptions = $derived(switchAccountMutationOptions(config))
  const query = createMutation(() => ({
    ...mutation,
    ...mutationOptions,
  }))
  const { mutate, mutateAsync, ...result } = $derived(query)

  const connections = $derived.by(useConnections(() => ({ config })))
  const connectors = $derived(connections.map((c) => c.connector))

  return () => ({
    ...result,
    connectors,
    switchAccount: mutate,
    switchAccountAsync: mutateAsync,
  })
}
