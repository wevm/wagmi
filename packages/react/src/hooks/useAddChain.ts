'use client'

import { useMutation } from '@tanstack/react-query'
import type { AddChainErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type AddChainData,
  type AddChainMutate,
  type AddChainMutateAsync,
  type AddChainVariables,
  addChainMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseAddChainParameters<context = unknown> = Compute<
  ConfigParameter & {
    mutation?:
      | UseMutationParameters<
          AddChainData,
          AddChainErrorType,
          AddChainVariables,
          context
        >
      | undefined
  }
>

export type UseAddChainReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    AddChainData,
    AddChainErrorType,
    AddChainVariables,
    context
  > & {
    addChain: AddChainMutate<context>
    addChainAsync: AddChainMutateAsync<context>
  }
>

/** https://wagmi.sh/react/api/hooks/useAddChain */
export function useAddChain<context = unknown>(
  parameters: UseAddChainParameters<context> = {},
): UseAddChainReturnType<context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = addChainMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  return {
    ...result,
    addChain: mutate,
    addChainAsync: mutateAsync,
  }
}
