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
  request?: WriteContractPreparedConfig['request']
}
export type UseContractWritePreparedConfig = MutationConfig<
  WriteContractPreparedResult,
  Error,
  UseContractWritePreparedArgs
>

export const mutationKey = ([{ request }]: [UseContractWritePreparedArgs]) =>
  [
    {
      entity: 'writeContractPrepared',
      request,
    },
  ] as const

const mutationFn = ({ request }: UseContractWritePreparedArgs) => {
  if (!request) throw new Error('request is required')
  return writeContractPrepared({ request })
}

export function useContractWritePrepared({
  request,
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
  } = useMutation(mutationKey([{ request }]), mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  })

  const write = React.useCallback(() => mutate({ request }), [mutate, request])

  const writeAsync = React.useCallback(
    () => mutateAsync({ request }),
    [mutateAsync, request],
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
    write: request ? write : undefined,
    writeAsync: request ? writeAsync : undefined,
  }
}
