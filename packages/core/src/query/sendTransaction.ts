import type { Address } from 'viem'

import {
  type SendTransactionError,
  type SendTransactionParameters,
  type SendTransactionReturnType,
  sendTransaction,
} from '../actions/sendTransaction.js'
import { type Config } from '../config.js'
import type { ChainId } from '../types/properties.js'
import type { Evaluate, ExactPartial, PartialBy } from '../types/utils.js'
import { mergeWithOutUndefined } from '../utils/mergeWithOutUndefined.js'
import type { Mutate, MutateAsync, MutationOptions } from './types.js'

export type SendTransactionOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  to extends Address | undefined,
> = ExactPartial<
  SendTransactionParameters<
    config,
    // only pass through generic slot if `chainId` is inferrable from config
    number extends config['chains'][number]['id'] ? undefined : chainId
  >
> &
  Evaluate<ChainId<config, chainId>> & {
    to?: to | Address | undefined
  }

export function sendTransactionMutationOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  to extends Address | undefined,
>(config: config, options: SendTransactionOptions<config, chainId, to> = {}) {
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
    SendTransactionVariables<config, chainId, undefined>,
    SendTransactionParameters<config, chainId>
  >
}

export type SendTransactionData = Evaluate<SendTransactionReturnType>

export type SendTransactionVariables<
  config extends Config,
  chainId extends number | undefined,
  to extends Address | undefined,
> =
  | Evaluate<
      PartialBy<
        Evaluate<Omit<SendTransactionParameters<config, chainId>, 'mode'>>,
        to extends Address ? 'to' : never
      >
    >
  | (to extends Address ? undefined : never)

export type SendTransactionMutate<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  to extends Address | undefined,
  context = unknown,
> = Mutate<
  SendTransactionData,
  SendTransactionError,
  SendTransactionVariables<config, chainId, undefined>,
  context,
  SendTransactionVariables<config, chainId, to>
>

export type SendTransactionMutateAsync<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  to extends Address | undefined,
  context = unknown,
> = MutateAsync<
  SendTransactionData,
  SendTransactionError,
  SendTransactionVariables<config, chainId, undefined>,
  context,
  SendTransactionVariables<config, chainId, to>
>
