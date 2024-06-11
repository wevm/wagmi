import type { MutateOptions, MutationOptions } from '@tanstack/query-core'

import {
  type SendTransactionErrorType,
  type SendTransactionParameters,
  type SendTransactionReturnType,
  sendTransaction,
} from '../actions/sendTransaction.js'
import type { Config } from '../createConfig.js'
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
    SendTransactionErrorType,
    SendTransactionVariables<config, config['chains'][number]['id']>
  >
}

export type SendTransactionData = Evaluate<SendTransactionReturnType>

export type SendTransactionVariables<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = SendTransactionParameters<config, chainId>

export type SendTransactionMutate<config extends Config, context = unknown> = <
  chainId extends config['chains'][number]['id'],
>(
  variables: SendTransactionVariables<config, chainId>,
  options?:
    | Evaluate<
        MutateOptions<
          SendTransactionData,
          SendTransactionErrorType,
          Evaluate<SendTransactionVariables<config, chainId>>,
          context
        >
      >
    | undefined,
) => void

export type SendTransactionMutateAsync<
  config extends Config,
  context = unknown,
> = <chainId extends config['chains'][number]['id']>(
  variables: SendTransactionVariables<config, chainId>,
  options?:
    | Evaluate<
        MutateOptions<
          SendTransactionData,
          SendTransactionErrorType,
          Evaluate<SendTransactionVariables<config, chainId>>,
          context
        >
      >
    | undefined,
) => Promise<SendTransactionData>
