import type { MutateOptions, MutationOptions } from '@tanstack/query-core'
import type { SignTransactionRequest as viem_SignTransactionRequest } from 'viem'
import {
  type SignTransactionErrorType,
  type SignTransactionParameters,
  type SignTransactionReturnType,
  signTransaction,
} from '../actions/signTransaction.js'
import type { Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type { MutationParameter } from '../types/query.js'
import type { Compute } from '../types/utils.js'

export type SignTransactionOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  request extends viem_SignTransactionRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
  context = unknown,
> = MutationParameter<
  SignTransactionData<config, chainId, request>,
  SignTransactionErrorType,
  SignTransactionVariables<config, chainId, request>,
  context
>

export function signTransactionMutationOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  request extends viem_SignTransactionRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
  context,
>(
  config: config,
  options: SignTransactionOptions<config, chainId, request, context> = {},
): SignTransactionMutationOptions<config, chainId, request> {
  return {
    ...(options.mutation as any),
    mutationFn(variables) {
      return signTransaction(config, variables as any)
    },
    mutationKey: ['signTransaction'],
  }
}

export type SignTransactionMutationOptions<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  request extends viem_SignTransactionRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
> = MutationOptions<
  SignTransactionData<config, chainId, request>,
  SignTransactionErrorType,
  SignTransactionVariables<config, chainId, request>
>

export type SignTransactionData<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  request extends viem_SignTransactionRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
  // > = Compute<SignTransactionReturnType<config, chainId, request>>
> = SignTransactionReturnType<config, chainId, request>

export type SignTransactionVariables<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  request extends viem_SignTransactionRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
> = SignTransactionParameters<config, chainId, request>

export type SignTransactionMutate<config extends Config, context = unknown> = <
  chainId extends config['chains'][number]['id'],
  const request extends viem_SignTransactionRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
>(
  variables: SignTransactionVariables<config, chainId, request> & request,
  options?:
    | Compute<
        MutateOptions<
          SignTransactionData<config, chainId, request>,
          SignTransactionErrorType,
          Compute<SignTransactionVariables<config, chainId, request>>,
          context
        >
      >
    | undefined,
) => void

export type SignTransactionMutateAsync<
  config extends Config,
  context = unknown,
> = <
  chainId extends config['chains'][number]['id'],
  const request extends viem_SignTransactionRequest<
    SelectChains<config, chainId>[0],
    SelectChains<config, chainId>[0]
  >,
>(
  variables: SignTransactionVariables<config, chainId, request> & request,
  options?:
    | Compute<
        MutateOptions<
          SignTransactionData<config, chainId, request>,
          SignTransactionErrorType,
          Compute<SignTransactionVariables<config, chainId, request>>,
          context
        >
      >
    | undefined,
) => Promise<SignTransactionData<config, chainId, request>>
