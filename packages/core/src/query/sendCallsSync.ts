import type { MutateOptions, MutationOptions } from '@tanstack/query-core'
import {
  type SendCallsSyncErrorType,
  type SendCallsSyncParameters,
  type SendCallsSyncReturnType,
  sendCallsSync,
} from '../actions/sendCallsSync.js'
import type { Config } from '../createConfig.js'
import type { MutationParameter } from '../types/query.js'
import type { Compute } from '../types/utils.js'

export type SendCallsSyncOptions<
  config extends Config,
  context = unknown,
> = MutationParameter<
  SendCallsSyncData,
  SendCallsSyncErrorType,
  SendCallsSyncVariables<config, config['chains'][number]['id']>,
  context
>

export function sendCallsSyncMutationOptions<config extends Config, context>(
  config: config,
  options: SendCallsSyncOptions<config, context> = {},
): SendCallsSyncMutationOptions<config> {
  return {
    ...(options.mutation as any),
    mutationFn(variables) {
      return sendCallsSync(config, variables)
    },
    mutationKey: ['sendCallsSync'],
  }
}

export type SendCallsSyncMutationOptions<config extends Config> =
  MutationOptions<
    SendCallsSyncData,
    SendCallsSyncErrorType,
    SendCallsSyncVariables<config, config['chains'][number]['id']>
  >

export type SendCallsSyncData = Compute<SendCallsSyncReturnType>

export type SendCallsSyncVariables<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  calls extends readonly unknown[] = readonly unknown[],
> = SendCallsSyncParameters<config, chainId, calls>

export type SendCallsSyncMutate<config extends Config, context = unknown> = <
  const calls extends readonly unknown[],
  chainId extends config['chains'][number]['id'],
>(
  variables: SendCallsSyncVariables<config, chainId, calls>,
  options?:
    | Compute<
        MutateOptions<
          SendCallsSyncData,
          SendCallsSyncErrorType,
          Compute<SendCallsSyncVariables<config, chainId, calls>>,
          context
        >
      >
    | undefined,
) => void

export type SendCallsSyncMutateAsync<
  config extends Config,
  context = unknown,
> = <
  const calls extends readonly unknown[],
  chainId extends config['chains'][number]['id'],
>(
  variables: SendCallsSyncVariables<config, chainId, calls>,
  options?:
    | Compute<
        MutateOptions<
          SendCallsSyncData,
          SendCallsSyncErrorType,
          Compute<SendCallsSyncVariables<config, chainId, calls>>,
          context
        >
      >
    | undefined,
) => Promise<SendCallsSyncData>
