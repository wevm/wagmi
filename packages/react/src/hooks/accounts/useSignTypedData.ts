import {
  SignTypedDataArgs,
  SignTypedDataResult,
  signTypedData,
} from '@wagmi/core'
import { TypedData, TypedDataToPrimitiveTypes } from 'abitype'
import * as React from 'react'

import { MutationConfig } from '../../types'
import { useMutation } from '../utils'

export type UseSignTypedDataArgs<
  TTypedData extends TypedData,
  TSchema extends TypedDataToPrimitiveTypes<TTypedData>,
> = Partial<SignTypedDataArgs<TTypedData, TSchema>>

export type UseSignTypedDataConfig<
  TTypedData extends TypedData,
  TSchema extends TypedDataToPrimitiveTypes<TTypedData>,
> = MutationConfig<
  SignTypedDataResult,
  Error,
  SignTypedDataArgs<TTypedData, TSchema>
> &
  UseSignTypedDataArgs<TTypedData, TSchema>

function mutationKey<
  TTypedData extends TypedData,
  TSchema extends TypedDataToPrimitiveTypes<TTypedData>,
>({ domain, types, value }: UseSignTypedDataArgs<TTypedData, TSchema>) {
  return [{ entity: 'signTypedData', domain, types, value }] as const
}

function mutationFn<
  TTypedData extends TypedData,
  TSchema extends TypedDataToPrimitiveTypes<TTypedData>,
>(args: SignTypedDataArgs<TTypedData, TSchema>) {
  const { domain, types, value } = args
  if (!domain || !types || !value)
    throw new Error('domain, types, and value are all required')
  return signTypedData(<SignTypedDataArgs<TTypedData, TSchema>>{
    domain,
    types,
    value,
  })
}

export function useSignTypedData<
  TTypedData extends TypedData,
  TSchema extends TypedDataToPrimitiveTypes<TTypedData>,
>({
  domain,
  types,
  value,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSignTypedDataConfig<TTypedData, TSchema> = {}) {
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
  } = useMutation(mutationKey({ domain, types, value }), mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  })

  const signTypedData = React.useCallback(
    (args?: UseSignTypedDataArgs<TTypedData, TSchema>) =>
      mutate(<SignTypedDataArgs<TTypedData, TSchema>>(<unknown>{
        domain: args?.domain ?? domain,
        types: args?.types ?? types,
        value: args?.value ?? value,
      })),
    [domain, types, value, mutate],
  )

  const signTypedDataAsync = React.useCallback(
    (args?: UseSignTypedDataArgs<TTypedData, TSchema>) =>
      mutateAsync(<SignTypedDataArgs<TTypedData, TSchema>>(<unknown>{
        domain: args?.domain ?? domain,
        types: args?.types ?? types,
        value: args?.value ?? value,
      })),
    [domain, types, value, mutateAsync],
  )

  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    signTypedData,
    signTypedDataAsync,
    status,
    variables,
  }
}
