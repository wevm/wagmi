import {
  type AbiFunction,
  type AbiParametersToPrimitiveTypes,
  type ExtractAbiFunction,
  type ExtractAbiFunctionNames,
} from 'abitype'
import { type Abi, type Address } from 'viem'

import { type Config } from '../config.js'
import type { Evaluate, IsUnion, OmitKeys, PartialBy } from '../types/utils.js'

// TODO: Chain formatters
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
    OmitKeys<
      PartialBy<
        { value: bigint },
        Abi extends abi
          ? 'value'
          : IsUnion<abiFunction> extends true
          ? 'nonpayable' | 'payable' extends abiFunction['stateMutability']
            ? 'value'
            : never
          : never
      >,
      Abi extends abi
        ? never
        : abiFunction['stateMutability'] extends 'nonpayable'
        ? 'value'
        : never
    >
>

export type WriteContractReturnType = import('viem').WriteContractReturnType

export type WriteContractError =
  // base
  Error

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
