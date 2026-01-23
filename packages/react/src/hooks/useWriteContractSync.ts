'use client'
import { useMutation } from '@tanstack/react-query'
import type {
  Config,
  ResolvedRegister,
  WriteContractSyncErrorType,
} from '@wagmi/core'
import {
  type WriteContractSyncData,
  type WriteContractSyncMutate,
  type WriteContractSyncMutateAsync,
  type WriteContractSyncOptions,
  type WriteContractSyncVariables,
  writeContractSyncMutationOptions,
} from '@wagmi/core/query'
import type { Abi } from 'viem'
import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseWriteContractSyncParameters<
  config extends Config = Config,
  context = unknown,
> = ConfigParameter<config> & WriteContractSyncOptions<config, context>

export type UseWriteContractSyncReturnType<
  config extends Config = Config,
  context = unknown,
> = UseMutationReturnType<
  WriteContractSyncData,
  WriteContractSyncErrorType,
  WriteContractSyncVariables<
    Abi,
    string,
    readonly unknown[],
    config,
    config['chains'][number]['id']
  >,
  context,
  WriteContractSyncMutate<config, context>,
  WriteContractSyncMutateAsync<config, context>
> & {
  /** @deprecated use `mutate` instead */
  writeContractSync: WriteContractSyncMutate<config, context>
  /** @deprecated use `mutateAsync` instead */
  writeContractSyncAsync: WriteContractSyncMutateAsync<config, context>
}

/** https://wagmi.sh/react/api/hooks/useWriteContractSync */
export function useWriteContractSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseWriteContractSyncParameters<config, context> = {},
): UseWriteContractSyncReturnType<config, context> {
  const config = useConfig(parameters)
  const options = writeContractSyncMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseWriteContractSyncReturnType<config, context>
  return {
    ...(mutation as Return),
    writeContractSync: mutation.mutate as Return['mutate'],
    writeContractSyncAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
