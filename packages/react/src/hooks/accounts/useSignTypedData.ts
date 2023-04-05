import type { SignTypedDataArgs, SignTypedDataResult } from '@wagmi/core'
import { signTypedData } from '@wagmi/core'
import type { Never } from '@wagmi/core/internal'
import type { TypedData } from 'abitype'
import * as React from 'react'

import type { MutationConfig } from '../../types'
import { useMutation } from '../utils'

export type UseSignTypedDataArgs<
  TTypedData extends TypedData | { [key: string]: unknown } = TypedData,
  TPrimaryType extends string = string,
> =
  | Partial<Never<SignTypedDataArgs<TTypedData, TPrimaryType>>>
  | SignTypedDataArgs<TTypedData, TPrimaryType>

export type UseSignTypedDataConfig<
  TTypedData extends TypedData | { [key: string]: unknown } = TypedData,
  TPrimaryType extends string = string,
> = MutationConfig<SignTypedDataResult, Error, SignTypedDataArgs<TTypedData>> &
  UseSignTypedDataArgs<TTypedData, TPrimaryType>

function mutationKey<
  TTypedData extends TypedData | { [key: string]: unknown },
>({ domain, types, message, primaryType }: UseSignTypedDataArgs<TTypedData>) {
  return [
    { entity: 'signTypedData', domain, types, message, primaryType },
  ] as const
}

function mutationFn<TTypedData extends TypedData>(
  args: SignTypedDataArgs<TTypedData>,
) {
  const { domain, types, primaryType, message } = args
  if (!domain) throw new Error('domain is required')
  if (!types) throw new Error('types is required')
  if (!primaryType) throw new Error('primaryType is required')
  if (!message) throw new Error('message is required')
  return signTypedData({
    domain,
    message,
    primaryType,
    types,
  } as unknown as SignTypedDataArgs<TTypedData>)
}

export function useSignTypedData<
  TTypedData extends TypedData,
  TPrimaryType extends string,
>(
  {
    domain,
    types,
    message,
    primaryType,
    onError,
    onMutate,
    onSettled,
    onSuccess,
  }: UseSignTypedDataConfig<TTypedData, TPrimaryType> = {} as any,
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
      message,
      primaryType,
      types,
    } as UseSignTypedDataArgs<TTypedData>),
    mutationFn,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    },
  )

  const signTypedData = React.useCallback(
    <TTypedDataMutate extends TypedData = TTypedData>(
      args?: UseSignTypedDataArgs<TTypedDataMutate>,
    ) =>
      mutate({
        domain: args?.domain ?? domain,
        types: args?.types ?? types,
        message: args?.message ?? message,
        primaryType: args?.primaryType ?? primaryType,
      } as unknown as SignTypedDataArgs<TTypedData>),
    [domain, types, primaryType, message, mutate],
  )

  const signTypedDataAsync = React.useCallback(
    <TTypedDataMutate extends TypedData = TTypedData>(
      args?: UseSignTypedDataArgs<TTypedDataMutate>,
    ) =>
      mutateAsync({
        domain: args?.domain ?? domain,
        types: args?.types ?? types,
        message: args?.message ?? message,
        primaryType: args?.primaryType ?? primaryType,
      } as unknown as SignTypedDataArgs<TTypedData>),
    [domain, types, primaryType, message, mutateAsync],
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
