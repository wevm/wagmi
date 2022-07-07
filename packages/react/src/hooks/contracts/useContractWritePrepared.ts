import * as React from 'react'
import {
  WriteContractPreparedConfig,
  WriteContractPreparedResult,
  writeContractPrepared,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseContractWritePreparedArgs = {
  /** The prepared request to use when sending the transaction */
  preparedRequest?: WriteContractPreparedConfig['preparedRequest']
}
export type UseContractWritePreparedConfig = MutationConfig<
  WriteContractPreparedResult,
  Error,
  UseContractWritePreparedArgs
>

export const mutationKey = ([{ preparedRequest }]: [
  UseContractWritePreparedArgs,
]) =>
  [
    {
      entity: 'writeContractPrepared',
      preparedRequest,
    },
  ] as const

const mutationFn = ({ preparedRequest }: UseContractWritePreparedArgs) => {
  if (!preparedRequest) throw new Error('preparedRequest is required')
  return writeContractPrepared({ preparedRequest })
}

export function useContractWritePrepared({
  preparedRequest,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseContractWritePreparedArgs & UseContractWritePreparedConfig) {
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
  } = useMutation(mutationKey([{ preparedRequest }]), mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  })

  const write = React.useCallback(
    () => mutate({ preparedRequest }),
    [mutate, preparedRequest],
  )

  const writeAsync = React.useCallback(
    () => mutateAsync({ preparedRequest }),
    [mutateAsync, preparedRequest],
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
    write: preparedRequest ? write : undefined,
    writeAsync: preparedRequest ? writeAsync : undefined,
  }
}
