import { useMutation } from '@tanstack/react-query'
import {
  type ResolvedRegister,
  type WriteContractError,
  type WriteContractMutate,
  type WriteContractMutateAsync,
  type WriteContractMutationOptions,
  type WriteContractParameters,
  type WriteContractReturnType,
  writeContractMutationOptions,
} from '@wagmi/core'
import type { Evaluate } from '@wagmi/core/internal'
import * as React from 'react'
import type { Abi, Address } from 'viem'

import type { UseMutationOptions, UseMutationResult } from '../types/query.js'
import { useConfig } from './useConfig.js'

export type UseContractWriteParameters<
  abi extends Abi | readonly unknown[] | undefined = undefined,
  functionName extends string | undefined = undefined,
  chainId extends
    | ResolvedRegister['config']['chains'][number]['id']
    | undefined = undefined,
  address extends Address | undefined = undefined,
  args = undefined,
  value extends bigint | undefined = undefined,
  context = unknown,
> = Evaluate<
  WriteContractMutationOptions<
    ResolvedRegister['config'],
    abi,
    functionName,
    chainId,
    address,
    args,
    value
  > & {
    mutation?: UseMutationOptions<
      WriteContractReturnType,
      WriteContractError,
      WriteContractParameters<
        ResolvedRegister['config'],
        abi extends Abi ? abi : Abi,
        functionName extends string ? functionName : string,
        chainId extends number ? chainId : number
      >,
      context
    >
  }
>

export type UseContractWriteReturnType<
  abi extends Abi | readonly unknown[] | undefined = undefined,
  functionName extends string | undefined = undefined,
  chainId extends
    | ResolvedRegister['config']['chains'][number]['id']
    | undefined = undefined,
  address extends Address | undefined = undefined,
  args = undefined,
  value extends bigint | undefined = undefined,
  context = unknown,
> = Evaluate<
  UseMutationResult<
    WriteContractReturnType,
    WriteContractError,
    WriteContractParameters<ResolvedRegister['config']>,
    context
  > & {
    write: WriteContractMutate<
      ResolvedRegister['config'],
      abi,
      functionName,
      chainId,
      address,
      args,
      value,
      context
    >
    writeAsync: WriteContractMutateAsync<
      ResolvedRegister['config'],
      abi,
      functionName,
      chainId,
      address,
      args,
      value,
      context
    >
  }
>

export function useContractWrite<
  const abi extends Abi | readonly unknown[] | undefined = undefined,
  functionName extends string | undefined = undefined,
  chainId extends
    | ResolvedRegister['config']['chains'][number]['id']
    | undefined = undefined,
  address extends Address | undefined = undefined,
  args = undefined,
  value extends bigint | undefined = undefined,
  context = unknown,
>(
  parameters?: UseContractWriteParameters<
    abi,
    functionName,
    chainId,
    address,
    args,
    value,
    context
  >,
): UseContractWriteReturnType<
  abi,
  functionName,
  chainId,
  address,
  args,
  value,
  context
>

/** https://wagmi.sh/react/hooks/useContractWrite */
export function useContractWrite(
  parameters: UseContractWriteParameters = {},
): UseContractWriteReturnType {
  const config = useConfig()
  const { getVariables, ...mutationOptions } = writeContractMutationOptions(
    config,
    parameters,
  )
  const { mutate, mutateAsync, ...result } = useMutation(mutationOptions)
  return {
    ...result,
    ...parameters.mutation,
    write: React.useCallback(
      (variables, options) => mutate(getVariables(variables), options),
      [getVariables, mutate],
    ),
    writeAsync: React.useCallback(
      (variables, options) => mutateAsync(getVariables(variables), options),
      [getVariables, mutateAsync],
    ),
  }
}
