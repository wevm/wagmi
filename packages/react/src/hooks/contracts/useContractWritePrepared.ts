import * as React from 'react'
import {
  BuildContractTransactionConfig,
  WriteContractEagerConfig,
  WriteContractEagerResult,
  writeContractLazy,
  writeContractPrepared,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'
import { useBuildContractTransaction } from './useBuildContractTransaction'

export type UseContractWritePreparedVariables =
  BuildContractTransactionConfig & {
    unsignedTransaction?: WriteContractEagerConfig['unsignedTransaction']
  }
export type UseContractWritePreparedArgs = BuildContractTransactionConfig
export type UseContractWritePreparedConfig = MutationConfig<
  WriteContractEagerResult,
  Error,
  UseContractWritePreparedVariables
>

export const mutationKey = ([
  { addressOrName, args, contractInterface, functionName, overrides },
]: [Partial<BuildContractTransactionConfig>]) =>
  [
    {
      entity: 'writeContractPrepared',
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
}: UseContractWritePreparedVariables) => {
  return unsignedTransaction
    ? writeContractPrepared({ unsignedTransaction })
    : writeContractLazy({
        addressOrName,
        contractInterface,
        functionName,
        args,
        overrides,
      })
}

export function useContractWritePrepared({
  addressOrName,
  args,
  contractInterface,
  functionName,
  overrides,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseContractWritePreparedArgs & UseContractWritePreparedConfig) {
  const buildContractTransactionQuery = useBuildContractTransaction({
    addressOrName,
    args,
    contractInterface,
    functionName,
    overrides,
  })
  const { data: unsignedTransaction } = buildContractTransactionQuery

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
      buildContractTransactionQuery,
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
