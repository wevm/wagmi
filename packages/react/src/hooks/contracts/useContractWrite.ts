import {
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractResult,
  writeContract,
} from '@wagmi/core'
import * as React from 'react'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseContractWriteArgs = Omit<WriteContractArgs, 'request' | 'type'> &
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
        request?: undefined
      }
  )
export type UseContractWriteMutationArgs = {
  /**
   * Recklessly pass through unprepared config. Note: This has
   * [UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks),
   * it is highly recommended to not use this and instead prepare the config upfront
   * using the `usePrepareContractWrite` function.
   */
  recklesslySetUnpreparedArgs?: WriteContractArgs['args']
  recklesslySetUnpreparedOverrides?: WriteContractArgs['overrides']
}
export type UseContractWriteConfig = MutationConfig<
  WriteContractResult,
  Error,
  UseContractWriteArgs
>

type ContractWriteFn = (overrideConfig?: UseContractWriteMutationArgs) => void
type ContractWriteAsyncFn = (
  overrideConfig?: UseContractWriteMutationArgs,
) => Promise<WriteContractResult>
type MutateFnReturnValue<Args, Fn> = Args extends {
  mode: 'recklesslyUnprepared'
}
  ? Fn
  : Fn | undefined

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
  functionName,
  mode,
  overrides,
  request,
}: WriteContractArgs) => {
  return writeContract({
    addressOrName,
    args,
    chainId,
    contractInterface,
    functionName,
    mode,
    overrides,
    request,
  } as WriteContractArgs)
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
  Args extends UseContractWriteArgs = UseContractWriteArgs,
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
}: Args & UseContractWriteConfig) {
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
        mode,
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
    (overrideConfig?: UseContractWriteMutationArgs) => {
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
    write: (mode === 'prepared' && !request
      ? undefined
      : write) as MutateFnReturnValue<Args, ContractWriteFn>,
    writeAsync: (mode === 'prepared' && !request
      ? undefined
      : writeAsync) as MutateFnReturnValue<Args, ContractWriteAsyncFn>,
  }
}
