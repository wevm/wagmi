import { type QueryOptions } from '@tanstack/query-core'

import {
  type PrepareSendTransactionError,
  type PrepareSendTransactionParameters,
  type PrepareSendTransactionReturnType,
  prepareSendTransaction,
} from '../actions/prepareSendTransaction.js'
import type { Config } from '../config.js'
import type { Evaluate, ExactPartial } from '../types/utils.js'

export type PrepareSendTransactionOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = Evaluate<ExactPartial<PrepareSendTransactionParameters<config, chainId>>>

export function prepareSendTransactionQueryOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  config: Config,
  options: PrepareSendTransactionOptions<
    config,
    chainId
  > = {} as PrepareSendTransactionOptions<config, chainId>,
) {
  return {
    async queryFn({ queryKey }) {
      return prepareSendTransaction(
        config,
        queryKey[1] as PrepareSendTransactionParameters<config, chainId>,
      )
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
  return ['prepareSendTransaction', options] as const
}

export type PrepareSendTransactionQueryKey<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = ReturnType<typeof prepareSendTransactionQueryKey<config, chainId>>
