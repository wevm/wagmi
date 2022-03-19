import * as React from 'react'
import {
  SignTypedDataArgs,
  SignTypedDataResult,
  signTypedData,
} from '@wagmi/core'
import { useMutation } from 'react-query'

import { MutationConfig } from '../../types'

export type UseSignTypedDataArgs = Partial<SignTypedDataArgs>

export type UseSignTypedDataConfig = MutationConfig<
  SignTypedDataResult,
  Error,
  SignTypedDataArgs
>

export const mutationKey = 'signTypedData'

const mutationFn = (args: UseSignTypedDataArgs) => {
  const { domain, types, value } = args
  if (!domain || !types || !value)
    throw new Error('domain, types, and value are all required')
  return signTypedData({ domain, types, value })
}

export function useSignTypedData({
  domain,
  types,
  value,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSignTypedDataArgs & UseSignTypedDataConfig = {}) {
  const { mutate, mutateAsync, ...signTypedDataMutation } = useMutation(
    mutationKey,
    mutationFn,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    },
  )

  const signTypedData = React.useCallback(
    (args?: SignTypedDataArgs) =>
      mutate(<SignTypedDataArgs>{ domain, types, value, ...(args ?? {}) }),
    [domain, types, value, mutate],
  )

  const signTypedDataAsync = React.useCallback(
    (args?: SignTypedDataArgs) =>
      mutateAsync(<SignTypedDataArgs>{ domain, types, value, ...(args ?? {}) }),
    [domain, types, value, mutateAsync],
  )

  return {
    ...signTypedDataMutation,
    signTypedData,
    signTypedDataAsync,
  }
}
