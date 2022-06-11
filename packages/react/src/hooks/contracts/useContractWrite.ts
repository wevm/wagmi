import * as React from 'react'
import {
  WriteContractConfig,
  WriteContractResult,
  writeContract,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseContractWriteArgs = WriteContractConfig
export type UseContractWriteMutationArgs = Pick<
  WriteContractConfig,
  'args' | 'overrides'
>
export type UseContractWriteConfig = MutationConfig<
  WriteContractResult,
  Error,
  UseContractWriteArgs
>

export const mutationKey = ([
  { addressOrName, args, contractInterface, overrides },
]: [WriteContractConfig]) =>
  [
    {
      entity: 'writeContract',
      addressOrName,
      args,
      contractInterface,
      overrides,
    },
  ] as const

export function useContractWrite({
  addressOrName,
  args,
  contractInterface,
  functionName,
  overrides,
  signerOrProvider,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseContractWriteArgs & UseContractWriteConfig) {
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
        args,
        contractInterface,
        functionName,
        overrides,
      },
    ]),
    ({ args, overrides }) =>
      writeContract({
        addressOrName,
        args,
        contractInterface,
        functionName,
        overrides,
        signerOrProvider,
      }),
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    },
  )

  const write = React.useCallback(
    (overrideConfig?: UseContractWriteMutationArgs) =>
      mutate({
        addressOrName,
        contractInterface,
        functionName,
        signerOrProvider,
        ...(overrideConfig || { args, overrides }),
      }),
    [
      addressOrName,
      args,
      contractInterface,
      functionName,
      mutate,
      overrides,
      signerOrProvider,
    ],
  )

  const writeAsync = React.useCallback(
    (overrideConfig?: UseContractWriteMutationArgs) =>
      mutateAsync({
        addressOrName,
        contractInterface,
        functionName,
        signerOrProvider,
        ...(overrideConfig || { args, overrides }),
      }),
    [
      addressOrName,
      args,
      contractInterface,
      functionName,
      mutateAsync,
      overrides,
      signerOrProvider,
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
    write,
    writeAsync,
  }
}
