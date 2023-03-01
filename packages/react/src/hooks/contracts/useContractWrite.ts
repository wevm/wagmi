import type {
  WriteContractMode,
  WriteContractPreparedArgs,
  WriteContractResult,
  WriteContractUnpreparedArgs,
} from '@wagmi/core'
import { writeContract } from '@wagmi/core'
import type { Abi } from 'abitype'

import * as React from 'react'

import type { MutationConfig, PartialBy } from '../../types'
import { useMutation } from '../utils'

export type UseContractWriteArgs<
  TMode extends WriteContractMode = WriteContractMode,
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = { mode: TMode } & (
  | PartialBy<
      WriteContractPreparedArgs<TAbi, TFunctionName>,
      'abi' | 'address' | 'functionName' | 'request'
    >
  | PartialBy<
      WriteContractUnpreparedArgs<TAbi, TFunctionName>,
      'abi' | 'address' | 'args' | 'functionName'
    >
)

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

function mutationKey({
  address,
  chainId,
  abi,
  functionName,
  ...config
}: UseContractWriteArgs) {
  const { request } = config as WriteContractPreparedArgs<Abi, string>
  const { args, overrides } = config as unknown as WriteContractUnpreparedArgs<
    Abi,
    string
  >
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

function mutationFn(
  config: UseContractWriteArgs<WriteContractMode, Abi, string>,
) {
  if (!config.address) throw new Error('address is required')
  if (!config.abi) throw new Error('abi is required')
  if (!config.functionName) throw new Error('functionName is required')

  switch (config.mode) {
    case 'prepared': {
      if (!config.request) throw new Error('request is required')
      return writeContract({
        mode: 'prepared',
        address: config.address,
        chainId: config.chainId,
        abi: config.abi as Abi, // TODO: Remove cast and still support `Narrow<TAbi>`
        functionName: config.functionName,
        request: config.request,
      })
    }
    case 'recklesslyUnprepared':
      return writeContract({
        address: config.address,
        args: config.args as unknown[],
        chainId: config.chainId,
        abi: config.abi as Abi, // TODO: Remove cast and still support `Narrow<TAbi>`
        functionName: config.functionName,
        mode: 'recklesslyUnprepared',
        overrides: config.overrides,
      })
  }
}

/**
 * @description Hook for calling an ethers Contract [write](https://docs.ethers.io/v5/api/contract/contract/#Contract--write)
 * method.
 *
 * It is highly recommended to pair this with the [`usePrepareContractWrite` hook](/docs/prepare-hooks/usePrepareContractWrite)
 * to [avoid UX pitfalls](https://wagmi.sh/react/prepare-hooks#ux-pitfalls-without-prepare-hooks).
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
>(config: UseContractWriteConfig<TMode, TAbi, TFunctionName> = {} as any) {
  const { address, abi, functionName, chainId, mode } = config
  const { request } = config as WriteContractPreparedArgs<TAbi, TFunctionName>
  const { args, overrides } = config as unknown as WriteContractUnpreparedArgs<
    TAbi,
    TFunctionName
  >

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
      abi: abi as Abi,
      functionName,
      chainId,
      mode,
      args: args as unknown[],
      overrides,
      request,
    }),
    mutationFn,
    {
      onError: config.onError as UseContractWriteConfig['onError'],
      onMutate: config.onMutate as UseContractWriteConfig['onMutate'],
      onSettled: config.onSettled as UseContractWriteConfig['onSettled'],
      onSuccess: config.onSuccess as UseContractWriteConfig['onSuccess'],
    },
  )

  const write = React.useMemo(() => {
    if (mode === 'prepared') {
      if (!request) return undefined
      return () =>
        mutate({
          address,
          chainId,
          abi: abi as Abi,
          functionName,
          mode: 'prepared',
          request,
        })
    }

    return (overrideConfig?: MutationFnArgs<TAbi, TFunctionName>) =>
      mutate({
        address,
        args:
          (overrideConfig?.recklesslySetUnpreparedArgs as readonly unknown[]) ??
          args,
        chainId,
        abi: abi as Abi,
        functionName,
        mode: 'recklesslyUnprepared',
        overrides:
          overrideConfig?.recklesslySetUnpreparedOverrides ?? overrides,
      })
  }, [
    address,
    chainId,
    abi,
    functionName,
    mode,
    mutate,
    args,
    overrides,
    request,
  ]) as MutationFn<typeof mode, TAbi, TFunctionName, void>

  const writeAsync = React.useMemo(() => {
    if (mode === 'prepared') {
      if (!request) return undefined
      return () =>
        mutateAsync({
          address,
          chainId,
          abi: abi as Abi,
          functionName,
          mode: 'prepared',
          request,
        })
    }

    return (overrideConfig?: MutationFnArgs<TAbi, TFunctionName>) =>
      mutateAsync({
        address,
        args:
          (overrideConfig?.recklesslySetUnpreparedArgs as readonly unknown[]) ??
          args,
        chainId,
        abi: abi as Abi,
        functionName,
        mode: 'recklesslyUnprepared',
        overrides:
          overrideConfig?.recklesslySetUnpreparedOverrides ?? overrides,
      })
  }, [
    address,
    chainId,
    abi,
    functionName,
    mode,
    mutateAsync,
    args,
    overrides,
    request,
  ]) as MutationFn<
    typeof mode,
    TAbi,
    TFunctionName,
    Promise<WriteContractResult>
  >

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

type MutationFnArgs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = {
  /**
   * Recklessly pass through unprepared config. Note: This has
   * [UX pitfalls](https://wagmi.sh/react/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks),
   * it is highly recommended to not use this and instead prepare the config upfront
   * using the `usePrepareContractWrite` function.
   */
  recklesslySetUnpreparedArgs?: WriteContractUnpreparedArgs<
    TAbi,
    TFunctionName
  >['args']
  recklesslySetUnpreparedOverrides?: WriteContractUnpreparedArgs<
    TAbi,
    TFunctionName
  >['overrides']
}

type MutationFn<
  TMode extends WriteContractMode,
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TReturnType,
> = TMode extends 'prepared'
  ? (() => TReturnType) | undefined
  : (config?: MutationFnArgs<TAbi, TFunctionName>) => TReturnType
