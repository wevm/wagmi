import {
  Abi,
  AbiEvent,
  AbiFunction,
  AbiParameter,
  AbiParameterToPrimitiveType,
  AbiParametersToPrimitiveTypes,
  AbiStateMutability,
  Address,
  ExtractAbiEvent,
  ExtractAbiEventNames,
  ResolvedConfig,
} from 'abitype'
import {
  ContractInterface,
  Contract as EthersContract,
  Signer,
  ethers,
  providers,
} from 'ethers'

import { Join } from '../../types/utils'

export type GetContractArgs<TAbi = unknown> = {
  /** Contract address */
  address: string
  /** Contract interface or ABI */
  abi: TAbi
  /** Signer or provider to attach to contract */
  signerOrProvider?: Signer | providers.Provider
}

export type GetContractResult<TAbi = unknown> = TAbi extends Abi
  ? Contract<TAbi>
  : EthersContract

export function getContract<
  TAbi extends Abi | readonly unknown[] | ContractInterface,
>({
  address,
  abi,
  signerOrProvider,
}: GetContractArgs<TAbi>): GetContractResult<TAbi> {
  return new EthersContract(
    address,
    <ContractInterface>(<unknown>abi),
    signerOrProvider,
  ) as GetContractResult<TAbi>
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions

type ContractItemSignature<
  TAbiItem extends (AbiFunction & { type: 'function' }) | AbiEvent,
> = `${TAbiItem['name']}(${Join<
  ContractItemParameters<TAbiItem['inputs']>,
  ','
>})`
type ContractItemParameters<TAbiParameters extends readonly AbiParameter[]> = [
  ...{ [K in keyof TAbiParameters]: TAbiParameters[K]['type'] },
]

type ContractItemName<
  TAbiItem extends (AbiFunction & { type: 'function' }) | AbiEvent,
  IsSignature extends boolean = false,
> = IsSignature extends true
  ? ContractItemSignature<TAbiItem>
  : TAbiItem['name']

type AbiStateMutabilityToContractOverrides<
  TAbiStateMutability extends AbiStateMutability,
> = {
  nonpayable: Overrides & { from?: Address | Promise<Address> }
  payable: PayableOverrides & { from?: Address | Promise<Address> }
  pure: CallOverrides
  view: CallOverrides
}[TAbiStateMutability]

type AbiFunctionReturnType<
  TAbiFunction extends AbiFunction & { type: 'function' },
> = {
  payable: ethers.ContractTransaction
  nonpayable: ethers.ContractTransaction
  view: GetReturnType<TAbiFunction['outputs']>
  pure: GetReturnType<TAbiFunction['outputs']>
}[TAbiFunction['stateMutability']]
type GetReturnType<TAbiParameters extends readonly AbiParameter[]> =
  TAbiParameters['length'] extends infer TLength
    ? TLength extends 0
      ? void // If there are no outputs, return `void`
      : TLength extends 1
      ? AbiParameterToPrimitiveType<TAbiParameters[0]>
      : {
          [Output in TAbiParameters[number] as Output['name'] extends ''
            ? never
            : Output['name']]: AbiParameterToPrimitiveType<Output>
        } & AbiParametersToPrimitiveTypes<TAbiParameters>
    : never

type ContractFunction<
  TAbiFunction extends AbiFunction & { type: 'function' },
  IsSignature extends boolean = false,
> = {
  [K in ContractItemName<TAbiFunction, IsSignature>]: (
    ...args: [
      ...args: TAbiFunction['inputs'] extends infer TInputs extends readonly AbiParameter[]
        ? AbiParametersToPrimitiveTypes<TInputs>
        : never,
      overrides?: AbiStateMutabilityToContractOverrides<
        TAbiFunction['stateMutability']
      >,
    ]
  ) => Promise<AbiFunctionReturnType<TAbiFunction>>
}

type ContractFunctions<TAbi extends Abi> = ExpandObject<
  UnionToIntersection<GetContractFunctions<TAbi, true>> &
    UnionToIntersection<GetContractFunctions<RemoveDuplicates<TAbi>>>
>
type GetContractFunctions<
  TAbi extends Abi,
  IsSignature extends boolean = false,
> = {
  [K in keyof TAbi]: TAbi[K] extends AbiFunction & { type: 'function' }
    ? ContractFunction<TAbi[K], IsSignature>
    : never
}[number]

////////////////////////////////////////////////////////////////////////////////////////////////////
// Events

interface ContractEvent<TAbi extends Abi> {
  <TEventName extends ExtractAbiEventNames<TAbi>>(
    eventName: TEventName,
    listener: Listener<TAbi, TEventName>,
  ): Contract<TAbi>
  (
    eventFilter: EventFilter<TAbi>,
    // TODO: Improve typing
    listener: Listener<TAbi, ExtractAbiEventNames<TAbi>>,
  ): Contract<TAbi>
}

type ContractFilters<TAbi extends Abi> = ExpandObject<
  UnionToIntersection<GetContractFilters<TAbi, true>> &
    UnionToIntersection<GetContractFilters<TAbi>>
>
type GetContractFilters<
  TAbi extends Abi,
  IsSignature extends boolean = false,
> = {
  [K in keyof TAbi]: TAbi[K] extends AbiEvent
    ? ContractFilter<TAbi, TAbi[K], IsSignature>
    : never
}[number]

type ContractFilter<
  TAbi extends Abi,
  TAbiEvent extends AbiEvent,
  IsSignature extends boolean = false,
> = {
  [K in ContractItemName<TAbiEvent, IsSignature>]: (
    ...args: [
      ...args: TAbiEvent['inputs'] extends infer TInputs extends readonly AbiParameter[]
        ? AbiParametersToPrimitiveTypes<TInputs>
        : never,
    ]
  ) => EventFilter<TAbi> // TODO: Improve typing
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Ethers Overrides

interface Overrides {
  gasLimit?:
    | ResolvedConfig['BigIntType']
    | Promise<ResolvedConfig['BigIntType']>
  gasPrice?:
    | ResolvedConfig['BigIntType']
    | Promise<ResolvedConfig['BigIntType']>
  maxFeePerGas?:
    | ResolvedConfig['BigIntType']
    | Promise<ResolvedConfig['BigIntType']>
  maxPriorityFeePerGas?:
    | ResolvedConfig['BigIntType']
    | Promise<ResolvedConfig['BigIntType']>
  nonce?: ResolvedConfig['IntType'] | Promise<ResolvedConfig['IntType']>
  type?: number
  accessList?: ethers.Overrides['accessList']
  customData?: Record<string, any>
  ccipReadEnabled?: boolean
}

interface PayableOverrides extends Overrides {
  value?: ResolvedConfig['IntType'] | ResolvedConfig['BigIntType']
}

interface CallOverrides extends PayableOverrides {
  blockTag?: ethers.CallOverrides['blockTag']
  from?: Address | Promise<Address>
}

type EventFilter<
  TAbi extends Abi,
  TAbiEventNames = ExtractAbiEventNames<TAbi>,
> = {
  address?: Address
  topics?: Array<TAbiEventNames | Array<TAbiEventNames>>
}

type Listener<
  TAbi extends Abi,
  TEventName extends string,
  TAbiEvent extends AbiEvent = ExtractAbiEvent<TAbi, TEventName>,
> = AbiParametersToPrimitiveTypes<
  TAbiEvent['inputs']
> extends infer TArgs extends readonly unknown[]
  ? (...args: TArgs) => void
  : never

////////////////////////////////////////////////////////////////////////////////////////////////////
// Contract

type PropertyKeys = 'address' | 'resolvedAddress'
type FunctionKeys =
  | 'attach'
  | 'callStatic'
  | 'connect'
  | 'deployed'
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
type BaseContract<
  TContract extends Record<
    keyof Pick<ethers.BaseContract, PropertyKeys | FunctionKeys | EventKeys>,
    unknown
  >,
> = Omit<ethers.BaseContract, PropertyKeys | FunctionKeys | EventKeys> &
  TContract

export type Contract<
  TAbi extends Abi,
  _Functions = ContractFunctions<TAbi>,
> = _Functions &
  BaseContract<{
    address: Address
    readonly resolvedAddress: Promise<Address>

    // Functions

    attach(addressOrName: Address | string): Contract<TAbi>
    callStatic: _Functions
    connect(
      signerOrProvider: ethers.Signer | ethers.providers.Provider | string,
    ): Contract<TAbi>
    deployed(): Promise<Contract<TAbi>>
    estimateGas: _Functions
    functions: _Functions
    populateTransaction: _Functions

    // Events

    emit<TEventName extends ExtractAbiEventNames<TAbi>>(
      eventName: TEventName,
      ...args: Parameters<Listener<TAbi, TEventName>>
    ): boolean
    emit(
      eventFilter: EventFilter<TAbi>,
      ...args: Parameters<Listener<TAbi, ExtractAbiEventNames<TAbi>>> // TODO: Improve typing for args
    ): boolean
    filters: ContractFilters<TAbi>
    listenerCount(): number
    listenerCount<TEventName extends ExtractAbiEventNames<TAbi>>(
      eventName: TEventName,
    ): number
    listenerCount(eventFilter: EventFilter<TAbi>): number
    listeners(): Array<(...args: any[]) => void>
    listeners<TEventName extends ExtractAbiEventNames<TAbi>>(
      eventName: TEventName,
    ): Array<Listener<TAbi, TEventName>>
    listeners(
      eventFilter: EventFilter<TAbi>,
    ): Array<Listener<TAbi, ExtractAbiEventNames<TAbi>>> // TODO: Improve typing for response
    off: ContractEvent<TAbi>
    on: ContractEvent<TAbi>
    once: ContractEvent<TAbi>
    queryFilter<TEventName extends ExtractAbiEventNames<TAbi>>(
      event: TEventName,
      fromBlockOrBlockhash?: string | number,
      toBlock?: string | number,
    ): Promise<Array<ethers.Event>>
    queryFilter(
      eventFilter: EventFilter<TAbi>,
      fromBlockOrBlockhash?: string | number,
      toBlock?: string | number,
    ): Promise<Array<ethers.Event>>
    removeAllListeners(eventName?: ExtractAbiEventNames<TAbi>): Contract<TAbi>
    removeAllListeners(eventFilter: EventFilter<TAbi>): Contract<TAbi>
    removeListener: ContractEvent<TAbi>
  }>

////////////////////////////////////////////////////////////////////////////////////////////////////
// Utilities

type ArrayOmit<T extends unknown[], E> = T['length'] extends 0
  ? []
  : T extends [infer THead, ...infer TRest]
  ? THead extends E
    ? ArrayOmit<TRest, E>
    : [THead, ...ArrayOmit<TRest, E>]
  : never

declare const __VALUE_TO_OMIT__: unique symbol
type __VALUE_TO_OMIT__ = typeof __VALUE_TO_OMIT__
type Count<T extends readonly unknown[], E> = ArrayOmit<
  [
    ...{
      [K in keyof T]: T[K] extends E ? T[K] : __VALUE_TO_OMIT__
    },
  ],
  __VALUE_TO_OMIT__
>['length']
type RemoveDuplicates<TAbi extends Abi> = ArrayOmit<
  [
    ...{
      [K in keyof TAbi]: TAbi[K] extends AbiFunction & { type: 'function' }
        ? Count<TAbi, { name: TAbi[K]['name'] }> extends 1
          ? TAbi[K]
          : __VALUE_TO_OMIT__
        : __VALUE_TO_OMIT__
    },
  ],
  __VALUE_TO_OMIT__
>

type UnionToIntersection<Union> = (
  Union extends unknown ? (arg: Union) => unknown : never
) extends (arg: infer R) => unknown
  ? R
  : never

type ExpandObject<TObject> = TObject extends infer O
  ? { [K in keyof O]: O[K] }
  : never
