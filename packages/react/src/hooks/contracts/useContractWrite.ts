import * as React from 'react'
import {
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractResult,
  writeContract,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseContractWriteArgs = Omit<WriteContractArgs, 'request'> &
  (
    | {
        dangerouslyPrepared?: false | undefined
        request: WriteContractPreparedArgs['request'] | undefined
      }
    | {
        dangerouslyPrepared: true
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
  dangerouslyPrepared,
  functionName,
  overrides,
  request,
}: WriteContractArgs) => {
  return writeContract({
    addressOrName,
    args,
    chainId,
    contractInterface,
    functionName,
    dangerouslyPrepared,
    overrides,
    request,
  } as WriteContractArgs)
}

export function useContractWrite({
  addressOrName,
  args,
  chainId,
  contractInterface,
  dangerouslyPrepared,
  functionName,
  overrides,
  request,
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
        contractInterface,
        functionName,
        args,
        chainId,
        dangerouslyPrepared,
        overrides,
        request,
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
        dangerouslyPrepared:
          dangerouslyPrepared || overrideConfig?.dangerouslySet,
        functionName,
        request,
        ...(overrideConfig?.dangerouslySet || { args, overrides }),
      } as WriteContractArgs)
    },
    [chainId, mutate, request],
  )

  const writeAsync = React.useCallback(
    (overrideConfig?: UseContractWriteMutationArgs) => {
      return mutateAsync({
        addressOrName,
        chainId,
        contractInterface,
        dangerouslyPrepared:
          dangerouslyPrepared || overrideConfig?.dangerouslySet,
        functionName,
        request,
        ...(overrideConfig?.dangerouslySet || { args, overrides }),
      } as WriteContractArgs)
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
    write: !dangerouslyPrepared && !request ? undefined : write,
    writeAsync: !dangerouslyPrepared && !request ? undefined : writeAsync,
  }
}
