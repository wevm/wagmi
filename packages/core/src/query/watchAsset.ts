import type { MutationOptions } from '@tanstack/query-core'

import {
  type WatchAssetErrorType,
  type WatchAssetParameters,
  type WatchAssetReturnType,
  watchAsset,
} from '../actions/watchAsset.js'
import type { Config } from '../createConfig.js'
import type { Compute } from '../types/utils.js'
import type { Mutate, MutateAsync } from './types.js'

export function watchAssetMutationOptions(config: Config) {
  return {
    mutationFn(variables) {
      return watchAsset(config, variables)
    },
    mutationKey: ['watchAsset'],
  } as const satisfies MutationOptions<
    WatchAssetData,
    WatchAssetErrorType,
    WatchAssetVariables
  >
}

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
