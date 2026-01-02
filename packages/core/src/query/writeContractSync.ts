import type { MutateOptions, MutationOptions } from '@tanstack/query-core'
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'

import {
  type WriteContractSyncErrorType,
  type WriteContractSyncParameters,
  type WriteContractSyncReturnType,
  writeContractSync,
} from '../actions/writeContractSync.js'
import type { Config } from '../createConfig.js'
import type { Compute } from '../types/utils.js'

export function writeContractSyncMutationOptions<config extends Config>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return writeContractSync(config, variables)
    },
    mutationKey: ['writeContractSync'],
  } as const satisfies MutationOptions<
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
}

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
