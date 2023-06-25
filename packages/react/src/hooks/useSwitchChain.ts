import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query'
import {
  type OmittedMutationOptions,
  type ResolvedRegister,
  type SwitchChainError,
  type SwitchChainMutationData,
  type SwitchChainMutationParameters,
  type SwitchChainMutationVariables,
  switchChainMutationOptions,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'

import type { OmittedUseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

type ChainId = ResolvedRegister['config']['chains'][number]['id']

export type UseSwitchChainParameters<
  chainId extends ChainId | undefined = ChainId | undefined,
  context = unknown,
> = Evaluate<
  SwitchChainMutationParameters<ResolvedRegister['config'], chainId> & {
    mutation?: Omit<
      UseMutationOptions<
        SwitchChainMutationData<ResolvedRegister['config'], chainId>,
        SwitchChainError,
        SwitchChainMutationVariables<ResolvedRegister['config'], chainId>,
        context
      >,
      OmittedMutationOptions
    >
  }
>

export type UseSwitchChainReturnType<
  chainId extends ChainId | undefined = ChainId | undefined,
  context = unknown,
> = Evaluate<
  Omit<Result<chainId, context>, OmittedUseMutationResult> & {
    chains: ResolvedRegister['config']['chains']
    switchChain: Result<chainId, context>['mutate']
    switchChainAsync: Result<chainId, context>['mutateAsync']
  }
>
type Result<
  chainId extends ChainId | undefined,
  context = unknown,
> = UseMutationResult<
  SwitchChainMutationData<ResolvedRegister['config'], chainId>,
  SwitchChainError,
  SwitchChainMutationVariables<ResolvedRegister['config'], chainId>,
  context
>

/** https://wagmi.sh/react/hooks/useSwitchChain */
export function useSwitchChain<
  chainId extends ChainId | undefined = undefined,
  context = unknown,
>(
  parameters?: UseSwitchChainParameters<chainId, context>,
): UseSwitchChainReturnType<chainId, context>
export function useSwitchChain({
  chainId,
  mutation,
}: UseSwitchChainParameters = {}): UseSwitchChainReturnType {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation(
    switchChainMutationOptions(config, { chainId }),
  )
  return {
    ...mutationOptions,
    ...mutation,
    chains: config.chains,
    switchChain: mutate,
    switchChainAsync: mutateAsync,
  }
}
