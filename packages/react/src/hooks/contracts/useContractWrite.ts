import type { WriteContractArgs, WriteContractResult } from '@wagmi/core'
import { writeContract } from '@wagmi/core'
import type { Abi } from 'abitype'
import * as React from 'react'

import type { MutationConfig } from '../../types'
import { useMutation } from '../utils'

export type UseContractWriteArgs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = WriteContractArgs<
  TAbi,
  TFunctionName,
  {
    isAbiOptional: true
    isAddressOptional: true
    isArgsOptional: true
    isFunctionNameOptional: true
    isRequestOptional: true
  }
>

export type UseContractWriteConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = MutationConfig<WriteContractResult, Error, UseContractWriteArgs> &
  UseContractWriteArgs<TAbi, TFunctionName>

type UseContractWriteMutationArgs<
  Mode extends 'prepared' | 'recklesslyUnprepared',
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = Mode extends 'prepared'
  ? undefined
  : {
      /**
       * Recklessly pass through unprepared config. Note: This has
       * [UX pitfalls](https://wagmi.sh/react/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks),
       * it is highly recommended to not use this and instead prepare the config upfront
       * using the `usePrepareContractWrite` function.
       */
      recklesslySetUnpreparedArgs?: WriteContractArgs<
        TAbi,
        TFunctionName
      >['args']
      recklesslySetUnpreparedOverrides?: WriteContractArgs<
        TAbi,
        TFunctionName
      >['overrides']
    }

function mutationKey({
  address,
  args,
  chainId,
  abi,
  functionName,
  overrides,
  request,
}: UseContractWriteArgs) {
  return [
    {
      entity: 'writeContract',
      address,
      args,
      chainId,
      abi,
      functionName,
      overrides,
      request,
    },
  ] as const
}

function mutationFn({
  address,
  args,
  chainId,
  abi,
  functionName,
  mode,
  overrides,
  request,
}: WriteContractArgs<
  Abi | readonly unknown[],
  string,
  {
    isAbiOptional: true
    isAddressOptional: true
    isArgsOptional: true
    isFunctionNameOptional: true
    isRequestOptional: true
  }
>) {
  if (!address) throw new Error('address is required')
  if (!abi) throw new Error('abi is required')
  if (!functionName) throw new Error('functionName is required')

  switch (mode) {
    case 'prepared': {
      if (!request) throw new Error('request is required')
      return writeContract({
        mode: 'prepared',
        address,
        chainId,
        abi,
        functionName,
        request,
      })
    }
    case 'recklesslyUnprepared':
      return writeContract({
        address,
        abi,
        functionName,
        args,
        chainId,
        mode: 'recklesslyUnprepared',
        overrides,
      })
  }
}

/**
 * @description Hook for calling an ethers Contract [write](https://docs.ethers.io/v5/api/contract/contract/#Contract--write)
 * method.
 *
 * It is highly recommended to pair this with the [`usePrepareContractWrite` hook](/docs/prepare-hooks/usePrepareContractWrite)
 * to [avoid UX pitfalls](https://wagmi.sh/react/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks).
 *
 * @example
 * import { useContractWrite, usePrepareContractWrite } from 'wagmi'
 *
 * const { config } = usePrepareContractWrite({
 *  address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
 *  abi: wagmigotchiABI,
 *  functionName: 'feed',
 * })
 * const { data, isLoading, isSuccess, write } = useContractWrite(config)
 *
 */
export function useContractWrite<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>(
  {
    address,
    args,
    chainId,
    abi,
    functionName,
    mode,
    overrides,
    request,
    onError,
    onMutate,
    onSettled,
    onSuccess,
  }: UseContractWriteConfig<TAbi, TFunctionName> = {} as any,
) {
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
    mutationKey({
      address,
      abi,
      functionName,
      args,
      chainId,
      mode,
      overrides,
      request,
    } as UseContractWriteArgs),
    mutationFn,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    },
  )

  const write = React.useCallback(
    (
      overrideConfig?: UseContractWriteMutationArgs<
        typeof mode,
        TAbi,
        TFunctionName
      >,
    ) => {
      return mutate({
        address,
        args: overrideConfig?.recklesslySetUnpreparedArgs ?? args,
        chainId,
        abi,
        functionName,
        mode: overrideConfig ? 'recklesslyUnprepared' : mode,
        overrides:
          overrideConfig?.recklesslySetUnpreparedOverrides ?? overrides,
        request,
      } as UseContractWriteArgs)
    },
    [
      address,
      args,
      chainId,
      abi,
      functionName,
      mode,
      mutate,
      overrides,
      request,
    ],
  )

  const writeAsync = React.useCallback(
    (
      overrideConfig?: UseContractWriteMutationArgs<
        typeof mode,
        TAbi,
        TFunctionName
      >,
    ) => {
      return mutateAsync({
        address,
        args: overrideConfig?.recklesslySetUnpreparedArgs ?? args,
        chainId,
        abi,
        functionName,
        mode: overrideConfig ? 'recklesslyUnprepared' : mode,
        overrides:
          overrideConfig?.recklesslySetUnpreparedOverrides ?? overrides,
        request,
      } as UseContractWriteArgs)
    },
    [
      address,
      args,
      chainId,
      abi,
      functionName,
      mode,
      mutateAsync,
      overrides,
      request,
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
    write: mode === 'prepared' && !request ? undefined : write,
    writeAsync: mode === 'prepared' && !request ? undefined : writeAsync,
  }
}
