import { useMutation } from '@tanstack/react-query'
import type { ResolvedRegister, SwitchChainError } from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import {
  type SwitchChainData,
  type SwitchChainMutate,
  type SwitchChainMutateAsync,
  type SwitchChainOptions,
  type SwitchChainVariables,
  switchChainMutationOptions,
} from '@wagmi/core/query'
import { useCallback } from 'react'

import type { UseMutationOptions, UseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

type ChainId = ResolvedRegister['config']['chains'][number]['id']

export type UseSwitchChainParameters<
  chainId extends ChainId | undefined = undefined,
  context = unknown,
> = Evaluate<
  SwitchChainOptions<ResolvedRegister['config'], chainId> &
    UseMutationOptions<
      SwitchChainData<ResolvedRegister['config'], chainId>,
      SwitchChainError,
      SwitchChainVariables<ResolvedRegister['config'], undefined>,
      context
    >
>

export type UseSwitchChainReturnType<
  chainId extends ChainId | undefined = undefined,
  context = unknown,
> = Evaluate<
  UseMutationResult<
    SwitchChainData<ResolvedRegister['config'], chainId>,
    SwitchChainError,
    SwitchChainVariables<ResolvedRegister['config'], undefined>,
    context
  > & {
    chains: ResolvedRegister['config']['chains']
    switchChain: SwitchChainMutate<ResolvedRegister['config'], chainId, context>
    switchChainAsync: SwitchChainMutateAsync<
      ResolvedRegister['config'],
      chainId,
      context
    >
  }
>

export function useSwitchChain<
  chainId extends ChainId | undefined = undefined,
  context = unknown,
>(
  parameters?: UseSwitchChainParameters<chainId, context>,
): UseSwitchChainReturnType<chainId, context>

/** https://wagmi.sh/react/hooks/useSwitchChain */
export function useSwitchChain(
  parameters: UseSwitchChainParameters = {},
): UseSwitchChainReturnType {
  const config = useConfig()
  const { getVariables, ...mutationOptions } = switchChainMutationOptions(
    config,
    parameters,
  )
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  return {
    ...result,
    chains: config.chains,
    switchChain: useCallback(
      (variables, options) => mutate(getVariables(variables), options),
      [getVariables, mutate],
    ),
    switchChainAsync: useCallback(
      (variables, options) => mutateAsync(getVariables(variables), options),
      [getVariables, mutateAsync],
    ),
  }
}
