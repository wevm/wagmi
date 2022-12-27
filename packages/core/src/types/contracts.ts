import type {
  Abi,
  AbiEvent,
  AbiFunction,
  AbiParameter,
  AbiParameterToPrimitiveType,
  AbiParametersToPrimitiveTypes,
  AbiStateMutability,
  Address,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
  Narrow,
  ResolvedConfig,
} from 'abitype'
import type { ethers } from 'ethers'

import type { Join } from './utils'

export type Contract<
  TAbi extends Abi | readonly unknown[] = Abi | readonly unknown[],
  TFunctionName extends string = string,
> = { abi: TAbi; functionName: TFunctionName }

export type GetConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TAbiStateMutability extends AbiStateMutability = AbiStateMutability,
> = {
  /** Contract ABI */
  abi: Narrow<TAbi> // infer `TAbi` type for inline usage
  /** Contract address */
  address: Address
  /** Function to invoke on the contract */
  functionName: GetFunctionName<TAbi, TFunctionName, TAbiStateMutability>
} & GetArgs<TAbi, TFunctionName>

export type GetFunctionName<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TAbiStateMutability extends AbiStateMutability = AbiStateMutability,
> = TAbi extends Abi
  ? ExtractAbiFunctionNames<
      TAbi,
      TAbiStateMutability
    > extends infer AbiFunctionNames
    ?
        | AbiFunctionNames
        | (TFunctionName extends AbiFunctionNames ? TFunctionName : never)
        | (Abi extends TAbi ? string : never)
    : never
  : TFunctionName

export type GetArgs<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TAbiFunction extends AbiFunction & { type: 'function' } = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : AbiFunction & { type: 'function' },
  TArgs = AbiParametersToPrimitiveTypes<TAbiFunction['inputs']>,
  FailedToParseArgs =
    | ([TArgs] extends [never] ? true : false)
    | (readonly unknown[] extends TArgs ? true : false),
> = true extends FailedToParseArgs
  ? {
      /**
       * Arguments to pass contract method
       *
       * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link abi} for type inference.
       */
      args?: readonly unknown[]
    }
  : TArgs extends readonly []
  ? { args?: never }
  : {
      /** Arguments to pass contract method */ args: TArgs
    }

export type GetReturnType<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TAbiFunction extends AbiFunction & {
    type: 'function'
  } = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : AbiFunction & { type: 'function' },
  TArgs = AbiParametersToPrimitiveTypes<TAbiFunction['outputs']>,
  FailedToParseArgs =
    | ([TArgs] extends [never] ? true : false)
    | (readonly unknown[] extends TArgs ? true : false),
> = true extends FailedToParseArgs
  ? unknown
  : TArgs extends readonly []
  ? void
  : TArgs extends readonly [infer Arg]
  ? Arg
  : TArgs & {
      // Construct ethers hybrid array-objects for named outputs.
      [Output in TAbiFunction['outputs'][number] as Output extends {
        name: infer Name extends string
      }
        ? Name extends ''
          ? never
          : Name
        : never]: AbiParameterToPrimitiveType<Output>
    }

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
