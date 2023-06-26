import {
  type AbiFunction,
  type AbiParametersToPrimitiveTypes,
  type ExtractAbiFunction,
  type ExtractAbiFunctionNames,
} from 'abitype'
import { type Abi, type Address } from 'viem'

import { type Config } from '../config.js'
import type { MutationOptions } from '../query/types.js'
import type {
  Evaluate,
  ExactPartial,
  PartialBy,
  ReadonlyWiden,
} from '../types/utils.js'

export type WriteContractParameters<
  config extends Config = Config,
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends string = abi extends Abi
    ? ExtractAbiFunctionNames<abi, 'nonpayable' | 'payable'>
    : string,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  functionNames extends string = abi extends Abi
    ? ExtractAbiFunctionNames<abi, 'nonpayable' | 'payable'>
    : string,
  abiFunction extends AbiFunction = abi extends Abi
    ? ExtractAbiFunction<abi, functionName>
    : AbiFunction,
  primitiveTypes = AbiParametersToPrimitiveTypes<
    abiFunction['inputs'],
    'inputs'
  >,
> = Evaluate<
  {
    abi: abi
    address: Address
    chainId?: chainId | config['chains'][number]['id'] | undefined
    functionName:
      | functionName // infer value (if valid)
      | functionNames // show all values
      | (Abi extends abi ? string : never) // fallback if `abi` is declared as `Abi`
  } & PartialBy<
    {
      args:
        | primitiveTypes // show all values
        | (Abi extends abi ? readonly unknown[] : never) // fallback if `abi` is declared as `Abi`
    },
    Abi extends abi
      ? 'args'
      : primitiveTypes extends readonly []
      ? 'args'
      : never
  > &
    Omit<
      PartialBy<{ value: bigint }, Abi extends abi ? 'value' : never>,
      abi extends Abi
        ? 'nonpayable' extends abiFunction['stateMutability']
          ? 'value'
          : never
        : never
    >
>
// TODO: Chain formatters

export type WriteContractReturnType = import('viem').WriteContractReturnType

/** https://wagmi.sh/core/actions/writeContract */
export declare function writeContract<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends string,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: WriteContractParameters<config, abi, functionName, chainId>,
): Promise<WriteContractReturnType>

///////////////////////////////////////////////////////////////////////////
// TanStack Query

export type WriteContractMutationOptions<
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
  abi?: abi | undefined
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
    : 'nonpayable' extends abiFunction['stateMutability']
    ? never
    : value | bigint | undefined
}

/** https://wagmi.sh/core/actions/writeContract#tanstack-query */
export function writeContractMutationOptions<
  config extends Config,
  const abi extends Abi | readonly unknown[] | undefined,
  functionName extends string | undefined,
  chainId extends config['chains'][number]['id'] | undefined,
  address extends Address | undefined,
  args,
  value extends bigint | undefined,
>(
  config: Config,
  parameters: WriteContractMutationOptions<
    config,
    abi,
    functionName,
    chainId,
    address,
    args,
    value
  >,
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
    WriteContractReturnType,
    WriteContractError,
    WriteContractParameters,
    WriteContractParameters
  >
}

export type WriteContractError =
  // base
  Error

export type WriteContractMutationVariables<
  config extends Config,
  abi extends Abi | readonly unknown[],
  functionName extends string,
  chainId extends config['chains'][number]['id'],
> =
  | ExactPartial<WriteContractParameters<config, abi, functionName, chainId>>
  | undefined

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
  omittedParameters extends string =
    | (abi extends Abi | readonly unknown[] ? 'abi' : never)
    | (address extends Address ? 'address' : never)
    | (args extends readonly unknown[] ? 'args' : never)
    | (functionName extends string ? 'functionName' : never)
    | (value extends bigint ? 'value' : never),
  returnType = mutateAsync extends true
    ? Promise<WriteContractReturnType>
    : void,
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
> = <
  const abi_2 extends Abi | readonly unknown[] | undefined = abi,
  functionName_2 extends string | undefined = functionName,
  chainId_2 extends config['chains'][number]['id'] | undefined = chainId,
>(
  variables: Variables<
    config,
    abi_2,
    functionName_2,
    chainId_2,
    omittedParameters
  >,
  options?: Options<config, abi_2, functionName_2, chainId_2, context>,
  hasRequiredParameters?: hasRequiredParameters,
) => returnType

type Variables<
  config extends Config,
  abi extends Abi | readonly unknown[] | undefined,
  functionName extends string | undefined,
  chainId extends config['chains'][number]['id'] | undefined,
  omittedParameters extends string,
> = Omit<
  WriteContractParameters<
    config,
    abi extends Abi | readonly unknown[] ? abi : Abi,
    functionName extends string ? functionName : string,
    chainId extends config['chains'][number]['id']
      ? chainId
      : config['chains'][number]['id']
  >,
  omittedParameters
>

type Options<
  config extends Config,
  abi extends Abi | readonly unknown[] | undefined,
  functionName extends string | undefined,
  chainId extends config['chains'][number]['id'] | undefined,
  context = unknown,
> = Evaluate<
  import('@tanstack/query-core').MutateOptions<
    WriteContractReturnType,
    WriteContractError,
    Evaluate<WriteContractParameters<config, abi, functionName, chainId>>,
    context
  >
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
