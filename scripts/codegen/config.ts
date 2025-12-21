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
      cast: {
        parameters: true,
      },
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
      optionsType: (t, typePrefix, slots) =>
        `${t}.Compute<${t}.ExactPartial<${typePrefix}Parameters<${slots}>> & ScopeKeyParameter>`,
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
      imports: [
        'PrepareTransactionRequestRequest',
        { names: ['SelectChains'], path: '../types/chain.js' },
      ],
      data: [
        'config',
        { name: 'chainId', type: "config['chains'][number]['id'] | undefined" },
        {
          name: 'request',
          type: 'PrepareTransactionRequestRequest<SelectChains<config, chainId>[0], SelectChains<config, chainId>[0]>',
        },
      ],
      options: [
        { name: 'config', type: 'Config' },
        { name: 'chainId', type: "config['chains'][number]['id'] | undefined" },
        {
          name: 'request',
          type: 'PrepareTransactionRequestRequest<SelectChains<config, chainId>[0], SelectChains<config, chainId>[0]>',
        },
      ],
      optionsType: (t, typePrefix, slots) =>
        `${t}.UnionExactPartial<${typePrefix}Parameters<${slots}>> & ScopeKeyParameter`,
      cast: {
        options: true,
        parameters: true,
        queryKey: true,
        return: true,
      },
    },
  },
  {
    name: 'readContract',
    required: [
      [
        'address',
        {
          name: 'code',
          cond: (options, name) =>
            `('${name}' in ${options} && ${options}.${name})`,
        },
      ],
      { name: 'abi', cond: (options, name) => `${options}.${name}` },
      'functionName',
    ],
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
      optionsType: (t, typePrefix, slots) =>
        `${t}.UnionExactPartial<${typePrefix}Parameters<${slots}>> & ScopeKeyParameter`,
      cast: {
        options: true,
        parameters: true,
        queryKey: true,
        return: true,
      },
    },
  },
  {
    name: 'simulateContract',
    required: ['abi', 'address', 'connector', 'functionName'],
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
      optionsType: (t, typePrefix, slots) =>
        `${t}.UnionExactPartial<${typePrefix}Parameters<${slots}>> & ScopeKeyParameter`,
      cast: {
        options: true,
        parameters: true,
        queryKey: true,
        return: true,
      },
    },
  },
] satisfies {
  name: string
  required: (
    | string
    | { name: string; cond: (options: string, name: string) => string }
    | (
        | string
        | { name: string; cond: (options: string, name: string) => string }
      )[]
  )[]
  query: {
    imports: (
      | 'Abi'
      | 'BlockTag'
      | 'ContractFunctionArgs'
      | 'ContractFunctionName'
      | 'FeeValuesType'
      | 'PrepareTransactionRequestRequest'
      | { names: string[]; path: string }
    )[]
    options: (
      | 'chainId'
      | 'config'
      | { name: string; type: string; const?: true; default?: string }
    )[]
    optionsType?: (t: string, typePrefix: string, slots: string) => string
    data: ('chainId' | 'config' | { name: string; type: string })[]
    cast?: {
      options?: true
      parameters?: true
      queryKey?: true
      return?: true
    }
  }
}[]
