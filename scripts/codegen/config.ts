export const items = [
  {
    name: 'estimateFeesPerGas',
    required: [],
    query: {
      imports: ['FeeValuesType'],
      data: [{ name: 'type', type: 'FeeValuesType' }],
      options: [
        { name: 'type', type: 'FeeValuesType', default: "'eip1559'" },
        'config',
      ],
    },
  },
  {
    name: 'getBalance',
    required: ['address'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
      optionsType:
        "t.Compute<t.PartialBy<GetBalanceParameters<config>, 'address'> & ScopeKeyParameter>",
    },
  },
  {
    name: 'getBlock',
    required: [],
    query: {
      imports: ['BlockTag'],
      data: [
        { name: 'includeTransactions', type: 'boolean' },
        { name: 'blockTag', type: 'BlockTag' },
        'config',
        'chainId',
      ],
      options: [
        { name: 'includeTransactions', type: 'boolean', default: 'false' },
        { name: 'blockTag', type: 'BlockTag', default: "'latest'" },
        'config',
        'chainId',
      ],
      optionsType:
        'Compute<ExactPartial<GetBlockParameters<includeTransactions, blockTag, config, chainId>> & ScopeKeyParameter>',
    },
  },
  {
    name: 'getBlockNumber',
    required: [],
    query: {
      imports: [],
      data: [],
      options: ['config', 'chainId'],
    },
  },
  {
    name: 'getCode',
    required: ['address'],
    query: {
      imports: [],
      data: [],
      options: ['config'],
    },
  },
  {
    name: 'prepareTransactionRequest',
    required: ['to'],
    query: {
      imports: ['PrepareTransactionRequestRequest'],
      data: [
        'config',
        { name: 'chainId', type: "config['chains'][number]['id'] | undefined" },
        {
          name: 'request',
          type: 'PrepareTransactionRequestRequest<SelectChains<config, chainId>[0], SelectChains<config, chainId>[0]>',
        },
      ],
      options: [
        'config',
        { name: 'chainId', type: "config['chains'][number]['id'] | undefined" },
        {
          name: 'request',
          type: 'viem_PrepareTransactionRequestRequest<SelectChains<config, chainId>[0], SelectChains<config, chainId>[0]>',
          default:
            'viem_PrepareTransactionRequestRequest<SelectChains<config, chainId>[0], SelectChains<config, chainId>[0]>',
        },
      ],
      optionsType:
        'UnionExactPartial<PrepareTransactionRequestParameters<config, chainId, request>> & ScopeKeyParameter',
    },
  },
  {
    name: 'readContract',
    // TODO: (address && abi) || code
    required: [['address', 'code'], 'functionName'],
    query: {
      imports: ['Abi', 'ContractFunctionArgs', 'ContractFunctionName'],
      // biome-ignore format: no formatting
      data: [
        { name: "abi", type: "Abi | readonly unknown[]" },
        { name: "functionName", type: "ContractFunctionName<abi, 'pure' | 'view'>" },
        { name: "args", type: "ContractFunctionArgs<abi, 'pure' | 'view', functionName>" },
      ],
      // biome-ignore format: no formatting
      options: [
        { name: "abi", type: "Abi | readonly unknown[]", const: true },
        { name: "functionName", type: "ContractFunctionName<abi, 'pure' | 'view'>" },
        { name: "args", type: "ContractFunctionArgs<abi, 'pure' | 'view', functionName>", const: true },
        'config',
      ],
      optionsType:
        't.UnionExactPartial<ReadContractParameters<abi, functionName, args, config>> & ScopeKeyParameter',
    },
  },
  {
    name: 'simulateContract',
    // TODO: abi + connector skip query key
    required: ['abi', 'address', 'functionName'],
    query: {
      imports: ['Abi', 'ContractFunctionArgs', 'ContractFunctionName'],
      // biome-ignore format: no formatting
      data: [
        { name: "abi", type: "Abi | readonly unknown[]" },
        { name: "functionName", type: "ContractFunctionName<abi, 'nonpayable' | 'payable'>" },
        { name: "args", type: "ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>" },
        'config',
        'chainId',
      ],
      // biome-ignore format: no formatting
      options: [
        { name: "abi", type: "Abi | readonly unknown[]", const: true },
        { name: "functionName", type: "ContractFunctionName<abi, 'nonpayable' | 'payable'>" },
        { name: "args", type: "ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>", const: true },
        'config',
        'chainId',
      ],
      optionsType:
        't.UnionExactPartial<SimulateContractParameters<abi, functionName, args, config, chainId>> & ScopeKeyParameter',
    },
  },
] satisfies {
  name: string
  required: (string | string[])[]
  query: {
    imports: (
      | 'Abi'
      | 'BlockTag'
      | 'ContractFunctionArgs'
      | 'ContractFunctionName'
      | 'FeeValuesType'
      | 'PrepareTransactionRequestRequest'
    )[]
    options: (
      | 'chainId'
      | 'config'
      | { name: string; type: string; const?: true; default?: string }
    )[]
    optionsType?: string
    data: ('chainId' | 'config' | { name: string; type: string })[]
  }
}[]
