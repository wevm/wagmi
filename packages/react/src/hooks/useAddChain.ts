'use client'

import { useMutation } from '@tanstack/react-query'
import type { AddChainErrorType } from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type AddChainData,
  type AddChainMutate,
  type AddChainMutateAsync,
  type AddChainOptions,
  type AddChainVariables,
  addChainMutationOptions,
} from '@wagmi/core/query'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseAddChainParameters<context = unknown> = Compute<
  ConfigParameter & AddChainOptions<context>
>

export type UseAddChainReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    AddChainData,
    AddChainErrorType,
    AddChainVariables,
    context,
    AddChainMutate<context>,
    AddChainMutateAsync<context>
  > & {
    /** @deprecated use `mutate` instead */
    addChain: AddChainMutate<context>
    /** @deprecated use `mutateAsync` instead */
    addChainAsync: AddChainMutateAsync<context>
  }
>

/** https://wagmi.sh/react/api/hooks/useAddChain */
export function useAddChain<context = unknown>(
  parameters: UseAddChainParameters<context> = {},
): UseAddChainReturnType<context> {
  const config = useConfig(parameters)
  const options = addChainMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseAddChainReturnType<context>
  return {
    ...(mutation as Return),
    addChain: mutation.mutate as Return['mutate'],
    addChainAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
