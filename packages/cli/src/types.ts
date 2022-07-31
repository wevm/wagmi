type Variable = {
  name: string
  // TODO: Add more granular typing
  type: string
  internalType: string
  components?: Variable[]
}

type StateMutability = 'pure' | 'view' | 'nonpayable' | 'payable'

// TODO: Add constant, payable, gas properties
type ContractFunction =
  | {
      type: 'function' | 'receive'
      inputs: Variable[]
      name: string
      outputs: Variable[]
      stateMutability: StateMutability
    }
  | {
      type: 'constructor'
      inputs: Variable[]
      stateMutability: StateMutability
    }
  | {
      type: 'fallback'
      stateMutability: StateMutability
    }

type ContractEvent = {
  type: 'event'
  name: string
  inputs: (Variable & { indexed: boolean })[]
  anonymous?: true
}

type ContractError = {
  type: 'error'
  name: string
  inputs: Variable[]
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
