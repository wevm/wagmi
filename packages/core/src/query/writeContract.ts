import type { MutateOptions, MutationOptions } from '@tanstack/query-core'
import type { Abi, ContractFunctionArgs, ContractFunctionName } from 'viem'

import {
  type WriteContractErrorType,
  type WriteContractParameters,
  type WriteContractReturnType,
  writeContract,
} from '../actions/writeContract.js'
import type { Config } from '../createConfig.js'
import type { Compute } from '../types/utils.js'

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
    WriteContractErrorType,
    WriteContractVariables<
      Abi,
      ContractFunctionName<Abi, 'nonpayable' | 'payable'>,
      ContractFunctionArgs<
        Abi,
        'nonpayable' | 'payable',
        ContractFunctionName<Abi, 'nonpayable' | 'payable'>
      >,
      config,
      config['chains'][number]['id']
    >
  >
}

export type WriteContractData = Compute<WriteContractReturnType>

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
  ///
  allFunctionNames = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
> = WriteContractParameters<
  abi,
  functionName,
  args,
  config,
  chainId,
  allFunctionNames
>

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
        WriteContractErrorType,
        WriteContractVariables<
          abi,
          functionName,
          args,
          config,
          chainId,
          // use `functionName` to make sure it's not union of all possible function names
          functionName
        >,
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
        WriteContractErrorType,
        WriteContractVariables<
          abi,
          functionName,
          args,
          config,
          chainId,
          // use `functionName` to make sure it's not union of all possible function names
          functionName
        >,
        context
      >
    | undefined,
) => Promise<WriteContractData>
