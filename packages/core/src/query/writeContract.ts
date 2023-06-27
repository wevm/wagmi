import {
  type AbiFunction,
  type AbiParametersToPrimitiveTypes,
  type ExtractAbiFunction,
  type ExtractAbiFunctionNames,
} from 'abitype'
import { type Abi, type Address } from 'viem'

import {
  type WriteContractError,
  type WriteContractParameters,
  type WriteContractReturnType,
  writeContract,
} from '../actions/writeContract.js'
import { type Config } from '../config.js'
import type {
  Evaluate,
  IsUnion,
  PartialByKeys,
  ReadonlyWiden,
} from '../types/utils.js'
import type { MutationOptions } from './types.js'

export type WriteContractOptions<
  config extends Config,
  abi extends Abi | readonly unknown[] | undefined,
  functionName extends string | undefined,
  chainId extends config['chains'][number]['id'] | undefined,
  address extends Address | undefined,
  args,
  value extends bigint | undefined,
  ///
  functionNames extends string = abi extends Abi
    ? ExtractAbiFunctionNames<abi, 'nonpayable' | 'payable'>
    : string,
  abiFunction extends AbiFunction = abi extends Abi
    ? functionName extends string
      ? ExtractAbiFunction<abi, functionName>
      : AbiFunction
    : AbiFunction,
  primitiveTypes = AbiParametersToPrimitiveTypes<
    abiFunction['inputs'],
    'inputs'
  >,
> = {
  abi?: abi | Abi | readonly unknown[] | undefined
  address?: address | Address | undefined
  args?:
    | (functionName extends functionNames ? ReadonlyWiden<args> : never)
    | primitiveTypes // show all values
    | (Abi extends abi ? readonly unknown[] : never) // fallback if `abi` is declared as `Abi`
    | undefined
  chainId?: chainId | config['chains'][number]['id'] | undefined
  functionName?:
    | functionName // infer value (if valid)
    | functionNames // show all values
    | (Abi extends abi ? string : never) // fallback if `abi` is declared as `Abi`
    | undefined
  value?: AbiFunction extends abiFunction
    ? value | bigint | undefined
    : IsUnion<abiFunction> extends true
    ? 'nonpayable' | 'payable' extends abiFunction['stateMutability']
      ? value | bigint | undefined
      : never
    : 'payable' extends abiFunction['stateMutability']
    ? value | bigint | undefined
    : never
}

export function writeContractMutationOptions<
  config extends Config,
  const abi extends Abi | readonly unknown[] | undefined,
  functionName extends string | undefined,
  chainId extends config['chains'][number]['id'] | undefined,
  address extends Address | undefined,
  args,
  value extends bigint | undefined,
>(
  config: config,
  parameters: WriteContractOptions<
    config,
    abi,
    functionName,
    chainId,
    address,
    args,
    value
  > = {},
) {
  return {
    getVariables(variables) {
      const params = parameters as WriteContractParameters
      const args = variables?.args ?? params.args
      const value = variables?.value ?? params.value
      return {
        abi: (variables?.abi ?? params.abi)!,
        address: (variables?.address ?? params.address)!,
        args,
        chainId: variables?.chainId ?? params.chainId,
        functionName: (variables?.functionName ?? params.functionName)!,
        value,
      }
    },
    mutationFn(variables) {
      return writeContract(config, variables)
    },
    mutationKey: ['writeContract', parameters],
  } as const satisfies MutationOptions<
    WriteContractData,
    WriteContractError,
    WriteContractParameters,
    WriteContractParameters
  >
}

export type WriteContractData = WriteContractReturnType

export type WriteContractVariables<
  config extends Config,
  abi extends Abi | readonly unknown[] | undefined,
  functionName extends string | undefined,
  chainId extends config['chains'][number]['id'] | undefined,
  partialParameters extends
    | 'abi'
    | 'address'
    | 'args'
    | 'functionName'
    | 'value',
> = PartialByKeys<
  WriteContractParameters<
    config,
    abi extends Abi | readonly unknown[] ? abi : Abi,
    functionName extends string ? functionName : string,
    chainId extends config['chains'][number]['id']
      ? chainId
      : config['chains'][number]['id']
  >,
  partialParameters
>

export type WriteContractMutate<
  config extends Config,
  abi extends Abi | readonly unknown[] | undefined,
  functionName extends string | undefined,
  chainId extends config['chains'][number]['id'] | undefined,
  address extends Address | undefined,
  args,
  value extends bigint | undefined,
  context = unknown,
> = MutateFn<
  false,
  config,
  abi,
  functionName,
  chainId,
  address,
  args,
  value,
  context
>

export type WriteContractMutateAsync<
  config extends Config,
  abi extends Abi | readonly unknown[] | undefined,
  functionName extends string | undefined,
  chainId extends config['chains'][number]['id'] | undefined,
  address extends Address | undefined,
  args,
  value extends bigint | undefined,
  context = unknown,
> = MutateFn<
  true,
  config,
  abi,
  functionName,
  chainId,
  address,
  args,
  value,
  context
>

type MutateFn<
  mutateAsync extends boolean,
  config extends Config,
  abi extends Abi | readonly unknown[] | undefined,
  functionName extends string | undefined,
  chainId extends config['chains'][number]['id'] | undefined,
  address extends Address | undefined,
  args,
  value extends bigint | undefined,
  context = unknown,
  ///
  returnType = mutateAsync extends true ? Promise<WriteContractData> : void,
  abiFunction extends AbiFunction = abi extends Abi
    ? functionName extends string
      ? ExtractAbiFunction<abi, functionName>
      : AbiFunction
    : AbiFunction,
  hasRequiredParameters = Abi extends abi
    ? true
    : abi extends Abi | readonly unknown[]
    ? address extends Address
      ? functionName extends string
        ? args extends { length: infer length }
          ? length extends abiFunction['inputs']['length']
            ? true
            : false
          : false // TODO: args is undefined + payable value
        : false
      : false
    : false,
> = hasRequiredParameters extends true
  ? <
      const abi_2 extends Abi | readonly unknown[] | undefined = abi,
      functionName_2 extends string | undefined = functionName,
      chainId_2 extends config['chains'][number]['id'] | undefined = chainId,
    >(
      variables?: WriteContractVariables<
        config,
        abi_2,
        functionName_2,
        chainId_2,
        | (abi extends Abi | readonly unknown[] ? 'abi' : never)
        | (address extends Address ? 'address' : never)
        | (args extends readonly unknown[] ? 'args' : never)
        | (functionName extends string ? 'functionName' : never)
        | (value extends bigint ? 'value' : never)
      >,
      options?: Options<config, abi_2, functionName_2, chainId_2, context>,
    ) => returnType
  : <
      const abi_2 extends Abi | readonly unknown[] | undefined = abi,
      functionName_2 extends string | undefined = functionName,
      chainId_2 extends config['chains'][number]['id'] | undefined = chainId,
    >(
      variables: WriteContractVariables<
        config,
        abi_2,
        functionName_2,
        chainId_2,
        | (abi extends Abi | readonly unknown[] ? 'abi' : never)
        | (address extends Address ? 'address' : never)
        | (args extends readonly unknown[] ? 'args' : never)
        | (functionName extends string ? 'functionName' : never)
        | (value extends bigint ? 'value' : never)
      >,
      options?: Options<config, abi_2, functionName_2, chainId_2, context>,
    ) => returnType

type Options<
  config extends Config,
  abi extends Abi | readonly unknown[] | undefined,
  functionName extends string | undefined,
  chainId extends config['chains'][number]['id'] | undefined,
  context = unknown,
> = Evaluate<
  import('@tanstack/query-core').MutateOptions<
    WriteContractData,
    WriteContractError,
    Evaluate<WriteContractParameters<config, abi, functionName, chainId>>,
    context
  >
>
