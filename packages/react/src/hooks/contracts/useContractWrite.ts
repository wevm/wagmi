import { useMutation } from '@tanstack/react-query'
import {
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractResult,
  writeContract,
} from '@wagmi/core'
import { Abi, ExtractAbiFunctionNames } from 'abitype'
import * as React from 'react'

import { MutationConfig } from '../../types'

export type UseContractWriteArgs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = Omit<WriteContractArgs<TAbi, TFunctionName>, 'mode' | 'request'> &
  (
    | {
        /**
         * `recklesslyUnprepared`: Allow to pass through unprepared config. Note: This has harmful
         * [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks), it is highly recommended
         * to not use this and instead prepare the config upfront using the `usePrepareContractWrite` hook.
         *
         * `prepared`: The config has been prepared with parameters required for performing a contract write
         * via the [`usePrepareContractWrite` hook](https://wagmi.sh/docs/prepare-hooks/usePrepareContractWrite)
         * */
        mode: 'prepared'
        /** The prepared request to perform a contract write. */
        request: WriteContractPreparedArgs['request'] | undefined
      }
    | {
        mode: 'recklesslyUnprepared'
        request?: never
      }
  )

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
}: WriteContractArgs) {
  return writeContract({
    addressOrName,
    contractInterface,
    functionName,
    args: args as any,
    chainId,
    // TODO: Fix narrowing for `mode`
    mode: mode as any,
    overrides,
    request: request as any,
  })
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
  TFunctionName extends TAbi extends Abi
    ? ExtractAbiFunctionNames<TAbi, 'payable' | 'nonpayable'>
    : string,
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
