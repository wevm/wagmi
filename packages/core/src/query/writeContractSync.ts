import type { MutateOptions, MutationOptions } from '@tanstack/query-core'
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'
import {
  type WriteContractSyncErrorType,
  type WriteContractSyncParameters,
  type WriteContractSyncReturnType,
  writeContractSync,
} from '../actions/writeContractSync.js'
import type { Config } from '../createConfig.js'
import type { MutationParameter } from '../types/query.js'
import type { Compute } from '../types/utils.js'

export type WriteContractSyncOptions<
  config extends Config,
  context = unknown,
> = MutationParameter<
  WriteContractSyncData,
  WriteContractSyncErrorType,
  WriteContractSyncVariables<
    Abi,
    string,
    readonly unknown[],
    config,
    config['chains'][number]['id']
  >,
  context
>

export function writeContractSyncMutationOptions<
  config extends Config,
  context,
>(
  config: config,
  options: WriteContractSyncOptions<config, context> = {},
): WriteContractSyncMutationOptions<config> {
  return {
    ...(options.mutation as any),
    mutationFn(variables) {
      return writeContractSync(config, variables)
    },
    mutationKey: ['writeContractSync'],
  }
}

export type WriteContractSyncMutationOptions<config extends Config> =
  MutationOptions<
    WriteContractSyncData,
    WriteContractSyncErrorType,
    WriteContractSyncVariables<
      Abi,
      string,
      readonly unknown[],
      config,
      config['chains'][number]['id']
    >
  >

export type WriteContractSyncData = Compute<WriteContractSyncReturnType>

export type WriteContractSyncVariables<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = WriteContractSyncParameters<abi, functionName, args, config, chainId>

export type WriteContractSyncMutate<
  config extends Config,
  context = unknown,
> = <
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  chainId extends config['chains'][number]['id'],
>(
  variables: WriteContractSyncVariables<
    abi,
    functionName,
    args,
    config,
    chainId
  >,
  options?:
    | MutateOptions<
        WriteContractSyncData,
        WriteContractSyncErrorType,
        WriteContractSyncVariables<abi, functionName, args, config, chainId>,
        context
      >
    | undefined,
) => void

export type WriteContractSyncMutateAsync<
  config extends Config,
  context = unknown,
> = <
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  chainId extends config['chains'][number]['id'],
>(
  variables: WriteContractSyncVariables<
    abi,
    functionName,
    args,
    config,
    chainId
  >,
  options?:
    | MutateOptions<
        WriteContractSyncData,
        WriteContractSyncErrorType,
        WriteContractSyncVariables<abi, functionName, args, config, chainId>,
        context
      >
    | undefined,
) => Promise<WriteContractSyncData>
