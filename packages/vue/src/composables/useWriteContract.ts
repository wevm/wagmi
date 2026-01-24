import { useMutation } from '@tanstack/vue-query'
import type {
  Config,
  ResolvedRegister,
  WriteContractErrorType,
} from '@wagmi/core'
import type { ConfigParameter } from '@wagmi/core/internal'
import {
  type WriteContractData,
  type WriteContractMutate,
  type WriteContractMutateAsync,
  type WriteContractOptions,
  type WriteContractVariables,
  writeContractMutationOptions,
} from '@wagmi/core/query'
import type { Abi } from 'viem'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseWriteContractParameters<
  config extends Config = Config,
  context = unknown,
> = ConfigParameter<config> & WriteContractOptions<config, context>

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
  context,
  WriteContractMutate<config, context>,
  WriteContractMutateAsync<config, context>
> & {
  /** @deprecated use `mutate` instead */
  writeContract: WriteContractMutate<config, context>
  /** @deprecated use `mutateAsync` instead */
  writeContractAsync: WriteContractMutateAsync<config, context>
}

/** https://wagmi.sh/vue/api/composables/useWriteContract */
export function useWriteContract<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseWriteContractParameters<config, context> = {},
): UseWriteContractReturnType<config, context> {
  const config = useConfig(parameters)
  const options = writeContractMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseWriteContractReturnType<config, context>
  return {
    ...(mutation as Return),
    writeContract: mutation.mutate as Return['mutate'],
    writeContractAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
