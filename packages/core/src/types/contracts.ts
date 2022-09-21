import {
  Abi,
  AbiFunction,
  AbiParameter,
  AbiParameterToPrimitiveType,
  AbiParametersToPrimitiveTypes,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from 'abitype'

import { IsNever, NotEqual, Or } from './utils'

export type GetArgs<
  TAbi extends Abi | readonly unknown[],
  TFunction extends AbiFunction & { type: 'function' },
> = TFunction['inputs'] extends infer TInputs extends readonly AbiParameter[]
  ? Or<IsNever<TInputs>, NotEqual<TAbi, Abi>> extends true
    ? {
        /**
         * Arguments to pass contract method
         *
         * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link contractInterface} for type inference.
         */
        args?: readonly any[]
      }
    : TInputs['length'] extends 0
    ? { args?: never }
    : AbiParametersToPrimitiveTypes<TInputs> extends infer TArgs
    ? readonly unknown[] extends TArgs
      ? {
          /** Arguments to pass contract method */
          args?: readonly any[]
        }
      : {
          /** Arguments to pass contract method */
          args: TArgs
        }
    : never
  : never

export interface ContractConfigExtended {
  [key: string]: unknown
}
export type ContractConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TFunction extends AbiFunction & { type: 'function' } = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : never,
> = {
  /** Contract address */
  addressOrName: string
  /** Contract ABI */
  contractInterface: TAbi
  /** Function to invoke on the contract */
  functionName: IsNever<TFunctionName> extends true ? string : TFunctionName
} & GetArgs<TAbi, TFunction> &
  ContractConfigExtended

export type GetReadParameters<T> = T extends {
  contractInterface: infer TAbi extends Abi
  functionName: infer TFunctionName extends string
}
  ? ContractConfig<
      TAbi,
      ExtractAbiFunctionNames<TAbi, 'view' | 'pure'>,
      ExtractAbiFunction<TAbi, TFunctionName>
    >
  : T extends {
      contractInterface: infer TAbi extends readonly unknown[]
      functionName: infer TFunctionName extends string
    }
  ? ContractConfig<TAbi, TFunctionName>
  : ContractConfig

export type GetWriteParameters<T> = T extends {
  contractInterface: infer TAbi extends Abi
  functionName: infer TFunctionName extends string
}
  ? ContractConfig<
      TAbi,
      ExtractAbiFunctionNames<TAbi, 'nonpayable' | 'payable'>,
      ExtractAbiFunction<TAbi, TFunctionName>
    >
  : T extends {
      contractInterface: infer TAbi extends readonly unknown[]
      functionName: infer TFunctionName extends string
    }
  ? ContractConfig<TAbi, TFunctionName>
  : ContractConfig

////////////////////////////////////////////////////////////////////////////////////////////////////

type GetResult<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TFunction extends AbiFunction & { type: 'function' } = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : never,
> = TFunction['outputs'] extends infer TOutputs extends readonly AbiParameter[]
  ? Or<IsNever<TOutputs>, NotEqual<TAbi, Abi>> extends true
    ? any
    : TOutputs['length'] extends infer TLength
    ? TLength extends 0
      ? void
      : TLength extends 1
      ? AbiParameterToPrimitiveType<TOutputs[0]>
      : // eslint-disable-next-line @typescript-eslint/no-unused-vars
      TOutputs extends readonly [...infer _]
      ? {
          [Output in TOutputs[number] as Output['name'] extends ''
            ? never
            : Output['name']]: AbiParameterToPrimitiveType<Output>
        } & AbiParametersToPrimitiveTypes<TOutputs>
      : any
    : never
  : never

export type GetReturnType<T> = T extends {
  contractInterface: infer TAbi extends Abi
  functionName: infer TFunctionName extends string
}
  ? GetResult<TAbi, TFunctionName, ExtractAbiFunction<TAbi, TFunctionName>>
  : T extends {
      contractInterface: infer TAbi extends readonly unknown[]
      functionName: infer TFunctionName extends string
    }
  ? GetResult<TAbi, TFunctionName>
  : GetResult

////////////////////////////////////////////////////////////////////////////////////////////////////

export type MAXIMUM_DEPTH = 20

export type ContractsConfig<
  TContracts extends unknown[],
  Result extends any[] = [],
  Depth extends ReadonlyArray<number> = [],
> = Depth['length'] extends MAXIMUM_DEPTH
  ? ContractConfig[]
  : TContracts extends []
  ? []
  : TContracts extends [infer Head]
  ? [...Result, GetReadParameters<Head>]
  : TContracts extends [infer Head, ...infer Tail]
  ? ContractsConfig<
      [...Tail],
      [...Result, GetReadParameters<Head>],
      [...Depth, 1]
    >
  : unknown[] extends TContracts
  ? TContracts
  : TContracts extends ContractConfig<infer TAbi, infer TFunctionName>[]
  ? ContractConfig<TAbi, TFunctionName>[]
  : ContractConfig[]

export type ContractsResult<
  TContracts extends unknown[],
  Result extends any[] = [],
  Depth extends ReadonlyArray<number> = [],
> = Depth['length'] extends MAXIMUM_DEPTH
  ? any[]
  : TContracts extends []
  ? []
  : TContracts extends [infer Head]
  ? [...Result, GetReturnType<Head>]
  : TContracts extends [infer Head, ...infer Tail]
  ? ContractsResult<[...Tail], [...Result, GetReturnType<Head>], [...Depth, 1]>
  : TContracts extends ContractConfig<infer TAbi, infer TFunctionName>[]
  ? GetReturnType<{ contractInterface: TAbi; functionName: TFunctionName }>[]
  : any[]
