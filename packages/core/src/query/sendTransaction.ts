import type { MutateOptions, MutationOptions } from '@tanstack/query-core'

import {
  type SendTransactionError,
  type SendTransactionParameters,
  type SendTransactionReturnType,
  sendTransaction,
} from '../actions/sendTransaction.js'
import { type Config } from '../config.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'

export function sendTransactionMutationOptions<config extends Config>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return sendTransaction(config, variables)
    },
    mutationKey: ['sendTransaction'],
  } as const satisfies MutationOptions<
    SendTransactionData,
    SendTransactionError,
    SendTransactionVariables<config, config['chains'][number]['id']>
  >
}

export type SendTransactionData = Evaluate<SendTransactionReturnType>

export type SendTransactionVariables<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = SendTransactionParameters<config, chainId>

export type SendTransactionMutate<config extends Config, context = unknown> = <
  chainId extends config['chains'][number]['id'] | undefined,
>(
  variables: Evaluate<
    SendTransactionVariables<
      config,
      // only pass through generic slot if `chainId` is inferrable from config
      number extends config['chains'][number]['id'] ? undefined : chainId
    >
  > &
    Evaluate<ChainIdParameter<config, chainId>>,
  options?: Evaluate<
    MutateOptions<
      SendTransactionData,
      SendTransactionError,
      Evaluate<SendTransactionVariables<config, chainId>>,
      context
    >
  >,
) => void

export type SendTransactionMutateAsync<
  config extends Config,
  context = unknown,
> = <chainId extends config['chains'][number]['id'] | undefined>(
  variables: Evaluate<
    SendTransactionVariables<
      config,
      // only pass through generic slot if `chainId` is inferrable from config
      number extends config['chains'][number]['id'] ? undefined : chainId
    >
  > &
    Evaluate<ChainIdParameter<config, chainId>>,
  options?: Evaluate<
    MutateOptions<
      SendTransactionData,
      SendTransactionError,
      Evaluate<SendTransactionVariables<config, chainId>>,
      context
    >
  >,
) => Promise<SendTransactionData>
