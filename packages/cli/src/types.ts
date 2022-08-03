export type Item = {
  name: string
  // TODO: Add more granular typing
  type: string
  internalType: string
  components?: Item[]
}

export type StateMutability = 'pure' | 'view' | 'nonpayable' | 'payable'

export type ContractFunction<TItem = Item> = {
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
      inputs: TItem[]
      name: string
      outputs: TItem[]
    }
  | {
      type: 'constructor'
      inputs: TItem[]
    }
  | {
      type: 'fallback'
    }
)

export type ContractEvent<TItem = Item> = {
  type: 'event'
  name: string
  inputs: (TItem & { indexed?: boolean })[]
  anonymous?: true
}

export type ContractError<TItem = Item> = {
  type: 'error'
  name: string
  inputs: TItem[]
}

export type ContractInterface = (
  | ContractFunction
  | ContractEvent
  | ContractError
)[]

export type Contract = {
  addressOrName: `0x${string}` | string
  name: string
  chainId?: number
  contractInterface: ContractInterface
}
