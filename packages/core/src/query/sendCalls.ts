import type { MutateOptions, MutationOptions } from '@tanstack/query-core'

import {
  type SendCallsErrorType,
  type SendCallsParameters,
  type SendCallsReturnType,
  sendCalls,
} from '../actions/sendCalls.js'
import type { Config } from '../createConfig.js'
import type { Compute } from '../types/utils.js'

export function sendCallsMutationOptions<config extends Config>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return sendCalls(config, variables)
    },
    mutationKey: ['sendCalls'],
  } as const satisfies MutationOptions<
    SendCallsData,
    SendCallsErrorType,
    SendCallsVariables<config, config['chains'][number]['id']>
  >
}

export type SendCallsData = Compute<SendCallsReturnType>

export type SendCallsVariables<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  calls extends readonly unknown[] = readonly unknown[],
> = SendCallsParameters<config, chainId, calls>

export type SendCallsMutate<config extends Config, context = unknown> = <
  const calls extends readonly unknown[],
  chainId extends config['chains'][number]['id'],
>(
  variables: SendCallsVariables<config, chainId, calls>,
  options?:
    | Compute<
        MutateOptions<
          SendCallsData,
          SendCallsErrorType,
          Compute<SendCallsVariables<config, chainId, calls>>,
          context
        >
      >
    | undefined,
) => void

export type SendCallsMutateAsync<config extends Config, context = unknown> = <
  const calls extends readonly unknown[],
  chainId extends config['chains'][number]['id'],
>(
  variables: SendCallsVariables<config, chainId, calls>,
  options?:
    | Compute<
        MutateOptions<
          SendCallsData,
          SendCallsErrorType,
          Compute<SendCallsVariables<config, chainId, calls>>,
          context
        >
      >
    | undefined,
) => Promise<SendCallsData>
