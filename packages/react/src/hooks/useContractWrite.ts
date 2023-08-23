import { useMutation } from '@tanstack/react-query'
import type { Config, ResolvedRegister, WriteContractError } from '@wagmi/core'
import {
  type WriteContractData,
  type WriteContractMutate,
  type WriteContractMutateAsync,
  type WriteContractVariables,
  writeContractMutationOptions,
} from '@wagmi/core/query'
import type { Abi } from 'viem'

import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationOptions, UseMutationResult } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseContractWriteParameters<
  config extends Config = Config,
  context = unknown,
> = UseMutationOptions<
  WriteContractData,
  WriteContractError,
  WriteContractVariables<
    Abi,
    string,
    readonly unknown[],
    config,
    config['chains'][number]['id']
  >,
  context
> &
  ConfigParameter<config>

export type UseContractWriteReturnType<
  config extends Config = Config,
  context = unknown,
> = UseMutationResult<
  WriteContractData,
  WriteContractError,
  WriteContractVariables<
    Abi,
    string,
    readonly unknown[],
    config,
    config['chains'][number]['id']
  >,
  context
> & {
  write: WriteContractMutate<config, context>
  writeAsync: WriteContractMutateAsync<config, context>
}

/** https://wagmi.sh/react/hooks/useContractWrite */
export function useContractWrite<
  config extends Config = ResolvedRegister['config'],
  context = unknown,
>(
  parameters: UseContractWriteParameters<config, context> = {},
): UseContractWriteReturnType<config, context> {
  const config = useConfig(parameters)
  const mutationOptions = writeContractMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  type Return = UseContractWriteReturnType<config, context>
  return {
    ...result,
    write: mutate as Return['write'],
    writeAsync: mutateAsync as Return['writeAsync'],
  }
}
