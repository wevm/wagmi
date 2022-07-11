import * as React from 'react'
import {
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractResult,
  writeContract,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseContractWriteArgs = Omit<WriteContractArgs, 'request' | 'type'> &
  (
    | {
        type: 'prepared'
        request: WriteContractPreparedArgs['request'] | undefined
      }
    | {
        type: 'dangerouslyUnprepared'
        request?: undefined
      }
  )
export type UseContractWriteMutationArgs = {
  dangerouslySet: Pick<WriteContractArgs, 'args' | 'overrides'>
}
export type UseContractWriteConfig = MutationConfig<
  WriteContractResult,
  Error,
  UseContractWriteArgs
>

type ContractWriteFn = (overrideConfig?: UseContractWriteMutationArgs) => void
type ContractWriteAsyncFn = (
  overrideConfig?: UseContractWriteMutationArgs,
) => Promise<WriteContractResult>
type MutateFnReturnValue<Args, Fn> = Args extends {
  type: 'dangerouslyUnprepared'
}
  ? Fn
  : Fn | undefined

export const mutationKey = ([
  {
    addressOrName,
    args,
    chainId,
    contractInterface,
    functionName,
    overrides,
    request,
  },
]: [UseContractWriteArgs]) =>
  [
    {
      entity: 'writeContract',
      addressOrName,
      args,
      chainId,
      contractInterface,
      functionName,
      overrides,
      request,
    },
  ] as const

const mutationFn = ({
  addressOrName,
  args,
  chainId,
  contractInterface,
  functionName,
  overrides,
  request,
  type,
}: WriteContractArgs) => {
  return writeContract({
    addressOrName,
    args,
    chainId,
    contractInterface,
    functionName,
    overrides,
    request,
    type,
  } as WriteContractArgs)
}

export function useContractWrite<
  Args extends UseContractWriteArgs = UseContractWriteArgs,
>({
  addressOrName,
  args,
  chainId,
  contractInterface,
  functionName,
  overrides,
  request,
  type,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: Args & UseContractWriteConfig) {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables,
  } = useMutation(
    mutationKey([
      {
        addressOrName,
        contractInterface,
        functionName,
        args,
        chainId,
        overrides,
        request,
        type,
      } as WriteContractArgs,
    ]),
    mutationFn,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    },
  )

  const write = React.useCallback(
    (overrideConfig?: UseContractWriteMutationArgs) => {
      return mutate({
        addressOrName,
        chainId,
        contractInterface,
        functionName,
        request,
        type: overrideConfig?.dangerouslySet ? 'dangerouslyUnprepared' : type,
        ...(overrideConfig?.dangerouslySet || { args, overrides }),
      } as WriteContractArgs)
    },
    [
      addressOrName,
      args,
      chainId,
      contractInterface,
      functionName,
      mutate,
      overrides,
      request,
      type,
    ],
  )

  const writeAsync = React.useCallback(
    (overrideConfig?: UseContractWriteMutationArgs) => {
      return mutateAsync({
        addressOrName,
        chainId,
        contractInterface,
        functionName,
        request,
        type: overrideConfig?.dangerouslySet ? 'dangerouslyUnprepared' : type,
        ...(overrideConfig?.dangerouslySet || { args, overrides }),
      } as WriteContractArgs)
    },
    [
      addressOrName,
      args,
      chainId,
      contractInterface,
      functionName,
      mutateAsync,
      overrides,
      request,
      type,
    ],
  )

  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status,
    variables,
    write: (type === 'prepared' && !request
      ? undefined
      : write) as MutateFnReturnValue<Args, ContractWriteFn>,
    writeAsync: (type === 'prepared' && !request
      ? undefined
      : writeAsync) as MutateFnReturnValue<Args, ContractWriteAsyncFn>,
  }
}
