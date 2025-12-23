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
import { type Accessor, mergeProps } from 'solid-js'
import type { Abi } from 'viem'
import type { ConfigParameter } from '../types/properties.js'
import {
  type UseMutationParameters,
  type UseMutationReturnType,
  useMutation,
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
        WriteContractVariables<Abi, string, readonly unknown[], config, number>,
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
}

export function useWriteContract<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(params: Accessor<UseWriteContractParameters<config, context>> = () => ({})) {
  const config = useConfig()

  const mutation = useMutation(() => {
    const mutationOptions = writeContractMutationOptions(config())
    const mutation = params?.().mutation

    return {
      ...(mutation ?? {}),
      ...mutationOptions,
    } as NonNullable<UseWriteContractParameters<config, context>['mutation']>
  })

  // const [options, mutation] = splitProps(mut, ['mutate', 'mutateAsync'])
  type Return = UseWriteContractReturnType<config, context>

  return mergeProps(mutation, {
    mutate: mutation.mutate as Return['mutate'],
    mutateAsync: mutation.mutateAsync as Return['mutateAsync'],
  })
}
