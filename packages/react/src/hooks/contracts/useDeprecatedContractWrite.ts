import {
  DeprecatedWriteContractConfig,
  DeprecatedWriteContractResult,
  deprecatedWriteContract,
} from '@wagmi/core'
import * as React from 'react'

import { MutationConfig } from '../../types'
import { useMutation } from '../utils'

export type UseDeprecatedContractWriteArgs = DeprecatedWriteContractConfig
export type UseDeprecatedContractWriteMutationArgs = Pick<
  DeprecatedWriteContractConfig,
  'args' | 'overrides'
>
export type UseDeprecatedContractWriteConfig = MutationConfig<
  DeprecatedWriteContractResult,
  Error,
  UseDeprecatedContractWriteArgs
>

export const mutationKey = ([
  { addressOrName, args, chainId, contractInterface, overrides },
]: [DeprecatedWriteContractConfig]) =>
  [
    {
      entity: 'writeContract',
      addressOrName,
      args,
      chainId,
      contractInterface,
      overrides,
    },
  ] as const

/** @deprecated */
export function useDeprecatedContractWrite({
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
}: UseDeprecatedContractWriteArgs & UseDeprecatedContractWriteConfig) {
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
      deprecatedWriteContract({
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
    (overrideConfig?: UseDeprecatedContractWriteMutationArgs) =>
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
    (overrideConfig?: UseDeprecatedContractWriteMutationArgs) =>
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
