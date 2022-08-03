export type Address = `0x${string}`

export type AbiType =
  | 'address'
  | 'bool'
  | `bytes${number | ''}`
  | 'function'
  | 'string'
  | 'tuple'
  | `${'u' | ''}int${number | ''}`
  | `${'u' | ''}fixed${number}x${number}`
  | `${'u' | ''}fixed`

export type AbiTypeToPrimitiveType<TAbiItem extends Partial<AbiItem>> =
  TAbiItem extends { type: 'address' }
    ? Address
    : TAbiItem extends { type: 'bool' }
    ? boolean
    : TAbiItem extends { type: `bytes${number | ''}` }
    ? string
    : TAbiItem extends { type: 'function' }
    ? `${Address}${string}`
    : TAbiItem extends { type: 'string' }
    ? string
    : TAbiItem extends { type: 'tuple' }
    ? {
        [Component in (TAbiItem & {
          components: readonly AbiItem[]
        })['components'][number] as Component['name']]: AbiTypeToPrimitiveType<Component>
      }
    : TAbiItem extends { type: `${'u' | ''}int${number | ''}` }
    ? number
    : TAbiItem extends { type: `${'u' | ''}fixed${number}x${number}` }
    ? number
    : TAbiItem extends { type: `${'u' | ''}fixed` }
    ? number
    : unknown

type AbiItem = {
  type: AbiType
  name: string
  internalType: string
} & (
  | { type: Exclude<AbiType, 'tuple'> }
  | {
      type: Extract<AbiType, 'tuple'>
      components: readonly AbiItem[]
    }
)

type StateMutability = 'pure' | 'view' | 'nonpayable' | 'payable'

type AbiFunction<TItem = AbiItem> = {
  stateMutability: StateMutability
  /**
   * @deprecated use `pure` or `view` from {@link StateMutability} instead
   * https://github.com/ethereum/solidity/issues/992
   */
  constant?: boolean
  /**
   * @deprecated use `payable` or `nonpayable` from {@link StateMutability} instead
   * https://github.com/ethereum/solidity/issues/992
   */
  payable?: boolean
} & (
  | {
      type: 'function' | 'receive'
      inputs: readonly TItem[]
      name: string
      outputs: readonly TItem[]
    }
  | {
      type: 'constructor'
      inputs: readonly TItem[]
    }
  | { type: 'fallback' }
)

type AbiEvent<TItem = AbiItem> = {
  type: 'event'
  name: string
  inputs: readonly (TItem & { indexed?: boolean })[]
  anonymous?: boolean
}

type AbiError<TItem = AbiItem> = {
  type: 'error'
  name: string
  inputs: readonly TItem[]
}

export type Abi = readonly (AbiFunction | AbiEvent | AbiError)[]

type ContractFunctions<TAbi extends Abi> = Extract<
  TAbi[number],
  { type: 'function' }
>
export type ContractFunctionNames<TAbi extends Abi> =
  ContractFunctions<TAbi>['name']
export type ContractFunction<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionNames<TAbi>,
> = Extract<ContractFunctions<TAbi>, { name: TFunctionName }>

export type ContractFunctionArgs<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionNames<TAbi>,
  TType extends 'inputs' | 'outputs',
> = ContractFunction<TAbi, TFunctionName>[TType]

export type ContractFunctionArgsToPrimitiveType<
  Args extends readonly AbiItem[],
> = Args extends readonly []
  ? undefined
  : Args extends readonly [Args[0]]
  ? AbiTypeToPrimitiveType<Args[0]>
  : // : [AbiTypeToPrimitiveType<Args[0]>, AbiTypeToPrimitiveType<Args[1]>]
    {
      [Arg in Args[number] as Arg['name']]: AbiTypeToPrimitiveType<Arg>
    }
