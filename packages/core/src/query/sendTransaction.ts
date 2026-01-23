import type { MutateOptions, MutationOptions } from '@tanstack/query-core'
import {
  type SendTransactionErrorType,
  type SendTransactionParameters,
  type SendTransactionReturnType,
  sendTransaction,
} from '../actions/sendTransaction.js'
import type { Config } from '../createConfig.js'
import type { MutationParameter } from '../types/query.js'
import type { Compute } from '../types/utils.js'

export type SendTransactionOptions<
  config extends Config,
  context = unknown,
> = MutationParameter<
  SendTransactionData,
  SendTransactionErrorType,
  SendTransactionVariables<config, config['chains'][number]['id']>,
  context
>

export function sendTransactionMutationOptions<config extends Config, context>(
  config: config,
  options: SendTransactionOptions<config, context> = {},
): SendTransactionMutationOptions<config> {
  return {
    ...(options.mutation as any),
    mutationFn(variables) {
      return sendTransaction(config, variables)
    },
    mutationKey: ['sendTransaction'],
  }
}

export type SendTransactionMutationOptions<config extends Config> =
  MutationOptions<
    SendTransactionData,
    SendTransactionErrorType,
    SendTransactionVariables<config, config['chains'][number]['id']>
  >

export type SendTransactionData = Compute<SendTransactionReturnType>

export type SendTransactionVariables<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = SendTransactionParameters<config, chainId>

export type SendTransactionMutate<config extends Config, context = unknown> = <
  chainId extends config['chains'][number]['id'],
>(
  variables: SendTransactionVariables<config, chainId>,
  options?:
    | Compute<
        MutateOptions<
          SendTransactionData,
          SendTransactionErrorType,
          Compute<SendTransactionVariables<config, chainId>>,
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
    | Compute<
        MutateOptions<
          SendTransactionData,
          SendTransactionErrorType,
          Compute<SendTransactionVariables<config, chainId>>,
          context
        >
      >
    | undefined,
) => Promise<SendTransactionData>
