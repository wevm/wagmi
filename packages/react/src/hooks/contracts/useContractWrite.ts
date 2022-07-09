import * as React from 'react'
import {
  WriteContractArgs,
  WriteContractResult,
  WriteContractUnpreparedRequest,
  writeContract,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseContractWriteArgs<
  Request =
    | WriteContractArgs['request']
    | { type: 'prepared'; payload: undefined },
> = Omit<WriteContractArgs, 'request'> & {
  request: Request
}
export type UseContractWriteConfig = MutationConfig<
  WriteContractResult,
  Error,
  UseContractWriteArgs
>

type UseContractWriteMutationArgs = Partial<
  WriteContractUnpreparedRequest['payload']
>

export const mutationKey = ([{ request }]: [UseContractWriteArgs]) =>
  [
    {
      entity: 'writeContract',
      request,
    },
  ] as const

const mutationFn = ({ chainId, request }: WriteContractArgs) => {
  return writeContract({ chainId, request })
}

export function useContractWrite<
  Request extends
    | WriteContractArgs['request']
    | { type: 'prepared'; payload: undefined },
>({
  chainId,
  request,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseContractWriteArgs<Request> & UseContractWriteConfig) {
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

  const write = React.useCallback(
    (
      args?: Request extends { type: 'dangerouslyUnprepared'; payload: any }
        ? UseContractWriteMutationArgs
        : never,
    ) => {
      let request_ = request
      if (args && request.type === 'dangerouslyUnprepared') {
        request_ = {
          ...request,
          payload: {
            ...request.payload,
            ...args,
          },
        }
      }
      return mutate({
        chainId,
        request: request_ as WriteContractArgs['request'],
      })
    },
    [chainId, mutate, request],
  )

  const writeAsync = React.useCallback(
    (
      args?: Request extends { type: 'dangerouslyUnprepared'; payload: any }
        ? UseContractWriteMutationArgs
        : never,
    ) => {
      let request_ = request
      if (args && request.type === 'dangerouslyUnprepared') {
        request_ = {
          ...request,
          payload: {
            ...request.payload,
            ...args,
          },
        }
      }
      return mutateAsync({
        chainId,
        request: request_ as WriteContractArgs['request'],
      })
    },
    [chainId, mutateAsync, request],
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
    write: request.type === 'prepared' && !request.payload ? undefined : write,
    writeAsync:
      request.type === 'prepared' && !request.payload ? undefined : writeAsync,
  }
}
