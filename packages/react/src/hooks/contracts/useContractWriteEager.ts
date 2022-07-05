import * as React from 'react'
import {
  BuildContractTransactionConfig,
  WriteContractEagerConfig,
  WriteContractEagerResult,
  writeContractEager,
  writeContractLazy,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'
import { useBuildContractTransaction } from './useBuildContractTransaction'

export type UseContractWriteEagerVariables = BuildContractTransactionConfig & {
  unsignedTransaction?: WriteContractEagerConfig['unsignedTransaction']
}
export type UseContractWriteEagerArgs = BuildContractTransactionConfig
export type UseContractWriteEagerConfig = MutationConfig<
  WriteContractEagerResult,
  Error,
  UseContractWriteEagerVariables
>

export const mutationKey = ([
  { addressOrName, args, contractInterface, functionName, overrides },
]: [Partial<BuildContractTransactionConfig>]) =>
  [
    {
      entity: 'writeContractEager',
      addressOrName,
      args,
      contractInterface,
      functionName,
      overrides,
    },
  ] as const

const mutationFn = ({
  addressOrName,
  args,
  contractInterface,
  functionName,
  overrides,
  unsignedTransaction,
}: UseContractWriteEagerVariables) => {
  return unsignedTransaction
    ? writeContractEager({ unsignedTransaction })
    : writeContractLazy({
        addressOrName,
        contractInterface,
        functionName,
        args,
        overrides,
      })
}

export function useContractWriteEager({
  addressOrName,
  args,
  contractInterface,
  functionName,
  overrides,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseContractWriteEagerArgs & UseContractWriteEagerConfig) {
  const { data: unsignedTransaction } = useBuildContractTransaction({
    addressOrName,
    args,
    contractInterface,
    functionName,
    overrides,
  })

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
    mutationFn,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    },
  )

  const write = React.useCallback(
    () =>
      mutate({
        addressOrName,
        contractInterface,
        functionName,
        args,
        overrides,
        unsignedTransaction,
      }),
    [
      addressOrName,
      args,
      contractInterface,
      functionName,
      mutate,
      overrides,
      unsignedTransaction,
    ],
  )

  const writeAsync = React.useCallback(
    () =>
      mutateAsync({
        addressOrName,
        args,
        contractInterface,
        functionName,
        overrides,
        unsignedTransaction,
      }),
    [
      addressOrName,
      args,
      contractInterface,
      functionName,
      mutateAsync,
      overrides,
      unsignedTransaction,
    ],
  )

  return {
    data,
    error,
    internal: {
      unsignedTransaction,
    },
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
