import type {
  SendTransactionArgs,
  SendTransactionPreparedRequest,
  SendTransactionResult,
  SendTransactionUnpreparedRequest,
} from '@wagmi/core'
import { sendTransaction } from '@wagmi/core'
import * as React from 'react'

import type { MutationConfig } from '../../types'
import { useMutation } from '../utils'

export type UseSendTransactionArgs<
  TMode extends 'prepared' | undefined = 'prepared' | undefined,
> = Omit<SendTransactionArgs, 'request' | 'type'> & { mode?: TMode } & (
    | {
        mode: 'prepared'
        /** The prepared request to send the transaction. */
        request: SendTransactionPreparedRequest['request'] | undefined
      }
    | {
        mode?: never
        /** The unprepared request to send the transaction. */
        request?: SendTransactionUnpreparedRequest['request']
      }
  )
export type UseSendTransactionMutationArgs = {
  request: SendTransactionUnpreparedRequest['request']
}
export type UseSendTransactionConfig = MutationConfig<
  SendTransactionResult,
  Error,
  SendTransactionArgs
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

const mutationFn = ({ chainId, mode, request }: SendTransactionArgs) => {
  return sendTransaction({
    chainId,
    mode,
    request,
  } as SendTransactionArgs)
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
  chainId,
  mode,
  request,
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
      chainId,
      mode,
      request,
    } as SendTransactionArgs),
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
        request: args?.request ?? request,
      } as SendTransactionArgs),
    [chainId, mode, mutate, request],
  )

  const sendTransactionAsync = React.useCallback(
    (args?: UseSendTransactionMutationArgs) =>
      mutateAsync({
        chainId,
        mode,
        request: args?.request ?? request,
      } as SendTransactionArgs),
    [chainId, mode, mutateAsync, request],
  )

  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    sendTransaction: (mode === 'prepared' && !request
      ? undefined
      : sendTransaction) as MutateFnReturnValue<TMode, SendTransactionFn>,
    sendTransactionAsync: (mode === 'prepared' && !request
      ? undefined
      : sendTransactionAsync) as MutateFnReturnValue<
      TMode,
      SendTransactionAsyncFn
    >,
    status,
    variables,
  }
}
