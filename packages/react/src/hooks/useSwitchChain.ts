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
import type { Pretty } from '@wagmi/core/internal'

import type { OmittedUseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseSwitchChainParameters<
  chainId extends
    | ResolvedRegister['config']['chains'][number]['id']
    | undefined,
  context = unknown,
> = Pretty<
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
  chainId extends
    | ResolvedRegister['config']['chains'][number]['id']
    | undefined,
  context = unknown,
> = Pretty<
  Omit<Result<chainId, context>, OmittedUseMutationResult> & {
    chains: ResolvedRegister['config']['chains']
    switchChain: Result<chainId, context>['mutate']
    switchChainAsync: Result<chainId, context>['mutateAsync']
  }
>
type Result<
  chainId extends
    | ResolvedRegister['config']['chains'][number]['id']
    | undefined,
  context = unknown,
> = UseMutationResult<
  SwitchChainMutationData<ResolvedRegister['config'], chainId>,
  SwitchChainError,
  SwitchChainMutationVariables<ResolvedRegister['config'], chainId>,
  context
>

/** https://wagmi.sh/react/hooks/useSwitchChain */
export function useSwitchChain<
  chainId extends
    | ResolvedRegister['config']['chains'][number]['id']
    | undefined = undefined,
  context = unknown,
>({
  chainId,
  mutation,
}: UseSwitchChainParameters<chainId, context> = {}): UseSwitchChainReturnType<
  chainId,
  context
> {
  const config = useConfig()
  const { mutate, mutateAsync, ...mutationOptions } = useMutation<
    SwitchChainMutationData<ResolvedRegister['config'], chainId>,
    SwitchChainError,
    SwitchChainMutationVariables<ResolvedRegister['config'], chainId>,
    context
  >(switchChainMutationOptions(config, { chainId: chainId as number }))

  return {
    ...mutationOptions,
    ...mutation,
    chains: config.chains,
    switchChain: mutate,
    switchChainAsync: mutateAsync,
  }
}
