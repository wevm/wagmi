import {
  WriteContractArgs,
  WriteContractResult,
  writeContract,
} from '@wagmi/core'
import { Abi } from 'abitype'
import * as React from 'react'

import { MutationConfig } from '../../types'
import { useMutation } from '../utils'

export type UseContractWriteArgs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = WriteContractArgs<
  TAbi,
  TFunctionName,
  { isAddressOptional: true; isArgsOptional: true; isRequestOptional: true }
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
       * [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks),
       * it is highly recommended to not use this and instead prepare the config upfront
       * using the `usePrepareContractWrite` function.
       */
      recklesslySetUnpreparedArgs?: WriteContractArgs<
        TAbi,
        TFunctionName
      >['args']
      recklesslySetUnpreparedOverrides?: WriteContractArgs['overrides']
    }

function mutationKey({
  addressOrName,
  args,
  chainId,
  contractInterface,
  functionName,
  overrides,
  request,
}: UseContractWriteArgs) {
  return [
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
}

function mutationFn({
  addressOrName,
  args,
  chainId,
  contractInterface,
  functionName,
  mode,
  overrides,
  request,
}: WriteContractArgs<
  Abi | readonly unknown[],
  string,
  { isAddressOptional: true; isRequestOptional: true }
>) {
  if (!addressOrName) throw new Error('addressOrName is required')
  switch (mode) {
    case 'prepared': {
      if (!request) throw new Error('request is required')
      return writeContract({
        mode: 'prepared',
        addressOrName,
        chainId,
        contractInterface,
        functionName,
        request,
      })
    }
    case 'recklesslyUnprepared':
      return writeContract({
        addressOrName,
        contractInterface,
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
 * to [avoid UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks).
 *
 * @example
 * import { useContractWrite, usePrepareContractWrite } from 'wagmi'
 *
 * const { config } = usePrepareContractWrite({
 *  addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
 *  contractInterface: wagmigotchiABI,
 *  functionName: 'feed',
 * })
 * const { data, isLoading, isSuccess, write } = useContractWrite(config)
 *
 */
export function useContractWrite<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
>({
  addressOrName,
  args,
  chainId,
  contractInterface,
  functionName,
  mode,
  overrides,
  request,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseContractWriteConfig<TAbi, TFunctionName>) {
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
      addressOrName,
      contractInterface,
      functionName,
      args,
      chainId,
      mode,
      overrides,
      request,
    } as WriteContractArgs),
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
        addressOrName,
        args: overrideConfig?.recklesslySetUnpreparedArgs ?? args,
        chainId,
        contractInterface,
        functionName,
        mode: overrideConfig ? 'recklesslyUnprepared' : mode,
        overrides:
          overrideConfig?.recklesslySetUnpreparedOverrides ?? overrides,
        request,
      } as WriteContractArgs)
    },
    [
      addressOrName,
      args,
      chainId,
      contractInterface,
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
        addressOrName,
        args: overrideConfig?.recklesslySetUnpreparedArgs ?? args,
        chainId,
        contractInterface,
        functionName,
        mode: overrideConfig ? 'recklesslyUnprepared' : mode,
        overrides:
          overrideConfig?.recklesslySetUnpreparedOverrides ?? overrides,
        request,
      } as WriteContractArgs)
    },
    [
      addressOrName,
      args,
      chainId,
      contractInterface,
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
