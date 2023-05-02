import type { SendTransactionArgs, SendTransactionResult } from '@wagmi/core'
import { sendTransaction } from '@wagmi/core'
import * as React from 'react'

import type { MutationConfig } from '../../types'
import { useMutation } from '../utils'

export type UseSendTransactionArgs<
  TMode extends 'prepared' | undefined = 'prepared' | undefined,
> = Omit<SendTransactionArgs, 'to'> & { mode?: TMode; to?: string }
export type UseSendTransactionMutationArgs = SendTransactionArgs
export type UseSendTransactionConfig = MutationConfig<
  SendTransactionResult,
  Error,
  UseSendTransactionArgs
>

type SendTransactionFn = (
  overrideConfig?: UseSendTransactionMutationArgs,
) => void
type SendTransactionAsyncFn = (
  overrideConfig?: UseSendTransactionMutationArgs,
) => Promise<SendTransactionResult>
type MutateFnReturnValue<TMode, TFn> = TMode extends 'prepared'
  ? TFn | undefined
  : TFn

export const mutationKey = (args: UseSendTransactionArgs) =>
  [{ entity: 'sendTransaction', ...args }] as const

const mutationFn = ({
  accessList,
  account,
  chainId,
  data,
  gas,
  gasPrice,
  maxFeePerGas,
  maxPriorityFeePerGas,
  mode,
  nonce,
  to,
  value,
}: UseSendTransactionArgs) => {
  if (!to) throw new Error('to is required.')
  return sendTransaction({
    accessList,
    account,
    chainId,
    data,
    gas,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    mode,
    nonce,
    to,
    value,
  })
}

/**
 * @description Hook for sending a transaction.
 *
 * It is recommended to pair this with the [`usePrepareSendTransaction` hook](/docs/prepare-hooks/usePrepareSendTransaction)
 * to [avoid UX pitfalls](https://wagmi.sh/react/prepare-hooks#ux-pitfalls-without-prepare-hooks).
 *
 * @example
 * import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'
 *
 * const config = usePrepareSendTransaction({
 *   request: {
 *     to: 'moxey.eth',
 *     value: parseEther('1'),
 *   }
 * })
 * const result = useSendTransaction(config)
 */
export function useSendTransaction<
  TMode extends 'prepared' | undefined = undefined,
>({
  accessList,
  account,
  chainId,
  data: data_,
  gas,
  gasPrice,
  maxFeePerGas,
  maxPriorityFeePerGas,
  mode,
  nonce,
  to,
  value,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSendTransactionArgs<TMode> & UseSendTransactionConfig = {}) {
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
      accessList,
      account,
      chainId,
      data: data_,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      mode,
      nonce,
      to,
      value,
    }),
    mutationFn,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    },
  )

  const sendTransaction = React.useCallback(
    (args?: UseSendTransactionMutationArgs) =>
      mutate({
        chainId,
        mode,
        ...(args || {
          accessList,
          account,
          chainId,
          data: data_,
          gas,
          gasPrice,
          maxFeePerGas,
          maxPriorityFeePerGas,
          mode,
          nonce,
          value,
          to,
        }),
      }),
    [
      accessList,
      account,
      chainId,
      data_,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      mode,
      mutate,
      nonce,
      to,
      value,
    ],
  )

  const sendTransactionAsync = React.useCallback(
    (args?: UseSendTransactionMutationArgs) =>
      mutateAsync({
        chainId,
        mode,
        ...(args || {
          accessList,
          account,
          chainId,
          data: data_,
          gas,
          gasPrice,
          maxFeePerGas,
          maxPriorityFeePerGas,
          mode,
          nonce,
          value,
          to,
        }),
      }),
    [
      accessList,
      account,
      chainId,
      data_,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      mode,
      mutateAsync,
      nonce,
      to,
      value,
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
    sendTransaction: (mode === 'prepared' && !to
      ? undefined
      : sendTransaction) as MutateFnReturnValue<TMode, SendTransactionFn>,
    sendTransactionAsync: (mode === 'prepared' && !to
      ? undefined
      : sendTransactionAsync) as MutateFnReturnValue<
      TMode,
      SendTransactionAsyncFn
    >,
    status,
    variables,
  }
}
