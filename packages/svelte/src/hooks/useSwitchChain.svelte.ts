import { createMutation } from '@tanstack/svelte-query'
import type {
  Config,
  ResolvedRegister,
  SwitchChainErrorType,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type SwitchChainData,
  type SwitchChainMutate,
  type SwitchChainMutateAsync,
  type SwitchChainVariables,
  switchChainMutationOptions,
} from '@wagmi/core/query'

import type {
  CreateMutationParameters,
  CreateMutationReturnType,
} from '../query.svelte.js'
import type { RuneParameters, RuneReturnType } from '../types.js'
import type { ConfigParameter } from '../types.js'
import { useChains } from './useChains.svelte.js'
import { useConfig } from './useConfig.svelte.js'

export type UseSwitchChainParameters<
  config extends Config = Config,
  context = unknown,
> = RuneParameters<
  Compute<
    ConfigParameter<config> & {
      mutation?:
        | CreateMutationParameters<
            SwitchChainData<config, config['chains'][number]['id']>,
            SwitchChainErrorType,
            SwitchChainVariables<config, config['chains'][number]['id']>,
            context
          >
        | undefined
    }
  >
>

export type UseSwitchChainReturnType<
  config extends Config = Config,
  context = unknown,
> = RuneReturnType<
  Compute<
    CreateMutationReturnType<
      SwitchChainData<config, config['chains'][number]['id']>,
      SwitchChainErrorType,
      SwitchChainVariables<config, config['chains'][number]['id']>,
      context
    > & {
      chains: config['chains']
      switchChain: SwitchChainMutate<config, context>
      switchChainAsync: SwitchChainMutateAsync<config, context>
    }
  >
>

/** https://wagmi.sh/react/api/hooks/useSwitchChain */
export function useSwitchChain<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSwitchChainParameters<config, context> = () => ({}),
): UseSwitchChainReturnType<config, context> {
  const { mutation } = $derived.by(parameters)

  const config = $derived.by(useConfig(parameters))

  const mutationOptions = $derived(switchChainMutationOptions(config))
  const query = createMutation(() => ({
    ...mutation,
    ...mutationOptions,
  }))
  const { mutate, mutateAsync, ...result } = $derived(query)

  const chains = $derived.by(useChains(() => ({ config })))

  type Return = ReturnType<UseSwitchChainReturnType<config, context>>
  return () => ({
    ...result,
    chains: chains as unknown as Return['chains'],
    switchChain: mutate as Return['switchChain'],
    switchChainAsync: mutateAsync as Return['switchChainAsync'],
  })
}
