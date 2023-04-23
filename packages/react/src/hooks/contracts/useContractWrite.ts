import type {
  PrepareWriteContractResult,
  WriteContractMode,
  WriteContractResult,
  WriteContractUnpreparedArgs,
} from '@wagmi/core'
import { writeContract } from '@wagmi/core'
import { getSendTransactionParameters } from '@wagmi/core/internal'
import type { Abi } from 'abitype'
import * as React from 'react'
import type { GetFunctionArgs, SendTransactionParameters } from 'viem'

import type { MutationConfig, PartialBy } from '../../types'
import { useMutation } from '../utils'

type UseContractWritePreparedArgs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = Partial<
  Pick<PrepareWriteContractResult<TAbi, TFunctionName>, 'request'>
> & {
  abi?: never
  accessList?: never
  address?: never
  args?: never
  chainId?: never
  functionName?: never
  gas?: never
  gasPrice?: never
  maxFeePerGas?: never
  maxPriorityFeePerGas?: never
  nonce?: never
  value?: never
}

type UseContractWriteUnpreparedArgs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
> = PartialBy<
  Omit<WriteContractUnpreparedArgs<TAbi, TFunctionName>, 'args'>,
  'abi' | 'address' | 'functionName'
> &
  Partial<GetFunctionArgs<TAbi, TFunctionName>> & {
    request?: never
  }

export type UseContractWriteArgs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TMode extends WriteContractMode = undefined,
> = { mode?: TMode } & (TMode extends 'prepared'
  ? UseContractWritePreparedArgs<TAbi, TFunctionName>
  : UseContractWriteUnpreparedArgs<TAbi, TFunctionName>)

export type UseContractWriteConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TMode extends WriteContractMode = undefined,
> = MutationConfig<
  WriteContractResult,
  Error,
  UseContractWriteArgs<TAbi, TFunctionName, TMode>
> &
  UseContractWriteArgs<TAbi, TFunctionName, TMode>

function mutationKey({
  address,
  abi,
  functionName,
  ...config
}: UseContractWriteArgs) {
  const {
    args,
    accessList,
    gas,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    request,
    value,
  } = config
  return [
    {
      entity: 'writeContract',
      address,
      args,
      abi,
      accessList,
      functionName,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      request,
      value,
    },
  ] as const
}

function mutationFn(
  config: UseContractWriteArgs<Abi, string, WriteContractMode>,
) {
  if (config.mode === 'prepared') {
    if (!config.request) throw new Error('request is required')
    return writeContract({
      mode: 'prepared',
      ...config.request,
    })
  }

  if (!config.address) throw new Error('address is required')
  if (!config.abi) throw new Error('abi is required')
  if (!config.functionName) throw new Error('functionName is required')

  return writeContract({
    address: config.address,
    args: config.args as unknown[],
    chainId: config.chainId,
    abi: config.abi as Abi, // TODO: Remove cast and still support `Narrow<TAbi>`
    functionName: config.functionName,
    accessList: config.accessList,
    gas: config.gas,
    gasPrice: config.gasPrice,
    maxFeePerGas: config.maxFeePerGas,
    maxPriorityFeePerGas: config.maxPriorityFeePerGas,
    nonce: config.nonce,
    value: config.value,
  })
}

/**
 * @description Hook for calling a contract nonpayable or payable function.
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
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(config: UseContractWriteConfig<TAbi, TFunctionName, TMode>) {
  const { address, abi, args, chainId, functionName, mode, request } = config
  const {
    accessList,
    gas,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    value,
  } = getSendTransactionParameters(config)

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
      chainId,
      mode,
      args,
      accessList,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      request: request,
      value,
    } as UseContractWriteArgs),
    mutationFn,
    {
      onError: config.onError as UseContractWriteConfig['onError'],
      onMutate: config.onMutate as UseContractWriteConfig['onMutate'],
      onSettled: config.onSettled as UseContractWriteConfig['onSettled'],
      onSuccess: config.onSuccess as UseContractWriteConfig['onSuccess'],
    },
  )

  const write = React.useMemo(() => {
    if (config.mode === 'prepared') {
      if (!request) return undefined
      return () =>
        mutate({
          mode: 'prepared',
          request: config.request,
          chainId: config.chainId,
        } as unknown as UseContractWriteArgs)
    }

    return (overrideConfig?: MutationFnArgs<TAbi, TFunctionName>) =>
      mutate({
        address,
        args,
        abi: abi as Abi,
        functionName,
        chainId,
        accessList,
        gas,
        gasPrice,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        value,
        ...overrideConfig,
      } as UseContractWriteArgs)
  }, [
    accessList,
    abi,
    address,
    args,
    chainId,
    config.chainId,
    config.mode,
    config.request,
    functionName,
    gas,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    mutate,
    nonce,
    request,
    value,
  ]) as MutationFn<TMode, TAbi, TFunctionName, void>

  const writeAsync = React.useMemo(() => {
    if (config.mode === 'prepared') {
      if (!request) return undefined
      return () =>
        mutateAsync({
          mode: 'prepared',
          request: config.request,
        } as unknown as UseContractWriteArgs)
    }

    return (overrideConfig?: MutationFnArgs<TAbi, TFunctionName>) =>
      mutateAsync({
        address,
        args,
        abi: abi as Abi,
        chainId,
        functionName,
        accessList,
        gas,
        gasPrice,
        maxFeePerGas,
        maxPriorityFeePerGas,
        nonce,
        value,
        ...overrideConfig,
      } as UseContractWriteArgs)
  }, [
    accessList,
    abi,
    address,
    args,
    chainId,
    config.mode,
    config.request,
    functionName,
    gas,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    mutateAsync,
    nonce,
    request,
    value,
  ]) as MutationFn<TMode, TAbi, TFunctionName, Promise<WriteContractResult>>

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
> = Omit<SendTransactionParameters, 'account' | 'chain'> & {
  args?: WriteContractUnpreparedArgs<TAbi, TFunctionName> extends {
    args: unknown
  }
    ? WriteContractUnpreparedArgs<TAbi, TFunctionName>['args']
    : unknown
}

type MutationFn<
  TMode extends WriteContractMode,
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TReturnType,
> = TMode extends 'prepared'
  ? (() => TReturnType) | undefined
  : (config?: MutationFnArgs<TAbi, TFunctionName>) => TReturnType
