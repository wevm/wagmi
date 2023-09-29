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

export type UseContractWriteParameters<
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

export type UseContractWriteReturnType<
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
  writeContract: WriteContractMutate<config, context>
  writeContractAsync: WriteContractMutateAsync<config, context>
}

/** https://alpha.wagmi.sh/react/api/hooks/useContractWrite */
export function useContractWrite<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseContractWriteParameters<config, context> = {},
): UseContractWriteReturnType<config, context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = writeContractMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  type Return = UseContractWriteReturnType<config, context>
  return {
    ...result,
    writeContract: mutate as Return['writeContract'],
    writeContractAsync: mutateAsync as Return['writeContractAsync'],
  }
}
