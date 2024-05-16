import { useMutation } from '@tanstack/vue-query'
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
  writeContract: WriteContractMutate<config, context>
  writeContractAsync: WriteContractMutateAsync<config, context>
}

/** https://wagmi.sh/vue/api/composables/useWriteContract */
export function useWriteContract<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseWriteContractParameters<config, context> = {},
): UseWriteContractReturnType<config, context> {
  const { mutation } = parameters

  const config = useConfig(parameters)

  const mutationOptions = writeContractMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...mutation,
    ...mutationOptions,
  })

  type Return = UseWriteContractReturnType<config, context>
  return {
    ...result,
    writeContract: mutate as Return['writeContract'],
    writeContractAsync: mutateAsync as Return['writeContractAsync'],
  }
}
