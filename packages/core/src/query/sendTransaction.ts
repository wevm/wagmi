import {
  type SendTransactionError,
  type SendTransactionParameters,
  type SendTransactionReturnType,
  sendTransaction,
} from '../actions/sendTransaction.js'
import { type Config } from '../config.js'

import type { Evaluate, ExactPartial } from '../types/utils.js'
import { mergeWithOutUndefined } from '../utils/mergeWithOutUndefined.js'
import type { Mutate, MutateAsync, MutationOptions } from './types.js'

export type SendTransactionOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
> = Evaluate<ExactPartial<SendTransactionParameters<config, chainId>>>

export function sendTransactionMutationOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  config: config,
  options: SendTransactionOptions<config, chainId> = {} as any,
) {
  return {
    getVariables(variables) {
      return mergeWithOutUndefined(options, variables) as any
    },
    mutationFn(variables) {
      return sendTransaction(config, variables as any)
    },
    mutationKey: ['sendTransaction', options],
  } as const satisfies MutationOptions<
    SendTransactionData,
    SendTransactionError,
    SendTransactionVariables<config, chainId>,
    SendTransactionParameters<config, chainId>
  >
}

export type SendTransactionData = Evaluate<SendTransactionReturnType>

export type SendTransactionVariables<
  config extends Config,
  chainId extends number | undefined,
> = Evaluate<SendTransactionParameters<config, chainId>> | undefined

export type SendTransactionMutate<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  context = unknown,
> = Mutate<
  SendTransactionData,
  SendTransactionError,
  SendTransactionVariables<config, chainId>,
  context,
  SendTransactionVariables<config, chainId>
>

export type SendTransactionMutateAsync<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  context = unknown,
> = MutateAsync<
  SendTransactionData,
  SendTransactionError,
  SendTransactionVariables<config, chainId>,
  context,
  SendTransactionVariables<config, chainId>
>
