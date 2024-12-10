import { createMutation } from '@tanstack/svelte-query'
import type {
  Config,
  ResolvedRegister,
  WriteContractErrorType,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type WriteContractData,
  type WriteContractMutate,
  type WriteContractMutateAsync,
  type WriteContractVariables,
  writeContractMutationOptions,
} from '@wagmi/core/query'
import type { Abi } from 'viem'

import type {
  CreateMutationParameters,
  CreateMutationReturnType,
} from '../query.svelte.js'
import type { RuneParameters, RuneReturnType } from '../types.js'
import type { ConfigParameter } from '../types.js'
import { useConfig } from './useConfig.svelte.js'

export type UseWriteContractParameters<
  config extends Config = Config,
  context = unknown,
> = RuneParameters<
  Compute<
    ConfigParameter<config> & {
      mutation?:
        | CreateMutationParameters<
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
  >
>

export type UseWriteContractReturnType<
  config extends Config = Config,
  context = unknown,
> = RuneReturnType<
  Compute<
    CreateMutationReturnType<
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
  >
>

/** https://wagmi.sh/react/api/hooks/useWriteContract */
export function useWriteContract<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseWriteContractParameters<config, context> = () => ({}),
): UseWriteContractReturnType<config, context> {
  const { mutation } = $derived.by(parameters)

  const config = $derived.by(useConfig(parameters))

  const mutationOptions = $derived(writeContractMutationOptions(config))
  const query = createMutation(() => ({
    ...mutation,
    ...mutationOptions,
  }))
  const { mutate, mutateAsync, ...result } = $derived(query)

  type Return = ReturnType<UseWriteContractReturnType<config, context>>
  return () => ({
    ...result,
    writeContract: mutate as Return['writeContract'],
    writeContractAsync: mutateAsync as Return['writeContractAsync'],
  })
}
