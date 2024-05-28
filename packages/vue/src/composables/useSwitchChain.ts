import { useMutation } from '@tanstack/vue-query'
import type {
  Config,
  ResolvedRegister,
  SwitchChainErrorType,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SwitchChainData,
  type SwitchChainMutate,
  type SwitchChainMutateAsync,
  type SwitchChainVariables,
  switchChainMutationOptions,
} from '@wagmi/core/query'
import type { Ref } from 'vue'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useChains } from './useChains.js'
import { useConfig } from './useConfig.js'

export type UseSwitchChainParameters<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  ConfigParameter<config> & {
    mutation?:
      | UseMutationParameters<
          SwitchChainData<config, config['chains'][number]['id']>,
          SwitchChainErrorType,
          SwitchChainVariables<config, config['chains'][number]['id']>,
          context
        >
      | undefined
  }
>

export type UseSwitchChainReturnType<
  config extends Config = Config,
  context = unknown,
> = Evaluate<
  UseMutationReturnType<
    SwitchChainData<config, config['chains'][number]['id']>,
    SwitchChainErrorType,
    SwitchChainVariables<config, config['chains'][number]['id']>,
    context
  > & {
    chains: Ref<config['chains']>
    switchChain: SwitchChainMutate<config, context>
    switchChainAsync: SwitchChainMutateAsync<config, context>
  }
>

/** https://wagmi.sh/vue/api/composables/useSwitchChain */
export function useSwitchChain<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseSwitchChainParameters<config, context> = {},
): UseSwitchChainReturnType<config, context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = switchChainMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  type Return = UseSwitchChainReturnType<config, context>
  return {
    ...result,
    chains: useChains({ config }) as unknown as Ref<config['chains']>,
    switchChain: mutate as Return['switchChain'],
    switchChainAsync: mutateAsync as Return['switchChainAsync'],
  } as Return
}
