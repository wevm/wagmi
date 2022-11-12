import type {
  Abi,
  AbiEvent,
  AbiFunction,
  AbiParameter,
  AbiParameterToPrimitiveType,
  AbiParametersToPrimitiveTypes,
  Address,
  ExtractAbiEvent,
  ExtractAbiEventNames,
  Narrow,
  ResolvedConfig,
} from 'abitype'
import type { ContractInterface, Signer, ethers, providers } from 'ethers'
import { Contract as EthersContract } from 'ethers'

import type {
  AbiItemName,
  Event,
  GetOverridesForAbiStateMutability,
} from '../../types/contracts'
import type {
  CountOccurrences,
  IsUnknown,
  UnionToIntersection,
} from '../../types/utils'

export type GetContractArgs<TAbi extends Abi | readonly unknown[] = Abi> = {
  /** Contract address */
  address: string
  /** Contract ABI */
  abi: Narrow<TAbi>
  /** Signer or provider to attach to contract */
  signerOrProvider?: Signer | providers.Provider
}

export type GetContractResult<TAbi = unknown> = TAbi extends Abi
  ? Contract<TAbi> & EthersContract
  : EthersContract

export function getContract<TAbi extends Abi | readonly unknown[]>({
  address,
  abi,
  signerOrProvider,
}: GetContractArgs<TAbi>): GetContractResult<TAbi> {
  return new EthersContract(
    address,
    abi as unknown as ContractInterface,
    signerOrProvider,
  ) as GetContractResult<TAbi>
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Contract

// TODO: Add remaining properties
type PropertyKeys =
  | 'address'
  | 'attach'
  | 'connect'
  | 'deployed'
  | 'interface'
  | 'resolvedAddress'
type FunctionKeys =
  | 'callStatic'
  | 'estimateGas'
  | 'functions'
  | 'populateTransaction'
type EventKeys =
  | 'emit'
  | 'filters'
  | 'listenerCount'
  | 'listeners'
  | 'off'
  | 'on'
  | 'once'
  | 'queryFilter'
  | 'removeAllListeners'
  | 'removeListener'
// Create new `BaseContract` and remove keys we are going to type
type BaseContract<
  TContract extends Record<
    keyof Pick<EthersContract, PropertyKeys | FunctionKeys | EventKeys>,
    unknown
  >,
> = Omit<EthersContract, PropertyKeys | FunctionKeys | EventKeys> & TContract

// TODO: Add remaining `Interface` properties
type InterfaceKeys = 'events' | 'functions'
// Create new `Interface` and remove keys we are going to type
type BaseInterface<
  Interface extends Record<
    keyof Pick<ethers.utils.Interface, InterfaceKeys>,
    unknown
  >,
> = Omit<ethers.utils.Interface, InterfaceKeys> & Interface

export type Contract<
  TAbi extends Abi,
  _Functions = Functions<TAbi>,
> = _Functions &
  BaseContract<{
    address: Address
    resolvedAddress: Promise<Address>
    attach(addressOrName: Address | string): Contract<TAbi>
    connect(
      signerOrProvider: ethers.Signer | ethers.providers.Provider | string,
    ): Contract<TAbi>
    deployed(): Promise<Contract<TAbi>>
    interface: BaseInterface<{
      events: InterfaceEvents<TAbi>
      functions: InterfaceFunctions<TAbi>
    }>

    callStatic: _Functions
    estimateGas: Functions<TAbi, { ReturnType: ResolvedConfig['BigIntType'] }>
    functions: Functions<TAbi, { ReturnTypeAsArray: true }>
    populateTransaction: Functions<
      TAbi,
      { ReturnType: ethers.PopulatedTransaction }
    >

    emit<TEventName extends ExtractAbiEventNames<TAbi> | ethers.EventFilter>(
      eventName: TEventName,
      ...args: AbiParametersToPrimitiveTypes<
        ExtractAbiEvent<
          TAbi,
          TEventName extends string ? TEventName : ExtractAbiEventNames<TAbi>
        >['inputs']
      > extends infer TArgs extends readonly unknown[]
        ? TArgs
        : never
    ): boolean
    filters: Filters<TAbi>
    listenerCount(): number
    listenerCount<TEventName extends ExtractAbiEventNames<TAbi>>(
      eventName: TEventName,
    ): number
    // TODO: Improve `eventFilter` type
    listenerCount(eventFilter: ethers.EventFilter): number
    listeners(): Array<(...args: any[]) => void>
    listeners<TEventName extends ExtractAbiEventNames<TAbi>>(
      eventName: TEventName,
    ): Array<Listener<TAbi, TEventName>>
    listeners(
      // TODO: Improve `eventFilter` and return types
      eventFilter: ethers.EventFilter,
    ): Array<Listener<TAbi, ExtractAbiEventNames<TAbi>>>
    off: EventListener<TAbi>
    on: EventListener<TAbi>
    once: EventListener<TAbi>
    queryFilter<TEventName extends ExtractAbiEventNames<TAbi>>(
      event: TEventName,
      fromBlockOrBlockhash?: string | number,
      toBlock?: string | number,
    ): Promise<Array<ethers.Event>>
    // TODO: Improve `eventFilter` and return types
    queryFilter(
      eventFilter: ethers.EventFilter,
      fromBlockOrBlockhash?: string | number,
      toBlock?: string | number,
    ): Promise<Array<ethers.Event>>
    removeAllListeners(eventName?: ExtractAbiEventNames<TAbi>): Contract<TAbi>
    // TODO: Improve `eventFilter` type
    removeAllListeners(eventFilter: ethers.EventFilter): Contract<TAbi>
    removeListener: EventListener<TAbi>
  }>

////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions

type Functions<
  TAbi extends Abi,
  Options extends {
    ReturnType?: any
    ReturnTypeAsArray?: boolean
  } = {
    ReturnTypeAsArray: false
  },
> = UnionToIntersection<
  {
    // 1. Iterate through all items in ABI
    // 2. Set non-functions to `never`
    // 3. Convert functions to TypeScript function signatures
    [K in keyof TAbi]: TAbi[K] extends infer TAbiFunction extends AbiFunction & {
      type: 'function'
    }
      ? {
          // If function name occurs more than once, it is overloaded. Grab full string signature as name (what ethers does).
          [K in CountOccurrences<TAbi, { name: TAbiFunction['name'] }> extends 1
            ? AbiItemName<TAbiFunction>
            : AbiItemName<TAbiFunction, true>]: (
            ...args: [
              ...args: TAbiFunction['inputs'] extends infer TInputs extends readonly AbiParameter[]
                ? AbiParametersToPrimitiveTypes<TInputs>
                : never,
              // Tack `overrides` onto end
              // TODO: TypeScript doesn't preserve tuple labels when merging
              // https://github.com/microsoft/TypeScript/issues/43020
              overrides?: GetOverridesForAbiStateMutability<
                TAbiFunction['stateMutability']
              >,
            ]
          ) => Promise<
            // Return a custom return type if specified. Otherwise, calculate return type.
            IsUnknown<Options['ReturnType']> extends true
              ? AbiFunctionReturnType<TAbiFunction> extends infer TAbiFunctionReturnType
                ? Options['ReturnTypeAsArray'] extends true
                  ? [TAbiFunctionReturnType]
                  : TAbiFunctionReturnType
                : never
              : Options['ReturnType']
          >
        }
      : never
  }[number]
>

// Get return type for function based on `AbiStateMutability`
type AbiFunctionReturnType<
  TAbiFunction extends AbiFunction & {
    type: 'function'
  },
> = ({
  payable: ethers.ContractTransaction
  nonpayable: ethers.ContractTransaction
} & {
  [_ in
    | 'pure'
    | 'view']: TAbiFunction['outputs']['length'] extends infer TLength
    ? TLength extends 0
      ? void // If there are no outputs, return `void`
      : TLength extends 1
      ? AbiParameterToPrimitiveType<TAbiFunction['outputs'][0]>
      : {
          [Output in TAbiFunction['outputs'][number] as Output extends {
            name: string
          }
            ? Output['name'] extends ''
              ? never
              : Output['name']
            : never]: AbiParameterToPrimitiveType<Output>
        } & AbiParametersToPrimitiveTypes<TAbiFunction['outputs']>
    : never
})[TAbiFunction['stateMutability']]

type InterfaceFunctions<TAbi extends Abi> = UnionToIntersection<
  {
    [K in keyof TAbi]: TAbi[K] extends infer TAbiFunction extends AbiFunction & {
      type: 'function'
    }
      ? {
          [K in AbiItemName<TAbiFunction, true>]: ethers.utils.FunctionFragment // TODO: Infer `FunctionFragment` type
        }
      : never
  }[number]
>

type InterfaceEvents<TAbi extends Abi> = UnionToIntersection<
  {
    [K in keyof TAbi]: TAbi[K] extends infer TAbiEvent extends AbiEvent
      ? {
          [K in AbiItemName<TAbiEvent, true>]: ethers.utils.EventFragment // TODO: Infer `EventFragment` type
        }
      : never
  }[number]
>

////////////////////////////////////////////////////////////////////////////////////////////////////
// Events

export interface EventListener<TAbi extends Abi> {
  <TEventName extends ExtractAbiEventNames<TAbi>>(
    eventName: TEventName,
    listener: Listener<TAbi, TEventName>,
  ): Contract<TAbi>
  (
    // TODO: Improve `eventFilter` and `listener` types
    eventFilter: ethers.EventFilter,
    listener: Listener<TAbi, ExtractAbiEventNames<TAbi>>,
  ): Contract<TAbi>
}

type Listener<
  TAbi extends Abi,
  TEventName extends string,
  TAbiEvent extends AbiEvent = ExtractAbiEvent<TAbi, TEventName>,
> = AbiParametersToPrimitiveTypes<
  TAbiEvent['inputs']
> extends infer TArgs extends readonly unknown[]
  ? (...args: [...args: TArgs, event: Event<TAbiEvent>]) => void
  : never

type Filters<TAbi extends Abi> = UnionToIntersection<
  {
    [K in keyof TAbi]: TAbi[K] extends infer TAbiEvent extends AbiEvent
      ? {
          [K in CountOccurrences<TAbi, { name: TAbiEvent['name'] }> extends 1
            ? AbiItemName<TAbiEvent>
            : AbiItemName<TAbiEvent, true>]: (
            ...args: TAbiEvent['inputs'] extends infer TAbiParameters extends readonly (AbiParameter & {
              indexed?: boolean
            })[]
              ? {
                  // Only indexed event parameters may be filtered.
                  [K in keyof TAbiParameters]: TAbiParameters[K]['indexed'] extends true
                    ? AbiParameterToPrimitiveType<TAbiParameters[K]> | null
                    : null
                }
              : never
          ) => ethers.EventFilter
        }
      : never
  }[number]
>
