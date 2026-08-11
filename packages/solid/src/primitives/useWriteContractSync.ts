import type {
  Config,
  ResolvedRegister,
  WriteContractSyncErrorType,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type WriteContractSyncData,
  type WriteContractSyncMutate,
  type WriteContractSyncMutateAsync,
  type WriteContractSyncOptions,
  type WriteContractSyncVariables,
  writeContractSyncMutationOptions,
} from '@wagmi/core/query'
import type { Accessor } from 'solid-js'
import { mergeProps } from 'solid-js'
import type { Abi } from 'viem'
import { type UseMutationReturnType, useMutation } from '../utils/query.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useWriteContractSync */
export function useWriteContractSync<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useWriteContractSync.Parameters<config, context> = () => ({}),
): useWriteContractSync.ReturnType<config, context> {
  const config = useConfig(parameters)
  const mutation = useMutation(() =>
    writeContractSyncMutationOptions(config(), parameters()),
  )
  type Return = useWriteContractSync.ReturnType<config, context>
  return mergeProps(mutation, {
    get writeContractSync() {
      return mutation.mutate as Return['mutate']
    },
    get writeContractSyncAsync() {
      return mutation.mutateAsync as Return['mutateAsync']
    },
  }) as unknown as Return
}

export namespace useWriteContractSync {
  export type Parameters<
    config extends Config = Config,
    context = unknown,
  > = Accessor<SolidParameters<config, context>>

  export type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = Compute<
    UseMutationReturnType<
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
  >

  export type SolidParameters<
    config extends Config = Config,
    context = unknown,
  > = Compute<
    ConfigParameter<config> & WriteContractSyncOptions<config, context>
  >
}
