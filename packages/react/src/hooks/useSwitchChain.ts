import { useMutation } from '@tanstack/react-query'
import type { ResolvedRegister, SwitchChainError } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SwitchChainData,
  type SwitchChainMutate,
  type SwitchChainMutateAsync,
  type SwitchChainVariables,
  switchChainMutationOptions,
} from '@wagmi/core/query'

import type { UseMutationOptions, UseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

type ChainId = ResolvedRegister['config']['chains'][number]['id']

export type UseSwitchChainParameters<context = unknown> = Evaluate<
  UseMutationOptions<
    SwitchChainData<ResolvedRegister['config'], ChainId>,
    SwitchChainError,
    SwitchChainVariables<ResolvedRegister['config'], ChainId>,
    context
  >
>

export type UseSwitchChainReturnType<context = unknown> = Evaluate<
  UseMutationResult<
    SwitchChainData<ResolvedRegister['config'], ChainId>,
    SwitchChainError,
    SwitchChainVariables<ResolvedRegister['config'], ChainId>,
    context
  > & {
    chains: ResolvedRegister['config']['chains']
    switchChain: SwitchChainMutate<ResolvedRegister['config'], context>
    switchChainAsync: SwitchChainMutateAsync<
      ResolvedRegister['config'],
      context
    >
  }
>

/** https://wagmi.sh/react/hooks/useSwitchChain */
export function useSwitchChain<context = unknown>(
  parameters: UseSwitchChainParameters<context> = {},
): UseSwitchChainReturnType<context> {
  const config = useConfig()
  const mutationOptions = switchChainMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  type Return = UseSwitchChainReturnType<context>
  return {
    ...result,
    chains: config.chains,
    switchChain: mutate as Return['switchChain'],
    switchChainAsync: mutateAsync as Return['switchChainAsync'],
  }
}
