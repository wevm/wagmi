import type { MutateOptions, MutationOptions } from '@tanstack/query-core'
import type { Abi } from 'viem'

import {
  type WriteContractError,
  type WriteContractParameters,
  type WriteContractReturnType,
  writeContract,
} from '../actions/writeContract.js'
import { type Config } from '../config.js'
import type { Evaluate } from '../types/utils.js'

export function writeContractMutationOptions<config extends Config>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return writeContract(config, variables)
    },
    mutationKey: ['writeContract'],
  } as const satisfies MutationOptions<
    WriteContractData,
    WriteContractError,
    WriteContractVariables<config, config['chains'][number]['id'], Abi, string>
  >
}

export type WriteContractData = Evaluate<WriteContractReturnType>

export type WriteContractVariables<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
  abi extends Abi | readonly unknown[],
  functionName extends string,
> = WriteContractParameters<config, chainId, abi, functionName>

export type WriteContractMutate<config extends Config, context = unknown> = <
  chainId extends config['chains'][number]['id'] | undefined,
  const abi extends Abi | readonly unknown[],
  functionName extends string,
>(
  variables: WriteContractVariables<
    config,
    number extends config['chains'][number]['id']
      ? config['chains'][number]['id']
      : chainId,
    abi,
    functionName
  >,
  options?: MutateOptions<
    WriteContractData,
    WriteContractError,
    WriteContractVariables<config, chainId, abi, functionName>,
    context
  >,
) => void

export type WriteContractMutateAsync<
  config extends Config,
  context = unknown,
> = <
  chainId extends config['chains'][number]['id'] | undefined,
  const abi extends Abi | readonly unknown[],
  functionName extends string,
>(
  variables: WriteContractVariables<
    config,
    number extends config['chains'][number]['id']
      ? config['chains'][number]['id']
      : chainId,
    abi,
    functionName
  >,
  options?: MutateOptions<
    WriteContractData,
    WriteContractError,
    WriteContractVariables<config, chainId, abi, functionName>,
    context
  >,
) => Promise<WriteContractData>
