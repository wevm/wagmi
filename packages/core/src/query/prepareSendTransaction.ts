import { type QueryOptions } from '@tanstack/query-core'

import {
  type PrepareSendTransactionError,
  type PrepareSendTransactionParameters,
  type PrepareSendTransactionReturnType,
  prepareSendTransaction,
} from '../actions/prepareSendTransaction.js'
import type { Config } from '../config.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'
import type { ScopeKeyParameter } from './types.js'
import { filterQueryOptions } from './utils.js'

export type PrepareSendTransactionOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = ExactPartial<
  PrepareSendTransactionParameters<
    config,
    // only pass through generic slot if `chainId` is inferrable from config
    number extends config['chains'][number]['id'] ? undefined : chainId
  >
> &
  ScopeKeyParameter &
  Evaluate<ChainIdParameter<config, chainId>>

export function prepareSendTransactionQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  config: config,
  options: PrepareSendTransactionOptions<
    config,
    chainId
  > = {} as PrepareSendTransactionOptions<config, chainId>,
) {
  return {
    async queryFn({ queryKey }) {
      const { to } = queryKey[1]
      if (!to) throw new Error('to is required')
      return prepareSendTransaction(config, queryKey[1] as any)
    },
    queryKey: prepareSendTransactionQueryKey(options),
  } as const satisfies QueryOptions<
    PrepareSendTransactionQueryFnData<config, chainId>,
    PrepareSendTransactionError,
    PrepareSendTransactionData<config, chainId>,
    PrepareSendTransactionQueryKey<config, chainId>
  >
}

export type PrepareSendTransactionQueryFnData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = PrepareSendTransactionReturnType<config, chainId>

export type PrepareSendTransactionData<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = PrepareSendTransactionQueryFnData<config, chainId>

export function prepareSendTransactionQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  options: PrepareSendTransactionOptions<
    config,
    chainId
  > = {} as PrepareSendTransactionOptions<config, chainId>,
) {
  return ['prepareSendTransaction', filterQueryOptions(options)] as const
}

export type PrepareSendTransactionQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = ReturnType<typeof prepareSendTransactionQueryKey<config, chainId>>
