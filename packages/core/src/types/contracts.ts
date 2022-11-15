import type {
  Abi,
  AbiEvent,
  AbiFunction,
  AbiParameterToPrimitiveType,
  AbiParameter as AbiParameter_,
  AbiParametersToPrimitiveTypes,
  AbiStateMutability,
  Address,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
  Narrow,
  ResolvedConfig,
} from 'abitype'
import type { ethers } from 'ethers'

import type { IsNever, Join, NotEqual, Or } from './utils'

// TODO: Removed during build for some reason so proxying here
// and exporting from `src/internal.ts` for now
// https://github.com/wagmi-dev/wagmi/issues/1306
export type AbiParameter = AbiParameter_

////////////////////////////////////////////////////////////////////////////////////////////////////
// Contract Configuration Types

/**
 * Configuration options for contract types
 */
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
/**
 * Default {@link Options}
 */
export type DefaultOptions = {
  isAbiOptional: false
  isAddressOptional: false
  isArgsOptional: false
  isFunctionNameOptional: false
}

/**
 * Gets arguments of contract function
 *
 * @param TAbi - Contract {@link Abi}
 * @param TFunctionName - Name of contract function
 * @param TOptions - Options for configuring arguments. Defaults to {@link DefaultOptions}.
 * @returns Inferred args of contract function
 *
 * @example
 * type Result = GetArgs<[…], 'tokenURI'>
 */
export type GetArgs<
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

/**
 * Contract configuration object for inferring function name and arguments based on {@link TAbi}.
 */
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
      abi?: Narrow<TAbi>
    }
  : {
      /** Contract ABI */
      abi: Narrow<TAbi>
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
/**
 * Gets configuration type of contract function
 *
 * @param TContract - Contract config in `{ abi: Abi, functionName: string }` format
 * @param TAbiStateMutibility - State mutability of contract function
 * @param TOptions - Options for configuring arguments. Defaults to {@link DefaultOptions}.
 * @returns Inferred configuration type of contract function
 *
 * @example
 * type Result = GetConfig<{ abi: […], functionName: 'tokenURI' }, 'view'>
 */
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
      Abi,
      string,
      never,
      TOptions
    >

////////////////////////////////////////////////////////////////////////////////////////////////////
// Contract Result Types

/**
 * Unwraps return type of contract function
 *
 * @param TAbi - Contract {@link Abi}
 * @param TFunctionName - Name of contract function
 * @returns Inferred return type of contract function
 *
 * @example
 * type Result = GetResult<[…], 'tokenURI'>
 */
type GetResult<
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
            [Output in TOutputs[number] as Output extends { name: string }
              ? Output['name'] extends ''
                ? never
                : Output['name']
              : never]: AbiParameterToPrimitiveType<Output>
          } & AbiParametersToPrimitiveTypes<TOutputs>
        : unknown
      : never
    : never

/**
 * Gets return type of contract function
 *
 * @param TContract - Contract config in `{ abi: Abi, functionName: string }` format
 * @returns Inferred return type of contract function
 *
 * @example
 * type Result = GetReturnType<{ abi: […], functionName: 'tokenURI' }>
 */
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
 *
 * @param TContracts - Array of contracts in shape of {@link ContractConfig}
 * @returns Array of inferred contract configurations
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
 *
 * @param TContracts - Array of contracts in shape of {@link ContractConfig}
 * @returns Array of inferred contract results
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

////////////////////////////////////////////////////////////////////////////////////////////////////
// Utilities

/**
 * Get name for {@link AbiFunction} or {@link AbiEvent}
 *
 * @param TAbiItem - {@link AbiFunction} or {@link AbiEvent}
 * @param IsSignature - Whether to return the signature instead of the name
 * @returns Name or signature of function or event
 *
 * @example
 * type Result = AbiItemName<{ type: 'function'; name: 'Foo'; … }>
 */
export type AbiItemName<
  TAbiItem extends (AbiFunction & { type: 'function' }) | AbiEvent,
  IsSignature extends boolean = false,
> = IsSignature extends true
  ? TAbiItem['inputs'] extends infer TAbiParameters extends readonly AbiParameter[]
    ? `${TAbiItem['name']}(${Join<
        [...{ [K in keyof TAbiParameters]: TAbiParameters[K]['type'] }],
        ','
      >})`
    : never
  : TAbiItem['name']

/**
 * Get overrides for {@link AbiStateMutability}
 *
 * @param TAbiStateMutability - {@link AbiStateMutability}
 * @returns Overrides for {@link TAbiStateMutability}
 *
 * @example
 * type Result = GetOverridesForAbiStateMutability<'pure'>
 */
export type GetOverridesForAbiStateMutability<
  TAbiStateMutability extends AbiStateMutability,
> = {
  nonpayable: Overrides & { from?: Address }
  payable: PayableOverrides & { from?: Address }
  pure: CallOverrides
  view: CallOverrides
}[TAbiStateMutability]

// Update `ethers.Overrides` to use abitype config
export interface Overrides extends ethers.Overrides {
  gasLimit?: ResolvedConfig['BigIntType']
  gasPrice?: ResolvedConfig['BigIntType']
  maxFeePerGas?: ResolvedConfig['BigIntType']
  maxPriorityFeePerGas?: ResolvedConfig['BigIntType']
  nonce?: ResolvedConfig['IntType']
}

// Update `ethers.PayableOverrides` to use abitype config
export interface PayableOverrides extends Overrides {
  value?: ResolvedConfig['IntType'] | ResolvedConfig['BigIntType']
}

// Update `ethers.CallOverrides` to use abitype config
export interface CallOverrides extends PayableOverrides {
  blockTag?: ethers.CallOverrides['blockTag']
  from?: Address
}

// Add type inference to `ethers.Event`
export type Event<TAbiEvent extends AbiEvent> = Omit<
  ethers.Event,
  'args' | 'event' | 'eventSignature'
> & {
  args: AbiParametersToPrimitiveTypes<TAbiEvent['inputs']>
  event: TAbiEvent['name']
  eventSignature: AbiItemName<TAbiEvent, true>
}
