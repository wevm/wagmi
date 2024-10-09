import type { MutateOptions, MutationOptions } from '@tanstack/query-core'

import {
  type SendRawTransactionErrorType,
  type SendRawTransactionParameters,
  type SendRawTransactionReturnType,
  sendRawTransaction,
} from '../actions/sendRawTransaction.js'
import type { Config } from '../createConfig.js'
import type { Compute } from '../types/utils.js'

export function sendRawTransactionMutationOptions<config extends Config>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return sendRawTransaction(config, variables)
    },
    mutationKey: ['sendRawTransaction'],
  } as const satisfies MutationOptions<
    SendRawTransactionData,
    SendRawTransactionErrorType,
    SendRawTransactionVariables<config, config['chains'][number]['id']>
  >
}

export type SendRawTransactionData = Compute<SendRawTransactionReturnType>

export type SendRawTransactionVariables<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = SendRawTransactionParameters<config, chainId>

export type SendRawTransactionMutate<
  config extends Config,
  context = unknown,
> = <chainId extends config['chains'][number]['id']>(
  variables: SendRawTransactionVariables<config, chainId>,
  options?:
    | Compute<
        MutateOptions<
          SendRawTransactionData,
          SendRawTransactionErrorType,
          Compute<SendRawTransactionVariables<config, chainId>>,
          context
        >
      >
    | undefined,
) => void

export type SendRawTransactionMutateAsync<
  config extends Config,
  context = unknown,
> = <chainId extends config['chains'][number]['id']>(
  variables: SendRawTransactionVariables<config, chainId>,
  options?:
    | Compute<
        MutateOptions<
          SendRawTransactionData,
          SendRawTransactionErrorType,
          Compute<SendRawTransactionVariables<config, chainId>>,
          context
        >
      >
    | undefined,
) => Promise<SendRawTransactionData>
