'use client'

import { useMutation } from '@tanstack/react-query'
import type { WatchAssetErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type WatchAssetData,
  type WatchAssetMutate,
  type WatchAssetMutateAsync,
  type WatchAssetVariables,
  watchAssetMutationOptions,
} from '@wagmi/core/query'

import type { ConfigParameter } from '../types/properties.js'
import type {
  UseMutationParameters,
  UseMutationReturnType,
} from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseWatchAssetParameters<context = unknown> = Compute<
  ConfigParameter & {
    mutation?:
      | UseMutationParameters<
          WatchAssetData,
          WatchAssetErrorType,
          WatchAssetVariables,
          context
        >
      | undefined
  }
>

export type UseWatchAssetReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    WatchAssetData,
    WatchAssetErrorType,
    WatchAssetVariables,
    context
  > & {
    mutate: WatchAssetMutate<context>
    mutateAsync: WatchAssetMutateAsync<context>
    /** @deprecated use `mutate` instead */
    watchAsset: WatchAssetMutate<context>
    /** @deprecated use `mutateAsync` instead */
    watchAssetAsync: WatchAssetMutateAsync<context>
  }
>

/** https://wagmi.sh/react/api/hooks/useWatchAsset */
export function useWatchAsset<context = unknown>(
  parameters: UseWatchAssetParameters<context> = {},
): UseWatchAssetReturnType<context> {
  const config = useConfig(parameters)
  const mutationOptions = watchAssetMutationOptions(config)
  const mutation = useMutation({ ...parameters.mutation, ...mutationOptions })
  return {
    ...mutation,
    watchAsset: mutation.mutate,
    watchAssetAsync: mutation.mutateAsync,
  }
}
