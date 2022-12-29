import type {
  WriteContractArgs,
  WriteContractMode,
  WriteContractPreparedArgs,
  WriteContractResult,
  WriteContractUnpreparedArgs,
} from '@wagmi/core'
import { writeContract } from '@wagmi/core'
import type { Abi } from 'abitype'
import * as React from 'react'

import type { PartialBy, MutationConfig } from '../../types'
import { useMutation } from '../utils'

export type UseContractWriteArgs<
  TMode extends WriteContractMode = WriteContractMode,
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = { mode: TMode } & (TMode extends 'prepared'
  ? PartialBy<
      WriteContractPreparedArgs<TAbi, TFunctionName>,
      'abi' | 'address' | 'functionName' | 'request'
    >
  : PartialBy<
      WriteContractUnpreparedArgs<TAbi, TFunctionName>,
      'abi' | 'address' | 'args' | 'functionName'
    >)

export type UseContractWriteConfig<
  TMode extends WriteContractMode = WriteContractMode,
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = MutationConfig<
  WriteContractResult,
  Error,
  UseContractWriteArgs<TMode, TAbi, TFunctionName>
> &
  UseContractWriteArgs<TMode, TAbi, TFunctionName>

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
}: UseContractWriteArgs<WriteContractMode, Abi, string>) {
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
  TMode extends WriteContractMode,
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
  }: UseContractWriteConfig<TMode, TAbi, TFunctionName> = {} as any,
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
      onError: onError as UseContractWriteConfig['onError'],
      onMutate: onMutate as UseContractWriteConfig['onMutate'],
      onSettled: onSettled as UseContractWriteConfig['onSettled'],
      onSuccess: onSuccess as UseContractWriteConfig['onSuccess'],
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
      } as WriteContractArgs<Abi, string>)
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
      } as WriteContractArgs<Abi, string>)
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
