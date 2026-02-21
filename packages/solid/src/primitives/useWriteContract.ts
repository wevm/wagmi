import type {
  Config,
  ResolvedRegister,
  WriteContractErrorType,
} from '@wagmi/core'
import type { Compute, ConfigParameter } from '@wagmi/core/internal'
import {
  type WriteContractData,
  type WriteContractMutate,
  type WriteContractMutateAsync,
  type WriteContractOptions,
  type WriteContractVariables,
  writeContractMutationOptions,
} from '@wagmi/core/query'
import type { Accessor } from 'solid-js'
import { mergeProps } from 'solid-js'
import type { Abi } from 'viem'
import { type UseMutationReturnType, useMutation } from '../utils/query.js'
import { useConfig } from './useConfig.js'

/** https://wagmi.sh/solid/api/primitives/useWriteContract */
export function useWriteContract<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: useWriteContract.Parameters<config, context> = () => ({}),
): useWriteContract.ReturnType<config, context> {
  const config = useConfig(parameters)
  const mutation = useMutation(() =>
    writeContractMutationOptions(config(), parameters()),
  )
  type Return = useWriteContract.ReturnType<config, context>
  return mergeProps(mutation, {
    get writeContract() {
      return mutation.mutate as Return['mutate']
    },
    get writeContractAsync() {
      return mutation.mutateAsync as Return['mutateAsync']
    },
  }) as unknown as Return
}

export namespace useWriteContract {
  export type Parameters<
    config extends Config = Config,
    context = unknown,
  > = Accessor<SolidParameters<config, context>>

  export type ReturnType<
    config extends Config = Config,
    context = unknown,
  > = Compute<
    UseMutationReturnType<
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
  >

  export type SolidParameters<
    config extends Config = Config,
    context = unknown,
  > = Compute<ConfigParameter<config> & WriteContractOptions<config, context>>
}
