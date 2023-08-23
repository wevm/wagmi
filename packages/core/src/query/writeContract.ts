import type { MutateOptions, MutationOptions } from '@tanstack/query-core'
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'

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
    WriteContractVariables<
      Abi,
      string,
      readonly unknown[],
      config,
      config['chains'][number]['id']
    >
  >
}

export type WriteContractData = Evaluate<WriteContractReturnType>

export type WriteContractVariables<
  abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  config extends Config,
  chainId extends config['chains'][number]['id'],
> = WriteContractParameters<abi, functionName, args, config, chainId>

export type WriteContractMutate<config extends Config, context = unknown> = <
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  chainId extends config['chains'][number]['id'],
>(
  variables: WriteContractVariables<abi, functionName, args, config, chainId>,
  options?:
    | MutateOptions<
        WriteContractData,
        WriteContractError,
        WriteContractVariables<abi, functionName, args, config, chainId>,
        context
      >
    | undefined,
) => void

export type WriteContractMutateAsync<
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
  variables: WriteContractVariables<abi, functionName, args, config, chainId>,
  options?:
    | MutateOptions<
        WriteContractData,
        WriteContractError,
        WriteContractVariables<abi, functionName, args, config, chainId>,
        context
      >
    | undefined,
) => Promise<WriteContractData>
