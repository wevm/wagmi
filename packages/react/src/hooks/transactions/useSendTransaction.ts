import * as React from 'react'
import {
  SendTransactionArgs,
  SendTransactionPreparedRequest,
  SendTransactionResult,
  SendTransactionUnpreparedRequest,
  sendTransaction,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseSendTransactionArgs = Omit<
  SendTransactionArgs,
  'request' | 'type'
> &
  (
    | {
        /**
         * `dangerouslyUnprepared`: Allow to pass through an unprepared `request`. Note: This has harmful
         * UX side-effects, it is highly recommended to not use this and instead prepare the request upfront
         * using the `usePrepareSendTransaction` hook. [Read more](/TODO)
         *
         * `prepared`: The request has been prepared with parameters required for sending a transaction
         * via the [`usePrepareSendTransaction` hook](/TODO)
         * */
        mode: 'prepared'
        /** The prepared request to send the transaction. */
        request: SendTransactionPreparedRequest['request'] | undefined
      }
    | {
        mode: 'dangerouslyUnprepared'
        /** The unprepared request to send the transaction. */
        request?: SendTransactionUnpreparedRequest['request']
      }
  )
export type UseSendTransactionMutationArgs = {
  /**
   * Dangerously pass through an unprepared `request`. Note: This has harmful
   * UX side-effects, it is highly recommended to not use this and instead
   * prepare the request upfront using the `usePrepareSendTransaction` hook.
   * [Read more](/TODO)
   */
  dangerouslySetRequest: SendTransactionUnpreparedRequest['request']
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
type MutateFnReturnValue<Args, Fn> = Args extends {
  mode: 'dangerouslyUnprepared'
}
  ? Fn
  : Fn | undefined

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
 * It is recommended to pair this with the [`usePrepareSendTransaction` hook](/docs/hooks/usePrepareSendTransaction)
 * to [avoid UX issues](/TODO).
 *
 * @example
 * import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'
 *
 * const config = await usePrepareSendTransaction({
 *   to: 'moxey.eth',
 *   value: parseEther('1'),
 * })
 * const result = await useSendTransaction(config)
 */
export function useSendTransaction<
  Args extends UseSendTransactionArgs = UseSendTransactionArgs,
>({
  chainId,
  mode,
  request,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: Args & UseSendTransactionConfig) {
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
        request: args?.dangerouslySetRequest ?? request,
      } as SendTransactionArgs),
    [chainId, mode, mutate, request],
  )

  const sendTransactionAsync = React.useCallback(
    (args?: UseSendTransactionMutationArgs) =>
      mutateAsync({
        chainId,
        mode,
        request: args?.dangerouslySetRequest ?? request,
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
      : sendTransaction) as MutateFnReturnValue<Args, SendTransactionFn>,
    sendTransactionAsync: (mode === 'prepared' && !request
      ? undefined
      : sendTransactionAsync) as MutateFnReturnValue<
      Args,
      SendTransactionAsyncFn
    >,
    status,
    variables,
  }
}
