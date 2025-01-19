import type { MutateOptions, MutationOptions } from '@tanstack/query-core'

import {
  type SendEip712TransactionErrorType,
  type SendEip712TransactionParameters,
  type SendEip712TransactionReturnType,
  sendEip712Transaction,
} from '../actions/sendEip712Transaction.js'
import type { Config } from '../createConfig.js'
import type { Compute } from '../types/utils.js'

export function sendEip712TransactionMutationOptions<config extends Config>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return sendEip712Transaction(config, variables)
    },
    mutationKey: ['sendEip712Transaction'],
  } as const satisfies MutationOptions<
    SendEip712TransactionData,
    SendEip712TransactionErrorType,
    SendEip712TransactionVariables<config, config['chains'][number]['id']>
  >
}

export type SendEip712TransactionData = Compute<SendEip712TransactionReturnType>

export type SendEip712TransactionVariables<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = SendEip712TransactionParameters<config, chainId>

export type SendEip712TransactionMutate<
  config extends Config,
  context = unknown,
> = <chainId extends config['chains'][number]['id']>(
  variables: SendEip712TransactionVariables<config, chainId>,
  options?:
    | Compute<
        MutateOptions<
          SendEip712TransactionData,
          SendEip712TransactionErrorType,
          Compute<SendEip712TransactionVariables<config, chainId>>,
          context
        >
      >
    | undefined,
) => void

export type SendEip712TransactionMutateAsync<
  config extends Config,
  context = unknown,
> = <chainId extends config['chains'][number]['id']>(
  variables: SendEip712TransactionVariables<config, chainId>,
  options?:
    | Compute<
        MutateOptions<
          SendEip712TransactionData,
          SendEip712TransactionErrorType,
          Compute<SendEip712TransactionVariables<config, chainId>>,
          context
        >
      >
    | undefined,
) => Promise<SendEip712TransactionData>
