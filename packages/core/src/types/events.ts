import type {
  Abi,
  AbiEvent,
  AbiParameter,
  AbiParameterToPrimitiveType,
  AbiParametersToPrimitiveTypes,
  Address,
  ExtractAbiEvent,
  ExtractAbiEventNames,
  Narrow,
} from 'abitype'

export type GetConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
> = {
  /** Contract ABI */
  abi: Narrow<TAbi> // infer `TAbi` type for inline usage
  /** Contract address */
  address: Address
  /** Chain id to use for provider */
  chainId?: number
  /** Function to invoke on the contract */
  eventName: GetEventName<TAbi, TEventName>
} & GetArgs<TAbi, TEventName>

export type GetEventName<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string = string,
> = TAbi extends Abi
  ? ExtractAbiEventNames<TAbi> extends infer AbiEventNames
    ?
        | AbiEventNames
        | (TEventName extends AbiEventNames ? TEventName : never)
        | (Abi extends TAbi ? string : never)
    : never
  : TEventName

export type GetArgs<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
  TAbiEvent extends AbiEvent = TAbi extends Abi
    ? ExtractAbiEvent<TAbi, TEventName>
    : AbiEvent,
  TArgs = EventFilterArgumentsToPrimitiveTypes<TAbiEvent['inputs']>,
  FailedToParseArgs =
    | ([TArgs] extends [never] ? true : false)
    | (readonly unknown[] extends TArgs ? true : false),
> = true extends FailedToParseArgs
  ? {
      /**
       * Arguments to filter events
       *
       * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link abi} for type inference.
       */
      args?: readonly any[]
    }
  : {
      /** Arguments to filter events */
      args?: TArgs extends readonly unknown[] ? TArgs : readonly unknown[]
    }

export type GetListener<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
  TAbiEvent extends AbiEvent = TAbi extends Abi
    ? ExtractAbiEvent<TAbi, TEventName>
    : AbiEvent,
  TArgs = AbiParametersToPrimitiveTypes<TAbiEvent['inputs']>,
  FailedToParseArgs =
    | ([TArgs] extends [never] ? true : false)
    | (readonly unknown[] extends TArgs ? true : false),
> = true extends FailedToParseArgs
  ? {
      /**
       * Callback when event is emitted
       *
       * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link abi} for type inference.
       */
      listener: (...args: readonly unknown[]) => void
    }
  : {
      /** Callback when event is emitted */ listener: (
        ...args: TArgs extends readonly unknown[] ? TArgs : readonly unknown[]
      ) => void
    }

////////////////////////////////////////////////////////////////////////////////////////////////////
// Utilities

// Parses abi parameters as optional event filter arguments, where unindexed ones are always null
type EventFilterArgumentsToPrimitiveTypes<
  TAbiParameters extends readonly (AbiParameter & { indexed?: boolean })[],
> = {
  [K in keyof TAbiParameters]?: TAbiParameters[K] extends { indexed: false }
    ? null
    : null | AbiParameterToPrimitiveType<TAbiParameters[K]>
}
