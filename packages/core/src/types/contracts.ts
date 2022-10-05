import {
  Abi,
  AbiFunction,
  AbiParameter,
  AbiParameterToPrimitiveType,
  AbiParametersToPrimitiveTypes,
  AbiStateMutability,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from 'abitype'

import { IsNever, NotEqual, Or } from './utils'

////////////////////////////////////////////////////////////////////////////////////////////////////
// Contract Configuration Types

export type Options = {
  /** Flag for making `abi` optional */
  isAbiOptional?: boolean
  /** Flag for making `address` optional */
  isAddressOptional?: boolean
  /** Flag for making `args` optional */
  isArgsOptional?: boolean
  /** Flag for making `functionName` optional */
  isFunctionNameOptional?: boolean
}
export type DefaultOptions = {
  isAbiOptional: false
  isAddressOptional: false
  isArgsOptional: false
  isFunctionNameOptional: false
}

type GetArgs<
  TAbi extends Abi | readonly unknown[],
  // It's important that we use `TFunction` to parse args so overloads still return the correct types
  TFunction extends AbiFunction & { type: 'function' },
  TOptions extends Options = DefaultOptions,
> = TFunction['inputs'] extends infer TInputs extends readonly AbiParameter[]
  ? // Check if valid ABI. If `TInputs` is `never` or `TAbi` does not have the same shape as `Abi`, then return optional `readonly unknown[]` args.
    Or<IsNever<TInputs>, NotEqual<TAbi, Abi>> extends true
    ? {
        /**
         * Arguments to pass contract method
         *
         * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link abi} for type inference.
         */
        args?: readonly unknown[]
      }
    : // If there are no inputs, do not include `args` in the return type.
    TInputs['length'] extends 0
    ? { args?: never }
    : AbiParametersToPrimitiveTypes<TInputs> extends infer TArgs
    ? TOptions['isArgsOptional'] extends true
      ? {
          /** Arguments to pass contract method */
          args?: TArgs
        }
      : {
          /** Arguments to pass contract method */
          args: TArgs
        }
    : never
  : never

export type ContractConfig<
  TContract = { [key: string]: unknown },
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TFunction extends AbiFunction & { type: 'function' } = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : never,
  TOptions extends Options = DefaultOptions,
> = (TOptions['isAbiOptional'] extends true
  ? {
      /** Contract ABI */
      abi?: TAbi
    }
  : {
      /** Contract ABI */
      abi: TAbi
    }) &
  (TOptions['isAddressOptional'] extends true
    ? {
        /** Contract address */
        address?: string
      }
    : {
        /** Contract address */
        address: string
      }) &
  (TOptions['isFunctionNameOptional'] extends true
    ? {
        /** Function to invoke on the contract */
        // If `TFunctionName` is `never`, then ABI was not parsable. Fall back to `string`.
        functionName?: IsNever<TFunctionName> extends true
          ? string
          : TFunctionName
      }
    : {
        /** Function to invoke on the contract */
        // If `TFunctionName` is `never`, then ABI was not parsable. Fall back to `string`.
        functionName: IsNever<TFunctionName> extends true
          ? string
          : TFunctionName
      }) &
  GetArgs<TAbi, TFunction, TOptions> &
  TContract

// Properties to remove from extended config since they are added by default with `ContractConfig`
type OmitConfigProperties = 'abi' | 'args' | 'functionName'
export type GetConfig<
  TContract = unknown,
  TAbiStateMutibility extends AbiStateMutability = AbiStateMutability,
  TOptions extends Options = DefaultOptions,
> = TContract extends {
  abi: infer TAbi extends Abi
  functionName: infer TFunctionName extends string
}
  ? ContractConfig<
      Omit<TContract, OmitConfigProperties>,
      TAbi,
      ExtractAbiFunctionNames<TAbi, TAbiStateMutibility>,
      ExtractAbiFunction<TAbi, TFunctionName>,
      TOptions
    >
  : TContract extends {
      abi: infer TAbi extends readonly unknown[]
      functionName: infer TFunctionName extends string
    }
  ? ContractConfig<
      Omit<TContract, OmitConfigProperties>,
      TAbi,
      TFunctionName,
      never,
      TOptions
    >
  : ContractConfig<
      Omit<TContract, OmitConfigProperties>,
      Abi | readonly unknown[],
      string,
      never,
      TOptions
    >

////////////////////////////////////////////////////////////////////////////////////////////////////
// Contract Result Types

export type GetResult<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TFunction extends AbiFunction & { type: 'function' } = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : never,
> =
  // Save `TOutputs` to local variable
  TFunction['outputs'] extends infer TOutputs extends readonly AbiParameter[]
    ? // Check if valid ABI. If `TOutputs` is `never` or `TAbi` does not have the same shape as `Abi`, then return `unknown` as result.
      Or<IsNever<TOutputs>, NotEqual<TAbi, Abi>> extends true
      ? unknown
      : // Save `TLength` to local variable for comparisons
      TOutputs['length'] extends infer TLength
      ? TLength extends 0
        ? void // If there are no outputs, return `void`
        : TLength extends 1
        ? AbiParameterToPrimitiveType<TOutputs[0]> // If there is one output, return the primitive type
        : // If outputs are inferrable, must be a known type. Convert to TypeScript primitives.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        TOutputs extends readonly [...infer _]
        ? /**
           * Return output as array assigned to an object with named keys
           *
           * | Outputs                                                               | Result                                                     |
           * | --------------------------------------------------------------------- | ---------------------------------------------------------- |
           * | `[{ name: 'foo', type: 'uint256' }, { name: 'bar', type: 'string' }]` | `readonly [bigint, string] & { foo: bigint; bar: string }` |
           * | `[{ name: 'foo', type: 'uint256' }, { name: '', type: 'string' }]`    | `readonly [bigint, string] & { foo: bigint }`              |
           */
          {
            [Output in TOutputs[number] as Output['name'] extends ''
              ? never
              : Output['name']]: AbiParameterToPrimitiveType<Output>
          } & AbiParametersToPrimitiveTypes<TOutputs>
        : unknown
      : never
    : never

export type GetReturnType<TContract = unknown> = TContract extends {
  abi: infer TAbi extends Abi
  functionName: infer TFunctionName extends string
}
  ? GetResult<TAbi, TFunctionName, ExtractAbiFunction<TAbi, TFunctionName>>
  : TContract extends {
      abi: infer TAbi extends readonly unknown[]
      functionName: infer TFunctionName extends string
    }
  ? GetResult<TAbi, TFunctionName>
  : GetResult

////////////////////////////////////////////////////////////////////////////////////////////////////
// Contract List Types

// Avoid TS depth-limit error in case of large array literal
type MAXIMUM_DEPTH = 20

/**
 * ContractsConfig reducer recursively unwraps function arguments to infer/enforce type param
 */
export type ContractsConfig<
  TContracts extends unknown[],
  TContractProperties extends { [key: string]: unknown } = {
    [key: string]: unknown
  },
  TOptions extends Options = DefaultOptions,
  Result extends any[] = [],
  Depth extends ReadonlyArray<number> = [],
> = Depth['length'] extends MAXIMUM_DEPTH
  ? GetConfig<TContractProperties, 'pure' | 'view', TOptions>[]
  : TContracts extends []
  ? []
  : TContracts extends [infer Head]
  ? [
      ...Result,
      GetConfig<Head & TContractProperties, 'pure' | 'view', TOptions>,
    ]
  : TContracts extends [infer Head, ...infer Tail]
  ? ContractsConfig<
      [...Tail],
      TContractProperties,
      TOptions,
      [
        ...Result,
        GetConfig<Head & TContractProperties, 'pure' | 'view', TOptions>,
      ],
      [...Depth, 1]
    >
  : unknown[] extends TContracts
  ? TContracts
  : // If `TContracts` is *some* array but we couldn't assign `unknown[]` to it, then it must hold some known/homogenous type!
  // use this to infer the param types in the case of Array.map() argument
  TContracts extends ContractConfig<
      infer TContract,
      infer TAbi,
      infer TFunctionName,
      infer TFunction
    >[]
  ? ContractConfig<
      Omit<TContract & TContractProperties, OmitConfigProperties>,
      TAbi,
      TFunctionName,
      TFunction,
      TOptions
    >[]
  : GetConfig<TContractProperties, 'pure' | 'view', TOptions>[]

/**
 * ContractsResult reducer recursively maps type param to results
 */
export type ContractsResult<
  TContracts extends unknown[],
  Result extends any[] = [],
  Depth extends ReadonlyArray<number> = [],
> = Depth['length'] extends MAXIMUM_DEPTH
  ? GetReturnType[]
  : TContracts extends []
  ? []
  : TContracts extends [infer Head]
  ? [...Result, GetReturnType<Head>]
  : TContracts extends [infer Head, ...infer Tail]
  ? ContractsResult<[...Tail], [...Result, GetReturnType<Head>], [...Depth, 1]>
  : TContracts extends ContractConfig<
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      infer _TContract,
      infer TAbi,
      infer TFunctionName
    >[]
  ? // Dynamic-size (homogenous) UseQueryOptions array: map directly to array of results
    GetReturnType<{ abi: TAbi; functionName: TFunctionName }>[]
  : GetReturnType[]
