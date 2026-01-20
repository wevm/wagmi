import type { MutationOptions } from '@tanstack/query-core'
import {
  type WatchAssetErrorType,
  type WatchAssetParameters,
  type WatchAssetReturnType,
  watchAsset,
} from '../actions/watchAsset.js'
import type { Config } from '../createConfig.js'
import type { MutationParameter } from '../types/query.js'
import type { Compute } from '../types/utils.js'
import type { Mutate, MutateAsync } from './types.js'

export type WatchAssetOptions<context = unknown> = MutationParameter<
  WatchAssetData,
  WatchAssetErrorType,
  WatchAssetVariables,
  context
>

export function watchAssetMutationOptions<context>(
  config: Config,
  options: WatchAssetOptions<context> = {},
): WatchAssetMutationOptions {
  return {
    ...(options.mutation as any),
    mutationFn(variables) {
      return watchAsset(config, variables)
    },
    mutationKey: ['watchAsset'],
  }
}

export type WatchAssetMutationOptions = MutationOptions<
  WatchAssetData,
  WatchAssetErrorType,
  WatchAssetVariables
>

export type WatchAssetData = WatchAssetReturnType

export type WatchAssetVariables = Compute<WatchAssetParameters>

export type WatchAssetMutate<context = unknown> = Mutate<
  WatchAssetData,
  WatchAssetErrorType,
  WatchAssetVariables,
  context
>

export type WatchAssetMutateAsync<context = unknown> = MutateAsync<
  WatchAssetData,
  WatchAssetErrorType,
  WatchAssetVariables,
  context
>
