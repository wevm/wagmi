import { useMutation } from '@tanstack/react-query'
import type { ResolvedRegister, WriteContractError } from '@wagmi/core'
import {
  type WriteContractData,
  type WriteContractMutate,
  type WriteContractMutateAsync,
  type WriteContractVariables,
  writeContractMutationOptions,
} from '@wagmi/core/query'
import type { Abi } from 'viem'

import type { UseMutationOptions, UseMutationResult } from '../utils/query.js'
import { useConfig } from './useConfig.js'

type ChainId = ResolvedRegister['config']['chains'][number]['id']

export type UseContractWriteParameters<context = unknown> = UseMutationOptions<
  WriteContractData,
  WriteContractError,
  WriteContractVariables<ResolvedRegister['config'], ChainId, Abi, string>,
  context
>

export type UseContractWriteReturnType<context = unknown> = UseMutationResult<
  WriteContractData,
  WriteContractError,
  WriteContractVariables<ResolvedRegister['config'], ChainId, Abi, string>,
  context
> & {
  write: WriteContractMutate<ResolvedRegister['config'], context>
  writeAsync: WriteContractMutateAsync<ResolvedRegister['config'], context>
}

/** https://wagmi.sh/react/hooks/useContractWrite */
export function useContractWrite<context = unknown>(
  parameters: UseContractWriteParameters<context> = {},
): UseContractWriteReturnType<context> {
  const config = useConfig()
  const mutationOptions = writeContractMutationOptions(config)
  const { mutate, mutateAsync, ...result } = useMutation({
    ...parameters,
    ...mutationOptions,
  })
  type Return = UseContractWriteReturnType<context>
  return {
    ...result,
    write: mutate as Return['write'],
    writeAsync: mutateAsync as Return['writeAsync'],
  }
}
