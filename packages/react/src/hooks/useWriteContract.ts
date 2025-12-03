'use client'

import { useMutation } from '@tanstack/react-query'
import type {
  Config,
  ResolvedRegister,
  WriteContractErrorType,
} from '@wagmi/core'
import {
  type WriteContractData,
  type WriteContractMutate,
  type WriteContractMutateAsync,
  type WriteContractVariables,
  writeContractMutationOptions,
} from '@wagmi/core/query'
import type { Abi } from 'viem'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseWriteContractParameters<
  config extends Config = Config,
  context = unknown,
> = ConfigParameter<config> & {
  mutation?:
    | UseMutationParameters<
        WriteContractData,
        WriteContractErrorType,
        WriteContractVariables<
          Abi,
          string,
          readonly unknown[],
          config,
          config['chains'][number]['id']
        >,
        context
      >
    | undefined
}

export type UseWriteContractReturnType<
  config extends Config = Config,
  context = unknown,
> = UseMutationReturnType<
  WriteContractData,
  WriteContractErrorType,
  WriteContractVariables<
    Abi,
    string,
    readonly unknown[],
    config,
    config['chains'][number]['id']
  >,
  context
> & {
  mutate: WriteContractMutate<config, context>
  mutateAsync: WriteContractMutateAsync<config, context>
  /** @deprecated use `mutate` instead */
  writeContract: WriteContractMutate<config, context>
  /** @deprecated use `mutateAsync` instead */
  writeContractAsync: WriteContractMutateAsync<config, context>
}

/** https://wagmi.sh/react/api/hooks/useWriteContract */
export function useWriteContract<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseWriteContractParameters<config, context> = {},
): UseWriteContractReturnType<config, context> {
  const config = useConfig(parameters)
  const mutationOptions = writeContractMutationOptions(config)
  const mutation = useMutation({ ...parameters.mutation, ...mutationOptions })
  type Return = UseWriteContractReturnType<config, context>
  return {
    ...mutation,
    mutate: mutation.mutate as Return['mutate'],
    mutateAsync: mutation.mutateAsync as Return['mutateAsync'],
    writeContract: mutation.mutate as Return['mutate'],
    writeContractAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
