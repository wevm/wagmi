import * as React from 'react'
import {
  WriteContractLazyConfig,
  WriteContractLazyResult,
  writeContractLazy,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseContractWriteLazyArgs = WriteContractLazyConfig
export type UseContractWriteLazyMutationArgs = Pick<
  WriteContractLazyConfig,
  'args' | 'overrides'
>
export type UseContractWriteLazyConfig = MutationConfig<
  WriteContractLazyResult,
  Error,
  UseContractWriteLazyArgs
>

export const mutationKey = ([
  { addressOrName, args, chainId, contractInterface, overrides },
]: [WriteContractLazyConfig]) =>
  [
    {
      entity: 'writeContractLazy',
      addressOrName,
      args,
      chainId,
      contractInterface,
      overrides,
    },
  ] as const

export function useContractWriteLazy({
  addressOrName,
  args,
  chainId,
  contractInterface,
  functionName,
  overrides,
  signerOrProvider,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseContractWriteLazyArgs & UseContractWriteLazyConfig) {
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
        chainId,
        contractInterface,
        functionName,
        overrides,
      },
    ]),
    ({ args, overrides }) =>
      writeContractLazy({
        addressOrName,
        args,
        chainId,
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
    (overrideConfig?: UseContractWriteLazyMutationArgs) =>
      mutate({
        addressOrName,
        chainId,
        contractInterface,
        functionName,
        signerOrProvider,
        ...(overrideConfig || { args, overrides }),
      }),
    [
      addressOrName,
      args,
      chainId,
      contractInterface,
      functionName,
      mutate,
      overrides,
      signerOrProvider,
    ],
  )

  const writeAsync = React.useCallback(
    (overrideConfig?: UseContractWriteLazyMutationArgs) =>
      mutateAsync({
        addressOrName,
        chainId,
        contractInterface,
        functionName,
        signerOrProvider,
        ...(overrideConfig || { args, overrides }),
      }),
    [
      addressOrName,
      args,
      chainId,
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
