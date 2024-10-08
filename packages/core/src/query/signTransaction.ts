import type { MutateOptions, MutationOptions } from '@tanstack/query-core'

import {
  type SignTransactionErrorType,
  type SignTransactionParameters,
  type SignTransactionReturnType,
  signTransaction,
} from '../actions/signTransaction.js'
import type { Config } from '../createConfig.js'
import type { Compute } from '../types/utils.js'

export function signTransactionMutationOptions<config extends Config>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return signTransaction(config, variables)
    },
    mutationKey: ['signTransaction'],
  } as const satisfies MutationOptions<
    SignTransactionData,
    SignTransactionErrorType,
    SignTransactionVariables<config, config['chains'][number]['id']>
  >
}

export type SignTransactionData = SignTransactionReturnType

export type SignTransactionVariables<
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = SignTransactionParameters<config, chainId>

export type SignTransactionMutate<config extends Config, context = unknown> = <
  chainId extends config['chains'][number]['id'],
>(
  variables: SignTransactionVariables<config, chainId>,
  options?:
    | Compute<
        MutateOptions<
          SignTransactionData,
          SignTransactionErrorType,
          Compute<SignTransactionVariables<config, chainId>>,
          context
        >
      >
    | undefined,
) => void

export type SignTransactionMutateAsync<
  config extends Config,
  context = unknown,
> = <chainId extends config['chains'][number]['id']>(
  variables: SignTransactionVariables<config, chainId>,
  options?:
    | Compute<
        MutateOptions<
          SignTransactionData,
          SignTransactionErrorType,
          Compute<SignTransactionVariables<config, chainId>>,
          context
        >
      >
    | undefined,
) => Promise<SignTransactionData>
