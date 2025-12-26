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
import { type Accessor, createMemo, mergeProps } from 'solid-js'
import type { Abi } from 'viem'

import type { ConfigParameter } from '../types/properties.js'
import {
  type SolidMutationParameters,
  type UseMutationReturnType,
  useMutation,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type SolidWriteContractParameters<
  config extends Config = Config,
  context = unknown,
> = ConfigParameter<config> & {
  mutation?:
    | SolidMutationParameters<
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

export type UseWriteContractParameters<
  config extends Config = Config,
  context = unknown,
> = Accessor<SolidWriteContractParameters<config, context>>

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
>(parameters: UseWriteContractParameters<config, context> = () => ({})) {
  const config = useConfig(parameters)
  const mutationOptions = createMemo(() =>
    writeContractMutationOptions(config()),
  )
  const mutation = useMutation(() => ({
    ...parameters().mutation,
    ...mutationOptions(),
  }))
  type Return = UseWriteContractReturnType<config, context>
  return mergeProps(mutation, {
    mutate: mutation.mutate as Return['mutate'],
    mutateAsync: mutation.mutateAsync as Return['mutateAsync'],
  })
}
