'use client'
import { useMutation } from '@tanstack/react-query'
import type { WatchAssetErrorType } from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'
import {
  type WatchAssetData,
  type WatchAssetMutate,
  type WatchAssetMutateAsync,
  type WatchAssetOptions,
  type WatchAssetVariables,
  watchAssetMutationOptions,
} from '@wagmi/core/query'
import type { ConfigParameter } from '../types/properties.js'
import type { UseMutationReturnType } from '../utils/query.js'
import { useConfig } from './useConfig.js'

export type UseWatchAssetParameters<context = unknown> = Compute<
  ConfigParameter & WatchAssetOptions<context>
>

export type UseWatchAssetReturnType<context = unknown> = Compute<
  UseMutationReturnType<
    WatchAssetData,
    WatchAssetErrorType,
    WatchAssetVariables,
    context,
    WatchAssetMutate<context>,
    WatchAssetMutateAsync<context>
  > & {
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
  const options = watchAssetMutationOptions(config, parameters)
  const mutation = useMutation(options)
  type Return = UseWatchAssetReturnType<context>
  return {
    ...(mutation as Return),
    watchAsset: mutation.mutate as Return['mutate'],
    watchAssetAsync: mutation.mutateAsync as Return['mutateAsync'],
  }
}
