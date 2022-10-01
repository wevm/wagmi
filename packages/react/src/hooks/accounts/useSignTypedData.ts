import {
  SignTypedDataArgs,
  SignTypedDataResult,
  signTypedData,
} from '@wagmi/core'
import { Optional } from '@wagmi/core/internal'
import { TypedData, TypedDataToPrimitiveTypes } from 'abitype'
import * as React from 'react'

import { MutationConfig } from '../../types'
import { useMutation } from '../utils'

export type UseSignTypedDataArgs<
  TTypedData = unknown,
  TSchema = unknown,
> = Optional<
  SignTypedDataArgs<TTypedData, TSchema>,
  'domain' | 'types' | 'value'
>

export type UseSignTypedDataConfig<
  TTypedData = unknown,
  TSchema = unknown,
> = MutationConfig<
  SignTypedDataResult,
  Error,
  SignTypedDataArgs<TTypedData, TSchema>
> &
  UseSignTypedDataArgs<TTypedData, TSchema>

function mutationKey<TTypedData = unknown, TSchema = unknown>({
  domain,
  types,
  value,
}: UseSignTypedDataArgs<TTypedData, TSchema>) {
  return [{ entity: 'signTypedData', domain, types, value }] as const
}

function mutationFn<
  TTypedData extends TypedData,
  TSchema extends TypedDataToPrimitiveTypes<TTypedData>,
>(args: SignTypedDataArgs<TTypedData, TSchema>) {
  const { domain, types, value } = args
  if (!domain || !types || !value)
    throw new Error('domain, types, and value are all required')
  return signTypedData({ domain, types, value } as unknown as SignTypedDataArgs<
    TTypedData,
    TSchema
  >)
}

export function useSignTypedData<
  TTypedData extends TypedData,
  TSchema extends TypedDataToPrimitiveTypes<TTypedData>,
>(
  {
    domain,
    types,
    value,
    onError,
    onMutate,
    onSettled,
    onSuccess,
  }: UseSignTypedDataConfig<TTypedData, TSchema> = {} as any,
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
      domain,
      types,
      value,
    } as UseSignTypedDataArgs<TTypedData, TSchema>),
    mutationFn,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    },
  )

  const signTypedData = React.useCallback(
    <
      TTypedDataMutate extends TypedData = TTypedData,
      TSchemaMutate = TypedDataToPrimitiveTypes<TTypedDataMutate>,
    >(
      args?: UseSignTypedDataArgs<TTypedDataMutate, TSchemaMutate>,
    ) =>
      mutate({
        domain: args?.domain ?? domain,
        types: args?.types ?? types,
        value: args?.value ?? value,
      } as unknown as SignTypedDataArgs<TTypedData, TSchema>),
    [domain, types, value, mutate],
  )

  const signTypedDataAsync = React.useCallback(
    <
      TTypedDataMutate extends TypedData = TTypedData,
      TSchemaMutate = TypedDataToPrimitiveTypes<TTypedDataMutate>,
    >(
      args?: UseSignTypedDataArgs<TTypedDataMutate, TSchemaMutate>,
    ) =>
      mutateAsync({
        domain: args?.domain ?? domain,
        types: args?.types ?? types,
        value: args?.value ?? value,
      } as unknown as SignTypedDataArgs<TTypedData, TSchema>),
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
