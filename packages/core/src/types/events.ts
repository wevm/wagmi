import {
  Abi,
  AbiEvent,
  AbiParameter,
  AbiParameterToPrimitiveType,
  AbiParametersToPrimitiveTypes,
  ExtractAbiEvent,
  ExtractAbiEventNames,
} from 'abitype'

import { Event } from 'ethers'

import { AbiEntityNotInferred, IsNever, Or } from './utils'

// Returns null for unindexed events, otherwise same as AbiParametersToPrimitiveTypes
type EventInputAbiParametersToPrimitiveTypes<
  TAbiParameters extends readonly (AbiParameter & { indexed?: boolean })[],
> = {
  [K in keyof TAbiParameters]: TAbiParameters[K] extends { indexed: false }
    ? null
    : AbiParameterToPrimitiveType<TAbiParameters[K]>
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Event Configuration Types

export type Options = {
  isAddressOptional?: boolean
  isArgsOptional?: boolean
  withListener?: boolean
}
export type DefaultOptions = {
  isAddressOptional: false
  isArgsOptional: true
  withListener: false
}

type PartialOrNull<T> = { [P in keyof T]?: T[P] | null | undefined }

type GetArgs<
  TAbi extends Abi | readonly unknown[],
  // It's important that we use `TEvent` to parse args so overloads still return the correct types
  TEvent extends AbiEvent,
  TOptions extends Options,
> = EventInputAbiParametersToPrimitiveTypes<
  TEvent['inputs']
> extends infer TArgs extends readonly unknown[]
  ? Or<
      AbiEntityNotInferred<TArgs, TAbi>,
      readonly unknown[] extends TArgs ? true : false
    > extends true
    ? {
        /**
         * Arguments to filter events
         *
         * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link contractInterface} for type inference.
         */
        args?: readonly any[]
      }
    : TOptions['isArgsOptional'] extends false
    ? {
        /** Arguments to filter events */
        args: PartialOrNull<TArgs>
      }
    : {
        /** Arguments to filter events */
        args?: PartialOrNull<TArgs>
      }
  : never

export type GetListener<
  TAbi extends Abi | readonly unknown[],
  TEvent extends AbiEvent,
> = AbiParametersToPrimitiveTypes<
  TEvent['inputs']
> extends infer TArgs extends readonly unknown[]
  ? AbiEntityNotInferred<TArgs, TAbi> extends true
    ? {
        /**
         * Callback when event is emitted
         *
         * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link abi} for type inference.
         */
        listener: (...args: any) => void
      }
    : // We are able to infer args, spread the types.
      {
        /** Callback when event is emitted */
        listener: (...args: TArgs) => void
      }
  : never

type EventConfig<
  TContract,
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
  TEvent extends AbiEvent,
  TOptions extends Options = DefaultOptions,
> = (TOptions['isAddressOptional'] extends true
  ? {
      /** Contract address */
      addressOrName?: string
    }
  : {
      /** Contract address */
      addressOrName: string
    }) & {
  /** Contract ABI */
  contractInterface: TAbi
  /** Event to listen for */
  // If `TEventName` is `never`, then ABI was not parsable. Fall back to `string`.
  eventName: IsNever<TEventName> extends true ? string : TEventName
} & GetArgs<TAbi, TEvent, TOptions> &
  (TOptions['withListener'] extends true
    ? GetListener<TAbi, TEvent>
    : unknown) &
  Omit<TContract, OmitEventConfigProperties>

// Properties to remove from extended config since they are added by default with `EventConfig`
type OmitEventConfigProperties = 'args' | 'contractInterface' | 'eventName'

export type GetConfig<
  TContract,
  TOptions extends Options = DefaultOptions,
> = TContract extends {
  contractInterface: infer TAbi extends Abi
  eventName: infer TEventName extends string
}
  ? EventConfig<
      TContract,
      TAbi,
      ExtractAbiEventNames<TAbi>,
      ExtractAbiEvent<TAbi, TEventName>,
      TOptions
    >
  : TContract extends {
      contractInterface: infer TAbi extends readonly unknown[]
      eventName: infer TEventName extends string
    }
  ? EventConfig<TContract, TAbi, TEventName, never, TOptions>
  : EventConfig<TContract, never, never, never, TOptions>

////////////////////////////////////////////////////////////////////////////////////////////////////
// Event Result Types

type GetArgsAsOutput<
  TAbi extends Abi | readonly unknown[],
  TEvent extends AbiEvent,
> = TEvent['inputs'] extends infer TInputs extends readonly AbiParameter[]
  ? AbiEntityNotInferred<TInputs, TAbi> extends true
    ? any
    : // If outputs are inferrable, must be a known type. Convert to TypeScript primitives.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TInputs extends readonly [...infer _]
    ? /**
       * Return input as array assigned to an object with named keys
       *
       * | Inputs                                                                | Result                                                     |
       * | --------------------------------------------------------------------- | ---------------------------------------------------------- |
       * | `[{ name: 'foo', type: 'uint256' }, { name: 'bar', type: 'string' }]` | `readonly [bigint, string] & { foo: bigint; bar: string }` |
       * | `[{ name: 'foo', type: 'uint256' }, { name: '', type: 'string' }]`    | `readonly [bigint, string] & { foo: bigint }`              |
       */
      {
        [Input in TInputs[number] as Input['name'] extends ''
          ? never
          : Input['name']]: AbiParameterToPrimitiveType<Input>
      } & AbiParametersToPrimitiveTypes<TInputs>
    : any
  : never

export interface TypedEvent<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
  TEvent extends AbiEvent,
> extends Event {
  event?: TEventName
  args?: GetArgsAsOutput<TAbi, TEvent>
}

export type GetReturnType<TContract> = TContract extends {
  contractInterface: infer TAbi extends Abi
  eventName: infer TEventName extends string
}
  ? TypedEvent<TAbi, TEventName, ExtractAbiEvent<TAbi, TEventName>>[]
  : TContract extends {
      contractInterface: infer TAbi extends readonly unknown[]
      eventName: infer TEventName extends string
    }
  ? TypedEvent<TAbi, TEventName, never>[]
  : TypedEvent<Abi, string, ExtractAbiEvent<Abi, string>>[]
